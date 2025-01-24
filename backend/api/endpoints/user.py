from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.services.user import (
    create_user,
    get_user_detials,
    checkUserExistEmail,
    checkUserBanned,
    checkUserUnbanned,
    checkUserExistById,
    get_clients,
    get_employees,
    ban_user,
    unban_user,
    delete_user,
    update_user,
)
from api.database.init_db import get_db
from api.schemas.user import (
    UserReg,
    UserUpdate
)

router = APIRouter()

@router.post("/register")
async def register(user: UserReg, db: Session = Depends(get_db)):
    if not user.email or not user.password or not user.name or not user.surname or not user.pesel or not user.phone_number:
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

@router.patch("/update/{user_id}")
async def update(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    if checkUserExistById(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_404_CONFLICT,
            detail="User not found",
        )


    if not update_user(user_id, user_update, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error updating user",
        )

    return {
        "status": "ok",
    }

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

@router.delete("/{user_id}")
async def delete(user_id: int, db: Session = Depends(get_db)):
    if checkUserExistById(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User doesn't exist",
        )

    if not delete_user(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error deleting user",
        )

    return {
        "status": "ok",
    }



@router.patch("/ban/{user_id}")
async def ban(user_id: int, db: Session = Depends(get_db)):
    if checkUserExistById(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User does not exist",
        )

    if checkUserBanned(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already banned",
        )

    if not ban_user(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error banning user",
        )

    return {
        "status": "ok",
    }

@router.patch("/unban/{user_id}")
async def unban(user_id: int, db: Session = Depends(get_db)):
    if checkUserExistById(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User does not exist",
        )

    if checkUserUnbanned(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already banned",
        )

    if not unban_user(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error banning user",
        )

    return {
        "status": "ok",
    }