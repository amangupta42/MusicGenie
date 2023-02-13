from fastapi import FastAPI, Response, Request, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import csv
import json
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

    response, tracks = recommender_model.main(request.text, request.length)
    return Response(content=response, media_type="application/json")

@app.put("/create")
async def create_playlist(token: str = Header(None)):
    
    # if uris == []:
    #     raise HTTPException(status_code=500, detail='Timed out, try again')
    # if token == None:
    #     raise HTTPException(status_code = 404, detail = 'Invalid login')
    sp = recommend_playlist.authorizeUser(access_token=token)
    playlist_link = recommend_playlist.create_spotify_playlist(uris,text,sp)

    return Response(content = playlist_link, media_type = "application/json")




