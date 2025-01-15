from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.services.user import checkUserExistEmail
from api.services.admin import create_new_admin, get_latest_file
from api.database.init_db import get_db
from api.schemas.user import UserReg

router = APIRouter()

@router.post("/newadmin")
async def newAdmin(newadmin: UserReg, db: Session = Depends(get_db)):
    if not newadmin.email or not newadmin.name or not newadmin.password or not newadmin.surname or not newadmin.username or not newadmin.phone_number or not newadmin.pesel:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not enough data provided",
        )

    if not checkUserExistEmail(newadmin.email, db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Admin already exist",
        )

    if not create_new_admin(newadmin, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating new admin"
        )

    return {
        "status": "ok",
    }

@router.get("/statistics")
async def statistics(db: Session = Depends(get_db)):
    stat_img = get_latest_file("..\\static\\img")

    if stat_img is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found",
        )

    stat_pdf = get_latest_file("..\\static\\pdf")

    if stat_pdf is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found",
        )

    return {
        "stat_img": stat_img,
        "stat_pdf": stat_pdf,
    }
