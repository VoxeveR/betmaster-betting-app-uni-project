from pydantic import BaseModel, EmailStr
from typing import Optional

class Login(BaseModel):
    email: Optional[EmailStr]
    username: Optional[str]
    password: str