from fastapi import APIRouter, HTTPException
from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

# Router

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)

# OpenRouter Client

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

# Request Schema

class TaskInput(BaseModel):

    description: str

# AI Priority Suggestion Endpoint

@router.post("/summary")
def generate_summary(data: dict):

    tasks = data.get("tasks", [])

    prompt = f"""
    You are an AI productivity assistant.

    Analyze these tasks and generate a short professional summary.

    Mention:
    - completed work
    - pending tasks
    - high priority work
    - overall productivity

    Keep it concise and professional.

    Tasks:
    {tasks}
    """

    response = client.chat.completions.create(

        model="nvidia/nemotron-3-nano-30b-a3b:free",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    summary = response.choices[0].message.content

    return {
        "summary": summary
    }

@router.post("/priority")
def suggest_priority(task: TaskInput):

    try:

        prompt = f"""
        You are an AI task management assistant.

        Analyze the task description below and decide
        its priority level.

        Rules:
        - Return ONLY one word
        - Possible values:
          HIGH
          MEDIUM
          LOW

        Task:
        {task.description}
        """

        response = client.chat.completions.create(

            model="nvidia/nemotron-3-nano-30b-a3b:free",

            messages=[
                {
                    "role": "system",
                    "content": "You are an AI productivity assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.2
        )

        priority = (
            response
            .choices[0]
            .message
            .content
            .strip()
            .upper()
        )

        # Safety Validation

        allowed_priorities = [
            "HIGH",
            "MEDIUM",
            "LOW"
        ]

        if priority not in allowed_priorities:

            priority = "MEDIUM"

        return {
            "task": task.description,
            "priority": priority,
            "ai_model": "Nemotron AI"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"AI suggestion failed: {str(e)}"
        )
    