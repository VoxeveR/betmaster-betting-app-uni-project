from pydantic import BaseModel, EmailStr
from typing import Optional
from api.database.models.user_roles import Role

class UserReg(BaseModel):
    username: str
    password: str
    name: str
    surname: str
    email: EmailStr
    pesel: int
    phone_number: int
    role: Role

class UserUpdate(BaseModel):
    username: Optional[str]
    name: Optional[str]
    surname: Optional[str]
    email: Optional[EmailStr]
    phone_number: Optional[int]
