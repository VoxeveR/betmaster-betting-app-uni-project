from datetime import datetime
from pydantic import EmailStr
from typing_extensions import Optional
from api.database.models.user import User
from api.database.models.selfexclusion import SelfExclusion
from api.core.security import verify_password
from api.database.models.user_roles import UserRoles
from api.database.models.account import Account
from api.core.logging import logger
from sqlalchemy.orm import Session


def check_self_exclusion(email: EmailStr, db: Session) -> bool:
    try:
        user = db.query(User).filter(User.email == str(email)).first()

        if user:
            self_exclusion = db.query(SelfExclusion).filter(SelfExclusion.user_id == user.user_id).first()
            if self_exclusion:
                if self_exclusion.start_date < datetime.now() < self_exclusion.end_date:
                    return True

        return False
    except Exception as e:
        logger.error(e)
        return True



def auth_user(email: EmailStr, password: str, db: Session) -> Optional[dict]:
    try:
        user = db.query(
                User.user_id,
                User.email,
                User.password,
                User.username,
                UserRoles.role_name,
                Account.balance).join(Account).join(UserRoles).filter(User.email == str(email)).first()

        if not user:
            return None
        if not verify_password(password, user.password.encode('utf-8')):
            return None

        return {
            'user_id': user.user_id,
            'email': user.email,
            'username': user.username,
            'balance': user.balance,
            'role': user.role_name.value
        }
    except Exception as e:
        logger.error(e)
        return None