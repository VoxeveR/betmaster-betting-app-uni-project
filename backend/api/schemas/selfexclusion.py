from datetime import datetime
from pydantic import BaseModel

class SelfExclusionModel(BaseModel):
    start_date: datetime
    end_date: datetime