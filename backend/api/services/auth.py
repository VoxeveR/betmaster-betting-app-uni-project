from pydantic import EmailStr
from typing_extensions import Optional
from api.database.models.user import User
from api.database.models.user_roles import UserRoles
from sqlalchemy.orm import Session

def verify(password: str, user_password: str) -> bool:
    return password == user_password

def auth_user(email: EmailStr, password: str, db: Session) -> Optional[dict]:
    user = db.query(
            User.user_id,
            User.email,
            User.username,
            UserRoles.role_name).join(UserRoles).filter(User.email == str(email)).first()

    if not user:
        return None
    if not verify(password, str(user.password)):
        return None

    return {
        'user_id': user.user_id,
        'email': user.email,
        'username': user.username,
        'role': user.role_name.value
    }