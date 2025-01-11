from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.services.user import (
    create_user,
    get_user_detials,
    checkUserExistEmail,
    get_clients,
    get_employees,
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

    if not checkUserExistEmail(user.email, db):
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
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Param not provided",
        )



    user_data = get_user_detials(user_id, db)
    if user_data is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error quering user",
        )

    return {
        "status": "ok",
        "data": user_data
    }

@router.get("/update/{user_id}")
async def update(user_id: int, db: Session = Depends(get_db)):
    # Zwrócic tylko zmienione dane
    # dodać pola aktywne w zakładach
    pass

@router.get("/clients")
async def clients(db: Session = Depends(get_db)):
    clients_dict = get_clients(db)

    if clients_dict is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Somthing went wrong on database",
        )

    return {
        "status": "ok",
        "data": clients_dict
    }

@router.get("/employees")
async def employees(db: Session = Depends(get_db)):
    employees_dict = get_employees(db)

    if employees_dict is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Somthing went wrong on database",
        )

    return {
        "status": "ok",
        "data": employees_dict
    }