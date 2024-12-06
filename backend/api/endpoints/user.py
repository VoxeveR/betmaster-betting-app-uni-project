from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.services.user import (
    create_user,
    checkUserExist,
)
from api.database.init_db import get_db
from api.schemas.user import UserReg

router = APIRouter()

@router.post("/register")
async def register(user: UserReg, db: Session = Depends(get_db)):
    if not user.email or not user.password or not user.name or not user.surname:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Some data is not provided",
        )

    if not checkUserExist(user.email, db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists",
        )

    if not create_user(user, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating user",
        )

    return {"status": "ok"}

@router.get("/me/{user_id}")
async def me(user_id: int, db: Session = Depends(get_db)):
    # Zwracacć wszystko oprócz hasła, peselu i nr_dowodu
    pass

@router.get("/update/{user_id}")
async def update(user_id: int, db: Session = Depends(get_db)):
    # Zwrócic tylko zmienione dane
    # dodać pola aktywne w zakładach
    pass