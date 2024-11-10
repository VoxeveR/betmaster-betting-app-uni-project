from sqlalchemy import Column, Integer, String, Boolean, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:root@localhost:3306/betmaster"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=False, nullable=False)
    name = Column(String, unique=False, index=False, nullable=False)
    lastName = Column(String, unique=False, index=False, nullable=False)
    email = Column(String, unique=False, index=False, nullable=False)
    password = Column(String, nullable=False)
    pesel = Column(Integer, nullable=False)
    verified = Column(Boolean, nullable=True, default=False)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)