from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.database.init_db import get_db
from api.services.games import get_games_categories, get_games_by_event_name

router = APIRouter()

@router.get("/{event_name}")
async def get_games(event_name: str, db: Session = Depends(get_db)):
    if not isinstance(event_name, str) or not event_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Name must be provided",
        )

    games_odds = get_games_by_event_name(event_name, db)

    if games_odds is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found",
        )

    return {
        "status": "ok",
        "data": games_odds,
    }

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