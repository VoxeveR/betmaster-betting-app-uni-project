from pydantic import EmailStr
from api.database.models.user import User
from api.database.models.user_roles import UserRoles, Role
from sqlalchemy.orm import Session
from api.schemas.user import UserReg
from api.core.logging import logger


def verify(password: str, user_password: str) -> bool:
    return password == user_password


def auth_user(email: EmailStr, password: str, db: Session) -> bool:
    user  = db.query(User).filter(User.email == email).first()
    if not user:
        return False
    if not verify(password, str(user.password)):
        return False
    return True


def checkUserExist(email: EmailStr, db: Session) -> bool:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return True
    return False


def create_user(user: UserReg, db: Session):
    try:

        new_user = User(
            username=user.username,
            password=user.password,
            name=user.name,
            surname=user.surname,
            email=str(user.email),
        )
        db.add(new_user)
        db.flush()

        new_role = UserRoles(
            user_id=new_user.user_id,
            role_name=Role.USER,
        )
        db.add(new_role)

        db.commit()

        return True
    except Exception as e:
        logger.error(e)
        db.rollback()
        return False