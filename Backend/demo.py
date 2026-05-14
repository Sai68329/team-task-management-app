from fastapi import FastAPI

app=FastAPI()

@app.get("/")
def Great():
    return "Hello"

