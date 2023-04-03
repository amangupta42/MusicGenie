from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from recommend_playlist import *
from pydantic import BaseModel
import recommender_model
import uvicorn


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

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to playlist generator."}

@app.post("/input")
async def get_input(request: FreeText):

    #subprocess.run(['python3', 'recommender_model.py', 'input', '-t', request.text])
    print("User Text : " + request.text)
    print("User length : "+ request.length)
    response = recommender_model.main(request.text, request.length)
    
    return Response(content=response, media_type="application/json")

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)