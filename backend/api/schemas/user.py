from pydantic import BaseModel, EmailStr

class UserReg(BaseModel):
    username: str
    password: str
    name: str
    surname: str
    email: EmailStr
