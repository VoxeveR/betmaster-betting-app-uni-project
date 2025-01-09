from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class NewGame(BaseModel):
    home: str
    away: str
    event_name: str
    start_time: datetime
    sport_type: str
    odds1: float
    odds2: float
    oddsX: Optional[float]