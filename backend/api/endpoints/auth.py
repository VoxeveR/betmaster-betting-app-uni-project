from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.services.auth import auth_user
from api.database.init_db import get_db
from api.schemas.auth import Login

router = APIRouter()
@router.post("/login")
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