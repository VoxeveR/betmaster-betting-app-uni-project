from api.database.models.games import Games, GameStatus
from api.database.models.odds import Odds, OddsType
from typing_extensions import Optional
from sqlalchemy.orm import Session
from api.core.logging import logger
from collections import defaultdict

def checkGameExist(games: dict, db: Session) -> bool:
    for game_id in games.keys():
        game = db.query(Games).filter(Games.game_id == int(game_id)).first()
        if not game:
            return False
    return True

def get_games_categories(db: Session) -> Optional[defaultdict]:
    try:
        result = db.query(Games.sport_type, Games.event_name).filter(Games.game_status != GameStatus.FINISHED).all()

        categories = defaultdict(set)

        for sport_type, event_name in result:
            categories[sport_type].add(event_name)

        return categories
    except Exception as e:
        logger.error(e)
        return None


def get_games_by_event_name(event_name: str, db: Session) -> Optional[dict]:
    try:
        result = db.query(Games.game_id, Games.home, Games.away, Games.start_time, Odds.odds, Odds.odds_type).join(Odds).filter(Games.event_name == event_name and Games.game_status != GameStatus.FINISHED).all()

        grouped_games = {}

        for game_id, home, away, start_time, odds, odds_type in result:

            if game_id not in grouped_games:
                grouped_games[game_id] = {
                    'home': home,
                    'away': away,
                    'start_time': start_time.time(),
                    'start_date': start_time.date(),
                    'odds1': None,
                    'oddsX': None,
                    'odds2': None
                }

            if odds_type == OddsType.One:
                grouped_games[game_id]['odds1'] = odds
            elif odds_type == OddsType.Two:
                grouped_games[game_id]['odds2'] = odds
            elif odds_type == OddsType.X:
                grouped_games[game_id]['oddsX'] = odds

        return grouped_games

    except Exception as e:
        logger.error(e)
        return None