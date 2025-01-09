from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.schemas.account import ChangeBalance
from api.services.account import (
    get_balance_from_account,
    change_balance_by_deposit,
    change_balance_by_withdrawal
)
from api.services.user import (
    checkUserExistById
)
from api.database.init_db import get_db

router = APIRouter()

@router.get("/{user_id}")
async def account(user_id: int, db: Session = Depends(get_db)):
    if checkUserExistById(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    resp = get_balance_from_account(user_id, db)

    if resp is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User does not have a balance"
        )

    return {
        "status": "ok",
        "data": resp
    }

@router.post("/deposit")
async def deposit(change_balance: ChangeBalance, db: Session = Depends(get_db)):
    if checkUserExistById(change_balance.user_id, db):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if change_balance.amount < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Deposit amount cannot be negative"
        )

    if  not change_balance_by_deposit(change_balance, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Deposit failed"
        )

    return {
        "status": "success",
    }


@router.post("/withdrawal")
async def withdrawal(change_balance: ChangeBalance, db: Session = Depends(get_db)):
    if checkUserExistById(change_balance.user_id, db):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if change_balance.amount > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Deposit amount cannot be positive"
        )

    if  not change_balance_by_withdrawal(change_balance, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Deposit failed"
        )

    return {
        "status": "success",
    }