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
                        User.is_verified,
                        User.created_at).filter(User.user_id == user_id).first()

        if not user:
            return None

        return {
            "user_id": user.user_id,
            "username": user.username,
            "name": user.name,
            "surename": user.surname,
            "email": user.email,
            "phone_number": user.phone_number,
            "is_verified": user.is_verified,
            "created_at": user.created_at
        }



    except Exception as e:
        logger.error(e)
        return None

