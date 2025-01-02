from api.database.models.bets import Bets, BetStatus, BetResult
from typing_extensions import Optional
from sqlalchemy.orm import Session
from api.core.logging import logger
from api.schemas.bets import CreateBet
from collections import defaultdict

## TODO: Add services for bets

'''
TODO: Na początku sprawdzenie konta
    Zmiena kwoty na kącie
    Dodanie transakcji
    Dodanie betu
'''
def add_bet(db: Session) -> bool:
    try:
        pass
    except Exception as e:
        logger.error(e)
        db.rollback()
        return False