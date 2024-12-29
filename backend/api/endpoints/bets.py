from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.services.user import (
    create_user,
    checkUserExist,
    get_user_detials,
)
from api.database.init_db import get_db
from api.schemas.bets import Event

router = APIRouter()

## TODO: Added endpoint for bets
