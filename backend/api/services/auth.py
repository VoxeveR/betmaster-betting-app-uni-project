from pydantic import EmailStr
from api.database.models.user import User
from api.database.models.user_roles import UserRoles
from sqlalchemy.orm import Session

def verify(password: str, user_password: str) -> bool:
    return password == user_password

def auth_user(email: EmailStr, password: str, db: Session) -> bool:
    user = db.query(User).join(UserRoles).filter(User.email == str(email)).first()
    if not user:
        return False
    if not verify(password, str(user.password)):
        return False
    return True