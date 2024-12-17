from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.database.init_db import get_db
from api.services.games import get_games_categories

router = APIRouter()

@router.get("/")
async def get_games(db: Session = Depends(get_db)):
    pass

@router.get("/categories")
async def get_categories(db: Session = Depends(get_db)):
    categories = get_games_categories(db)

    if categories is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong",
        )

    return {
        "status": "ok",
        "data": categories,
    }