from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from starlette import status
from .database.database import get_db, User

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Login(BaseModel):
    username: str
    password: str

@app.get("/api/healthcheck")
async def healthcheck():
    return {"status": "ok"}

def verify(password: str, user_password: str) -> bool:
    return password == user_password

def auth_user(username: str, password: str, db: Session) -> bool:
    user  = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    print(user.password)
    if not verify(password, str(user.password)):
        return False
    return True

@app.post("/api/login")
async def login(login: Login, db: Session = Depends(get_db)):
    if not login.username or not login.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No username or password provided",
        )

    print(login.password)

    if not auth_user(login.username, login.password, db):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    print(login.username)
    print(login.password)

    return {"status": "ok"}