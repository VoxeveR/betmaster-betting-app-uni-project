from datetime import datetime
from pydantic import BaseModel

class NewGame(BaseModel):
    home: str
    away: str
    event_name: str
    start_time: datetime
    sport_type: str