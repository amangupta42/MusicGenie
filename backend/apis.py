from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import os
import time
import csv
import json
from recommend_playlist import *

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


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

@app.get("/input")
def start(text: str):
    os.system("recommend_model.py input -t \""+text+"\"")
    time.sleep(2)
    songs =[]
    with open('tracklist.csv') as f:
        songs = [{k: v for k, v in row.items()}
        for row in csv.DictReader(f, skipinitialspace=True)]
    final = json.dumps(songs,indent = 2)
    return Response(content=final, media_type="application/json")



