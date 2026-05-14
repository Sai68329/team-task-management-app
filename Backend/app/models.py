from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String, default="MEMBER")


class Project(Base):

    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    description = Column(String, nullable=False)

    status = Column(String, default="ACTIVE")

    created_by = Column(Integer)
 

class Task(Base):

    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(String, nullable=False)

    priority = Column(String, default="MEDIUM")

    status = Column(String, default="TODO")

    deadline = Column(DateTime)

    assigned_to = Column(
        Integer,
        ForeignKey("users.id")
    )

    project_id = Column(
        Integer,
        ForeignKey("projects.id")
    )

    # RELATIONSHIPS

    assigned_user = relationship(
        "User"
    )

    project = relationship(
        "Project"
    )