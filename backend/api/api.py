from fastapi import APIRouter
from api.endpoints import user

api_router = APIRouter()

api_router.include_router(
    user.router,
    prefix="/users",
    tags=["users"]
)