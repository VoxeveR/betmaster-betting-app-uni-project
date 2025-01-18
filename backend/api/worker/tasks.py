from datetime import datetime, timedelta
from sqlalchemy.orm import Session
import os
from api.core.logging import logger
from api.database.models.games import Games, GameStatus
from api.database.models.gameReslut import GameResult
from api.database.models.transactions import Transactions, TransactionStatus, TransactionType
from api.database.models.account import Account
from api.database.models.betsgames import BetsGames
from api.database.models.bets import Bets, BetStatus, BetResult
from api.database.models.transactions import Transactions
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image

import pandas as pd
import matplotlib.pyplot as plt

def task_check_game_started(db: Session):
    try:
        db.query(Games).filter(
            Games.game_status == GameStatus.BEFORE and
            Games.start_time <= datetime.now()).update({Games.game_status: GameStatus.PLAYING})

        logger.info(f"Game started at {datetime.now()}")

        db.commit()
    except Exception as e:
        logger.error(e)
        db.rollback()


def task_check_game_ended(db: Session):
    try:
        bets = db.query(Bets.bet_id, Bets.user_id, Bets.bet_amount, Bets.odds).filter(Bets.status == BetStatus.UNSETTLED).all()

        for bet_id, user_id, bet_amount, odds in bets:
            bets_games = db.query(BetsGames.game_id, BetsGames.expected_result).filter(BetsGames.bet_id == bet_id).all()

            numer_of_game = 0
            numer_of_won_games = 0

            for game_id, expected_result in bets_games:

                numer_of_game += 1
                game = db.query(Games).filter(Games.game_id == game_id).first()

                if game.game_status == GameStatus.FINISHED:
                    if game.game_result != expected_result:
                        db.query(Bets).filter(Bets.bet_id == bet_id).update(
                            {
                                Bets.status: BetStatus.SETTLED,
                                Bets.bet_result: BetResult.LOST,
                             }
                        )
                        logger.info(f"User {user_id} finished the bet: {bet_id} and LOST")
                    else:
                        numer_of_won_games += 1

            if numer_of_game == numer_of_won_games and numer_of_game != 0 and numer_of_won_games != 0:
                db.query(Bets).filter(Bets.bet_id == bet_id).update(
                    {
                        Bets.status: BetStatus.SETTLED,
                        Bets.bet_result: BetResult.WON,
                    }
                )
                logger.info(f"User {user_id} finished the bet: {bet_id} and WON")
                account = db.query(Account.account_id).filter(Account.user_id == user_id).first()

                new_transaction = Transactions(
                    account_id=account.account_id,
                    transaction_type=TransactionType.BET_TRANSACTION,
                    amount=bet_amount*odds,
                    transaction_date=datetime.now(),
                    status=TransactionStatus.CREDITED,
                )

                db.add(new_transaction)
                logger.info(f"Added transaction for won bet {bet_id}")
                db.query(Account).filter(Account.account_id == account.account_id).update(
                    {
                        Account.balance: Account.balance + (bet_amount*odds),
                    }
                )
                logger.info(f"Updated account balance for won bet {bet_id}")

        db.commit()

    except Exception as e:
        logger.error(e)
        db.rollback()

def task_generate_raport(db: Session, filename: str):
    try:
        filename =  filename + "_" +  str(datetime.now().date()) + ".pdf"

        one_week_ago = datetime.now() - timedelta(days=7)

        transactions = db.query(Transactions).filter(Transactions.transaction_date >= one_week_ago).all()

        data = {
            'Date': [t.transaction_date.date() for t in transactions],
            'Amount': [t.amount for t in transactions],
        }

        df = pd.DataFrame.from_dict(data)

        total_sum = df['Amount'].sum()

        plt.figure(figsize = (12, 8))
        plt.bar(df['Date'], df['Amount'], color = 'b')
        plt.title("Transaction Raport from last  week")
        plt.xlabel("Date")
        plt.ylabel("Amount")
        plt.xticks(rotation = 45)
        plt.grid(True)
        plt.tight_layout()
        plot_filename = f"transactions_{str(datetime.now().date())}.png"
        chart_filename = os.path.join("..\\static\\img", plot_filename)
        os.makedirs("..\\static\\img", exist_ok=True)
        plt.savefig(chart_filename)
        plt.close()


        pdf_path = os.path.join("..\\static\\pdf", filename)
        os.makedirs("..\\static\\pdf", exist_ok=True)
        pdf = SimpleDocTemplate(pdf_path, pagesize=A4)
        styles = getSampleStyleSheet()

        elements = []

        total_text = Paragraph("Transaction Raport from last  week", styles['Title'])
        elements.append(total_text)
        elements.append(Spacer(1, 20))

        total_text = Paragraph(f"Total sum: {total_sum:.2f} PLN", styles['BodyText'])
        elements.append(total_text)
        elements.append(Spacer(1, 20))

        chart = Image(chart_filename, width=400, height=300)
        elements.append(chart)

        pdf.build(elements)
        logger.info(f"Raport generated {pdf_path}")
    except Exception as e:
        logger.error(e)