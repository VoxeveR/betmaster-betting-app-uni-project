from collections import defaultdict

from pydantic import EmailStr
from api.database.models.user import User
from api.database.models.account import Account
from typing_extensions import Optional
from api.database.models.user_roles import UserRoles, Role
from sqlalchemy.orm import Session
from api.schemas.user import UserReg
from api.core.logging import logger
from api.core.security import hash_password


def checkUserExistEmail(email: EmailStr, db: Session) -> bool:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return True
    return False


def checkUserExistById(user_id: int, db: Session) -> bool:
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        return True
    return False


def create_user(user: UserReg, db: Session):
    try:

        new_user = User(
            username=user.username,
            password=hash_password(user.password),
            name=user.name,
            surname=user.surname,
            email=str(user.email),
            pesel=user.pesel,
            phone_number=user.phone_number,
        )

        db.add(new_user)
        db.flush()

        new_role = UserRoles(
            user_id=new_user.user_id,
            role_name=user.role,
        )

        db.add(new_role)
        db.flush()

        new_account = Account(
            user_id=new_user.user_id,
            balance=0.00
        )

        db.add(new_account)

        db.commit()

        return True
    except Exception as e:
        logger.error(e)
        db.rollback()
        return False

def get_user_detials(user_id: int, db: Session) -> Optional[dict]:
    try:
        user = db.query(User.user_id,
                        User.email,
                        User.name,
                        User.surname,
                        User.password,
                        User.username,
                        User.phone_number,
                        User.is_banned,
                        User.is_verified,
                        User.created_at).filter(User.user_id == user_id).first()

        if not user:
            return None

        return {
            "user_id": user.user_id,
            "username": user.username,
            "name": user.name,
            "surname": user.surname,
            "email": user.email,
            "phone_number": user.phone_number,
            "is_banned": user.is_banned,
            "is_verified": user.is_verified,
            "created_at": user.created_at
        }



    except Exception as e:
        logger.error(e)
        return None

def get_clients(db: Session) -> Optional[dict]:
    try:
        clients = db.query(User.user_id,
                           User.email,
                           User.name,
                           User.surname,
                           User.phone_number,
                           User.id_number,
                           User.is_banned,
                           User.username,
                           User.pesel,
                           UserRoles.role_name).join(UserRoles).filter(UserRoles.role_name == Role.USER).all()

        response = dict()

        for user_id, email, name, surname, phone_number, id_number, is_banned, username, pesel, role_name in clients:
            response[user_id] = {
                "user_id": user_id,
                "email": email,
                "name": name,
                "surname": surname,
                "phone_number": phone_number,
                "id_number": id_number,
                "is_banned": is_banned,
                "username": username,
                "pesel": pesel,
                "role_name": role_name
            }

        return response

    except Exception as e:
        logger.error(e)
        return None


def get_employees(db: Session) -> Optional[dict]:
    try:
        clients = db.query(User.user_id,
                           User.email,
                           User.name,
                           User.surname,
                           User.phone_number,
                           User.id_number,
                           User.username,
                           User.pesel,
                           UserRoles.role_name).join(UserRoles).filter(UserRoles.role_name == Role.ADMIN or UserRoles.role_name == Role.ANALYST).all()

        response = dict()

        for user_id, email, name, surname, phone_number, id_number, username, pesel, role_name in clients:
            response[user_id] = {
                "email": email,
                "name": name,
                "surname": surname,
                "phone_number": phone_number,
                "id_number": id_number,
                "username": username,
                "pesel": pesel,
                "role": role_name
            }

        return response

    except Exception as e:
        logger.error(e)
        return None

def ban_user(user_id: int, db: Session) -> bool:
    try:
        db.query(User).filter(User.user_id == user_id).update({User.is_banned: True})

        return True
    except Exception as e:
        logger.error(e)
        db.rollback()
        return False