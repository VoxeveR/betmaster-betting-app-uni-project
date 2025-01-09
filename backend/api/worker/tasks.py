from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy.sql.coercions import expect

from api.core.logging import logger
from api.database.models.games import Games, GameStatus
from api.database.models.transactions import Transactions

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
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


def task_generate_raport(db: Session, filename: str):
    try:
        filename = filename + "_" +  str(datetime.now().date()) + ".pdf"

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
        chart_filename = "transactions_chart.png"
        plt.savefig(chart_filename)
        plt.close()

        pdf = SimpleDocTemplate(filename, pagesize=A4)
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
        logger.info(f"Raport generated {filename}")
    except Exception as e:
        logger.error(e)