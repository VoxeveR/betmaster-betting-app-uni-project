from typing import Optional
from api.database.models.bets import Bets, BetStatus
from api.database.models.games import Games
from api.database.models.gameReslut import GameResult
from api.database.models.betsgames import BetsGames
from sqlalchemy.orm import Session
from api.core.logging import logger
from api.schemas.bets import CreateBet
from api.services.account import change_balance_by_bet



def add_bet(createBets: CreateBet, db: Session) -> bool:
    try:
        if change_balance_by_bet(createBets.user_id, createBets.amount, db):
            new_bet = Bets(
                user_id=createBets.user_id,
                bet_amount=createBets.amount,
                odds=createBets.odds,
                status=BetStatus.UNSETTLED,
            )

            db.add(new_bet)
            db.flush()

            for game_id, expected_result in createBets.games.items():
                new_bet_game = BetsGames(
                    game_id=int(game_id),
                    bet_id=new_bet.bet_id,
                )
                if expected_result == GameResult.One.value:
                    new_bet_game.expected_result=GameResult.One
                if expected_result == GameResult.Two.value:
                    new_bet_game.expected_result=GameResult.Two
                if expected_result == GameResult.X.value:
                    new_bet_game.expected_result=GameResult.X

                db.add(new_bet_game)
                db.flush()

            db.commit()
            return True
    except Exception as e:
        logger.error(e)
        db.rollback()
        return False

def get_history(user_id: int, db: Session) -> Optional[dict]:
    try:
        bets = db.query(Bets, Games, BetsGames).join(BetsGames, Bets.bet_id == BetsGames.bet_id).join(Games, BetsGames.game_id == Games.game_id).filter(Bets.user_id == user_id).all()

        response = dict()

        for bet, game, bet_game in bets:
            if bet.bet_id not in response:
                response[bet.bet_id] = {
                    "bet_result": bet.bet_result,
                    "bet_amount": float(bet.bet_amount),
                    "odds": float(bet.odds),
                    "created_at": bet.created_at.isoformat(),
                    "status": bet.status,
                    "games": []
                }


            response[bet.bet_id]["games"].append({
                "home": game.home,
                "away": game.away,
                "event_name": game.event_name,
                "start_time": game.start_time.isoformat(),
                "game_status": game.game_status,
                "sport_type": game.sport_type,
                "game_result": game.game_result,
                "expected_result": bet_game.expected_result
            })

        return response
    except Exception as e:
        logger.error(e)

        return None