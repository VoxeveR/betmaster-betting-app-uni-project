from api.database.models.games import Games, GameStatus
from typing_extensions import Optional
from sqlalchemy.orm import Session
from api.core.logging import logger
from collections import defaultdict


def get_games_categories(db: Session) -> Optional[dict]:
    try:
        result = db.query(Games.sport_type, Games.event_name).filter(Games.game_status != GameStatus.FINISHED).all()

        categories = defaultdict(list)

        for sport_type, event_name in result:
            categories[sport_type].append(event_name)

        return categories
    except Exception as e:
        logger.error(e)
        return None