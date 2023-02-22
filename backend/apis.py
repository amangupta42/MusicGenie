from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
import recommender_model
from recommend_playlist import *



app = FastAPI()

origins = [
    "*"
]

class baseRequest(BaseModel):
    text: str
    length: int

class createPlaylistRequest(BaseModel):
    songs: List[str]
    title: str
    token: str

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
async def get_input(request: baseRequest):

    response = recommender_model.main(request.text, request.length)
    return Response(content=response, media_type="application/json")



