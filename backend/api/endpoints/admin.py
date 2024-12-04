from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.services.user import checkUserExist
from api.services.admin import create_new_admin
from api.database.init_db import get_db
from api.schemas.user import UserReg

router = APIRouter()

@router.get("/newadmin")
async def newAdmin(newadmin: UserReg, db: Session = Depends(get_db)):
    if not newadmin.email or not newadmin.name or not newadmin.password or not newadmin.surname or not newadmin.username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not enough data provided",
        )

    if not checkUserExist(newadmin.email, db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Admin already exist",
        )

    if not create_new_admin(newadmin, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating new admin"
        )
