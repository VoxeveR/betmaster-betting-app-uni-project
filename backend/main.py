from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import EmailStr
from sqlalchemy.orm import Session
from starlette import status
from .database.database import get_db, User
from  .models import Login, UserReg

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/api/healthcheck")
async def healthcheck():
    return {"status": "ok"}

def verify(password: str, user_password: str) -> bool:
    return password == user_password

def auth_user(email: EmailStr, password: str, db: Session) -> bool:
    user  = db.query(User).filter(User.email == email).first()
    if not user:
        return False
    if not verify(password, str(user.password)):
        return False
    return True

@app.post("/api/login")
async def login(login: Login, db: Session = Depends(get_db)):
    if not login.email or not login.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No username or password provided",
        )

    if not auth_user(login.email, login.password, db):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    return {"status": "ok"}

def checkUserExist(email: EmailStr, db: Session) -> bool:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return True
    return False

def get_last_id(db: Session) -> int:
    user = db.query(User).order_by(User.id.desc()).first()

    return user.id

def create_user(user: UserReg, db: Session):
    try:
        new_user_id = get_last_id(db)+1

        new_user = User(
            id=new_user_id,
            email=user.email,
            name=user.name,
            lastName=user.lastname,
            pesel=user.pesel,
            password=user.password,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return True
    except Exception as e:
        print(e)
        db.rollback()
        return False


@app.post("/api/register")
async def register(user: UserReg, db: Session = Depends(get_db)):
    if not user.email or not user.password or not user.name or not user.lastname or not user.pesel:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Some data is not provided",
        )

    if not checkUserExist(user.email, db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists",
        )

    if not create_user(user, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating user",
        )


    return {"status": "ok"}