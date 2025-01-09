from pydantic import BaseModel

class ChangeBalance(BaseModel):
    user_id: int
    amount: float