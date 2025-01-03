from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.services.auth import auth_user, check_self_exclusion
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

    if check_self_exclusion(login.email, db):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="This user is self-exclusive",
        )

    resp = auth_user(login.email, login.password, db)
    if resp is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )


    return {
        "status": "ok",
        "data": resp,
    }