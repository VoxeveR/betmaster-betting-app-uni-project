from pydantic import BaseModel, EmailStr
from api.database.models.user_roles import Role

class UserReg(BaseModel):
    username: str
    password: str
    name: str
    surname: str
    email: EmailStr
    role: Role
