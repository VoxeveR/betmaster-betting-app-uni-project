from pydantic import BaseModel

# TODO: Add schemas for bets

class CreateBet(BaseModel):
    user_id: int
    game_ids: list[int]
    amount: int
    odds: float
