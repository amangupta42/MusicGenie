from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from recommend_playlist import *
from pydantic import BaseModel
import recommender_model
import uvicorn
import spotipy
import compress

prereqs = []


app = FastAPI()

origins = [
    # '*',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:3000',
    'https://amangupta42.github.io'
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

@app.on_event("startup")
async def startup_event():
    #Auth
    # App Only Flow
    client_id = cfg.CLIENT_ID
    client_secret = cfg.CLIENT_SECRET
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    prereqs.append(sp)
    print("Authorized")
    # Load the ML model
    
    embedder = compress.decompress_pickle("MiniLMTransformer.pbz2")
    print("Huggingface model decompressed")
    similarity_model = compress.decompress_pickle("CrossEncoder_GenrePicker.pbz2")
    print("Genre model decompressed")
    prereqs.append(similarity_model)
    prereqs.append(embedder)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to playlist generator."}

@app.post("/input")
async def get_input(request: FreeText):

    #subprocess.run(['python3', 'recommender_model.py', 'input', '-t', request.text])
    print("User Text : " + request.text)
    print("User length : "+ str(request.length))
    response = recommender_model.main(prereqs[0], prereqs[1], prereqs[2], request.text, request.length)
    
    return Response(content=response, media_type="application/json")

@app.post("/create")
async def create_playlist(request : BaseModel):
    print("Logging in")
    # User Login Flow
    # Tell spotify which user data fields we need to access and modify
    scope = "user-read-playback-state,user-modify-playback-state,playlist-modify-public user-read-recently-played"
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=cfg.CLIENT_ID,
                                                   client_secret=cfg.CLIENT_SECRET,
                                                   redirect_uri=cfg.REDIRECT_URI,
                                                   scope=scope))
    response = recommender_model.create_spotify_playlist(request.trackUrl,request.text, sp)

    return Response(content = response, media_type = "application/json")
    

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)