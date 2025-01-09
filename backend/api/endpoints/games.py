from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.database.init_db import get_db
from api.schemas.games import (
    NewGame,
    GameUpdate,
)
from api.services.games import (
    get_games_categories,
    get_games_by_event_name,
    checkGameExistsByHomeAway,
    checkGameExistById,
    add_new_game,
    update_game_by_id
)

router = APIRouter()


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

@router.post("/")
async def new_game(new_game: NewGame, db: Session = Depends(get_db)):
    if not isinstance(new_game, NewGame):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New game must be provided",
        )

    if new_game.start_time < datetime.now():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Game already started",
        )

    if not checkGameExistsByHomeAway(new_game.home, new_game.away, new_game.event_name, db):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Game already exists",
        )

    if not add_new_game(new_game, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong",
        )

    return {
        "status": "success",
    }

@router.patch("/{game_id}")
async def update_game(game_id: int, game_update: GameUpdate, db: Session = Depends(get_db)):
    if checkGameExistById(game_id, db):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Game not found",
        )

    if  game_update.start_time is not None:
        if game_update.start_time < datetime.now():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Game already started",
            )


    if not update_game_by_id(game_id, game_update, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong",
        )

    return {
        "status": "success",
    }