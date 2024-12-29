from fastapi import APIRouter
from api.endpoints import (
    auth,
    user,
    admin,
    games,
    bets,
)

api_router = APIRouter()

api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["auth"]
)

api_router.include_router(
    user.router,
    prefix="/users",
    tags=["users"]
)

api_router.include_router(
    admin.router,
    prefix="/admin",
    tags=["admin"]
)

api_router.include_router(
    games.router,
    prefix="/games",
    tags=["games"]
)

api_router.include_router(
    bets.router,
    prefix="/bets",
    tags=["bets"]
)