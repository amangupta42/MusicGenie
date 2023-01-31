from fastapi import FastAPI
import os
import time
import csv
import json
from recommend_playlist import *

app = FastAPI()
@app.get("/input")
def start(text: str):
    os.system("recommend_model.py input -t \""+text+"\"")
    time.sleep(2)
    songs =[]
    with open('tracklist.csv') as f:
        songs = [{k: v for k, v in row.items()}
        for row in csv.DictReader(f, skipinitialspace=True)]
    final = json.dumps(songs,indent = 2)
    return final



