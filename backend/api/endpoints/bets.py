from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.services.user import checkUserExistById
from api.services.games import checkGameExistByDict
from api.services.account import check_balance_for_bet
from api.services.bets import (add_bet, get_history)
from api.database.init_db import get_db
from api.schemas.bets import CreateBet

router = APIRouter()

@router.post("/")
async def create_bet(createBet: CreateBet, db: Session = Depends(get_db)):
    if checkUserExistById(createBet.user_id, db):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if not checkGameExistByDict(createBet.games, db):
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

    if not check_balance_for_bet(createBet.user_id, createBet.amount, db):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough money in account"
        )

    if not add_bet(createBet, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

    return {
        "status": "ok",
    }

@router.get("/{user_id}")
async def get_bets(user_id: int, db: Session = Depends(get_db)):
    if checkUserExistById(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    bets = get_history(user_id, db)

    if bets is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

    return {
        "status": "ok",
        "data": bets
    }