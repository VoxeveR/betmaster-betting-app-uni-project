from datetime import datetime
from pydantic import BaseModel, EmailStr
from dataclasses import dataclass


class Login(BaseModel):
    email: EmailStr
    password: str


class UserReg(BaseModel):
    username: str
    password: str
    name: str
    surname: str
    email: EmailStr