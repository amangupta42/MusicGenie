import json
import sys
import pandas as pd
import glob
import os
import pickle
from sentence_transformers import SentenceTransformer
import config as cfg
import torch
import numpy as np
import xgboost
from recommend_playlist import *
import logging
#from parse_args import parse_args
import csv

logging.basicConfig(filename=cfg.LOGFILE_NAME, format="%(asctime)s %(levelname)s: %(message)s",
                    level=logging.INFO)

PARAMS = ['target_acousticness', 'target_danceability', 'target_energy', 'target_instrumentalness',
                  'key', 'target_liveness', 'target_loudness', 'mode', 'target_speechiness',
                  'target_tempo', 'time_signature', 'target_valence']

def embed_text(text):
    #Use a HuggingFace sentence-transformers/all-MiniLM-L6-v2 model to map sentences & paragraphs to a 384 dimensional dense vector space

    with open('MiniLMTransformer.pkl', 'rb') as f:
        embedder = pickle.load(f)

    # Embed input text
    
    input_to_model = embedder.encode(text)
    return input_to_model


def generate_params(model_input):
    

    input_to_spotify_transformer = {}

    # Find the XGB files
    xgboost_files = os.path.join("model/*_model_xgb_384")
    xgboost_models = glob.glob(xgboost_files)

    # Use each XGB model to predict on corresponding audio parameter
    for parameter, model in zip(PARAMS, xgboost_models):
        with open(model, 'rb') as f:
            xgb_model = pickle.load(f)
        preds = xgb_model.predict(model_input.reshape(1, -1))
        input_to_spotify_transformer[parameter] = preds[0]

    return input_to_spotify_transformer


def main(text : str, length : int = 20):
    # Get user arguments
    # args = parse_args(sys.argv[1:])
    # Generate playlist using embedded user input and predicted genre by user's criteria

    try:
        #Auth
        sp = authorize()
        #Genre Prediction
        genres = predict_genre(text)
        print("Predicted genre from text input: ")
        print(genres)

        #Text embedding for sentiment analysis
        embedded_text = embed_text(text)

        #Generate target PARAMS
        params = generate_params(embedded_text)

        #Recommend songs based on target params
        tracks,names,cover_art,artists,preview_url = recommend(params, genres, sp, length)

        print("Recommended tracks")
        print(tracks)

        playlist_link = create_spotify_playlist(tracks, text, sp)

        response_json = {"playlist_link" : playlist_link, "songs" : []}

        for i in range(len(names)):
            curr = {
                "name" : names[i],
                "albumArt" : cover_art[i],
                "artist" : artists[i],
                "soundClip" : preview_url[i]
            }
            response_json["songs"].append(curr)
        response_json = json.dumps(response_json,indent=3)

        return response_json
        
            



    # Error Handling
    except ValueError as e:
        print(e)
        logging.critical(e)
    except AttributeError as e:
        print(e)
        logging.critical(e)
    except TypeError as e:
        print(e)
        logging.critical(e)


if __name__ == '__main__':
    main()
