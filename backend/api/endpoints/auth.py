from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.services.auth import (
    auth_user_by_email,
    auth_user_by_username,
    check_self_exclusion_by_email,
    check_self_exclusion_by_username,
    check_if_user_banned_by_username,
    check_if_user_banned_by_email,
)
from api.database.init_db import get_db
from api.schemas.auth import Login

router = APIRouter()
@router.post("/login")
async def auth(login: Login, db: Session = Depends(get_db)):
    if login.email:
        if  check_self_exclusion_by_email(login.email, db):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is self exclusive",
            )

        if not check_if_user_banned_by_email(login.email, db):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is banned",
            )

        resp = auth_user_by_email(login.email, login.password, db)
        if resp is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is not registered",
            )

        return {
            "status": "ok",
            "data": resp,
        }
    elif login.username:
        if check_self_exclusion_by_username(login.username, db):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is self exclusive",
            )

        if not check_if_user_banned_by_username(login.username, db):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is banned",
            )

        resp = auth_user_by_username(login.username, login.password, db)

        if resp is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is not registered",
            )

        return {
            "status": "ok",
            "data": resp,
        }