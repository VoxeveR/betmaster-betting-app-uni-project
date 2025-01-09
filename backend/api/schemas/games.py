from datetime import datetime
from typing import Optional

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


class GameUpdate(BaseModel):
    home: Optional[str]
    away: Optional[str]
    event_name: Optional[str]
    start_time: Optional[datetime]
    game_status: Optional[str]
    sport_type: Optional[str]
    game_type: Optional[str]
