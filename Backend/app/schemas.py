from pydantic import BaseModel, EmailStr
from datetime import datetime


# AUTH SCHEMAS

class SignupSchema(BaseModel):

    name: str
    email: EmailStr
    password: str


class LoginSchema(BaseModel):

    email: EmailStr
    password: str


# PROJECT SCHEMAS

class ProjectSchema(BaseModel):

    name: str
    description: str

    # NEW
    status: str = "ACTIVE"


class ProjectResponse(ProjectSchema):

    id: int

    class Config:
        from_attributes = True


# TASK SCHEMAS

class TaskSchema(BaseModel):

    title: str
    description: str

    priority: str

    # NEW
    status: str = "TODO"

    deadline: datetime

    assigned_to: int

    project_id: int


class TaskResponse(TaskSchema):

    id: int

    class Config:
        from_attributes = True