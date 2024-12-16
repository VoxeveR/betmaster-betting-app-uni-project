from pydantic import EmailStr
from typing_extensions import Optional
from api.database.models.user import User
from api.core.security import verify_password
from api.database.models.user_roles import UserRoles
from sqlalchemy.orm import Session



def auth_user(email: EmailStr, password: str, db: Session) -> Optional[dict]:
    user = db.query(
            User.user_id,
            User.email,
            User.password,
            User.username,
            UserRoles.role_name).join(UserRoles).filter(User.email == str(email)).first()


    if not user:
        return None
    if not verify_password(password, user.password.encode('utf-8')):
        return None

    return {
        'user_id': user.user_id,
        'email': user.email,
        'username': user.username,
        'role': user.role_name.value
    }