import os
from dotenv import load_dotenv

load_dotenv()

def createURL() -> str:
    user_db = os.getenv('USER_DB')
    pass_db = os.getenv('PASS_DB')
    ip_db = os.getenv('IP_DB')
    port_db = os.getenv('PORT_DB')
    database = os.getenv('DATABASE')

    return f'postgresql://{user_db}:{pass_db}@{ip_db}:{port_db}/{database}'

