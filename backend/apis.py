from fastapi import FastAPI, Response, Request
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import csv
import json
from recommend_playlist import *
from pydantic import BaseModel
import recommender_model

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

class FreeText(BaseModel):
    text: str
    length: int


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to playlist generator."}

@app.post("/input")
async def get_input(request: FreeText):

    #subprocess.run(['python3', 'recommender_model.py', 'input', '-t', request.text])
    response = recommender_model.main(request.text, request.length)
    
    return Response(content=response, media_type="application/json")