from pydantic import BaseModel

class CreateBet(BaseModel):
    user_id: int
    games: dict
    amount: float
    odds: float