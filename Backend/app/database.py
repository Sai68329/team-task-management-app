from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

# Database URL

DATABASE_URL = os.getenv("DATABASE_URL")

# Database Engine

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

# Session Factory

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base Model

Base = declarative_base()

# Dependency

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()