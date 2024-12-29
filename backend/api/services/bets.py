from api.database.models.bets import Bets, BetStatus, BetResult
from typing_extensions import Optional
from sqlalchemy.orm import Session
from api.core.logging import logger
from collections import defaultdict

## TODO: Add services for bets