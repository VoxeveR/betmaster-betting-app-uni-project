from api.database.models.games import Games, GameStatus
from api.database.models.odds import Odds, OddsType
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

def get_games_by_event_name(event_name: str, db: Session) -> Optional[dict]:
    try:
        result = db.query(Games.home, Games.away, Games.start_time, Odds.odds, Odds.odds_type).join(Odds).filter(Games.event_name == event_name and Games.game_status != GameStatus.FINISHED).all()

        grouped_games = {}

        for home, away, start_time, odds, odds_type in result:
            game_key = (home, away, start_time)

            if game_key not in grouped_games:
                grouped_games[game_key] = {
                    'home': home,
                    'away': away,
                    'start_time': start_time.time(),
                    'start_date': start_time.date(),
                    'odds1': None,
                    'oddsX': None,
                    'odds2': None
                }

            if odds_type == OddsType.One:
                grouped_games[game_key]['odds1'] = odds
            elif odds_type == OddsType.Two:
                grouped_games[game_key]['odds2'] = odds
            elif odds_type == OddsType.X:
                grouped_games[game_key]['oddsX'] = odds

        games = {str(i): game_data for i, game_data in enumerate(grouped_games.values())}

        return games

    except Exception as e:
        logger.error(e)
        return None