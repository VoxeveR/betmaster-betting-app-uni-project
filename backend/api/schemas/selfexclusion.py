from datetime import datetime
from pydantic import BaseModel

class SelfExclusion(BaseModel):
    start_date: datetime
    end_date: datetime