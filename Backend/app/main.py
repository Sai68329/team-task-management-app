from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine


from app.routers import (
    auth_router,
    project_router,
    task_router,
    ai_router
)

# Create Database Tables

Base.metadata.create_all(bind=engine)

# FastAPI App

app = FastAPI(
    title="AI Task Manager API",
    description="AI Powered Project & Task Management System",
    version="1.0.0"
)
app.include_router(auth_router.router)
# CORS Configuration

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "https://team-task-management-app-beta.vercel.app"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# Routers

app.include_router(auth_router.router)

app.include_router(project_router.router)

app.include_router(task_router.router)

app.include_router(ai_router.router)

# Root Endpoint

@app.get("/")
def home():

    return {
        "message": "AI Task Manager Running Successfully",
        "status": "ACTIVE"
    }


# Health Check Endpoint

@app.get("/health")
def health_check():

    return {
        "server": "running",
        "database": "connected",
        "ai_feature": "enabled"
    }