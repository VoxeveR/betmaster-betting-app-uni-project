from api.database.models.bets import Bets, BetStatus
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