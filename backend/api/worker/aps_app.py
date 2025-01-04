from apscheduler.schedulers.background import BackgroundScheduler
from api.worker.tasks import (
    task_check_game_started,
)
from api.core.logging import logger
from api.database.init_db import SessionLocal

scheduler = BackgroundScheduler()
scheduler.start()

def task_creator(task_function, task_name: str, interval_minutes: int = 1):
    def task_wrapper(*args, **kwargs):
        db = SessionLocal()
        try:
            task_function(db)
        except Exception as e:
            logger.error(e)
        finally:
            db.close()

    scheduler.add_job(task_wrapper, 'interval', minutes=interval_minutes, id=task_name)

def start_scheduler():
    task_creator(task_check_game_started, task_name="check_game_started", interval_minutes=1)

