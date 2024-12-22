from api.database.models.games import Games, SportType, GameStatus
from typing_extensions import Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from api.core.logging import logger


def get_games_categories(db: Session) -> Optional[dict]:
    try:
        result = db.query(func.count(Games.game_id), Games.sport_type).filter(Games.game_status != GameStatus.FINISHED).group_by(Games.sport_type).all()

        categories = {sport_type: count for count, sport_type in result}

        return categories
    except Exception as e:
        logger.error(e)
        return None