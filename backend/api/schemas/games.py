from datetime import datetime
from typing import Optional

from pydantic import BaseModel

class NewGame(BaseModel):
    home: str
    away: str
    event_name: str
    start_time: datetime
    sport_type: str

class GameUpdate(BaseModel):
    home: Optional[str]
    away: Optional[str]
    event_name: Optional[str]
    start_time: Optional[datetime]
    sport_type: Optional[str]
    game_type: Optional[str]