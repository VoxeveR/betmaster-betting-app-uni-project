from pydantic import BaseModel, EmailStr
from dataclasses import dataclass


class Login(BaseModel):
    email: EmailStr
    password: str

@dataclass
class UserReg(BaseModel):
    name: str
    lastname: str
    email: EmailStr
    password: str
    pesel: int
    verified: bool