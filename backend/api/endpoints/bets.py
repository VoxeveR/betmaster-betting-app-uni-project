from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.services.user import checkUserExist
from api.services.games import checkGameExist
from api.database.init_db import get_db
from api.schemas.bets import CreateBet

router = APIRouter()

@router.post("/")
async def create_bet(createBet: CreateBet, db: Session = Depends(get_db)):
    if  not checkUserExist(createBet.user_id, db):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if not checkGameExist(createBet.game_ids, db):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Game not found"
        )

    if not createBet.odds or createBet.odds < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Odds cannot be negative or zero"
        )

    if not createBet.amount or createBet.amount < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Amount cannot be negative or zero"
        )

    #TODO: Check account balans

    return {
        "status": "success",
    }