from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.database.init_db import get_db
from api.services.user import checkUserExistById
from api.schemas.selfexclusion import SelfExclusion
from api.services.selfexclusion import add_selfexclusion

router = APIRouter()

@router.post("/{user_id}")
async def selfexclusion(user_id: int, new_selfexclusion: SelfExclusion,  db: Session = Depends(get_db)):
    if checkUserExistById(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User doesn't exist",
        )

    if new_selfexclusion.start_date > new_selfexclusion.end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="end date is before start date",
        )

    if not add_selfexclusion(user_id, new_selfexclusion, db):
        raise HTTPException(
            status_code=status.HTTP_500_BAD_REQUEST,
            detail="self exclusion failed",
        )

    return {
        "status": "ok",
    }