from fastapi import FastAPI, Response, Request, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import csv
import json
from typing import List
import recommend_playlist
from pydantic import BaseModel
import recommender_model


app = FastAPI()

origins = [
    "*"
]

class baseRequest(BaseModel):
    text: str
    length: int

class createPlaylistRequest(BaseModel):
    title: str
    songs: List[str]

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

@app.post("/create")
async def create_playlist(playlist : createPlaylistRequest,token: str = Header(None)):
    
    sp = recommend_playlist.authorizeUser(access_token=token)
    playlist = json.dumps(playlist.dict())
    playlist_link = recommend_playlist.create_spotify_playlist(playlist["songs"],playlist.title,sp)
    return Response(content = playlist_link, media_type = "application/json")




