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
from parse_args import parse_args
import csv

logging.basicConfig(filename=cfg.LOGFILE_NAME, format="%(asctime)s %(levelname)s: %(message)s",
                    level=logging.INFO)

PARAMS = ['target_acousticness', 'target_danceability', 'target_energy', 'target_instrumentalness',
                  'key', 'target_liveness', 'target_loudness', 'mode', 'target_speechiness',
                  'target_tempo', 'time_signature', 'target_valence']

def embed_text(args):
    #Use a HuggingFace sentence-transformers/all-MiniLM-L6-v2 model to map sentences & paragraphs to a 384 dimensional dense vector space

    with open('MiniLMTransformer.pkl', 'rb') as f:
        embedder = pickle.load(f)

    # Embed input text
    input_text = args.text
    input_to_model = embedder.encode(input_text)
    return input_to_model


def generate_params(model_input, args):
    # Uses separate XGB models to predict values from all 12 song parameters used by Spotify

    # Create dictionary to be added to (with popularity if argument has been passed)
    # if args.popularity:
    #     input_to_spotify_transformer = {'target_popularity': args.popularity}
    # else:
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

    if args.verbose > 0:
        print(input_to_spotify_transformer)
    return input_to_spotify_transformer


def main():
    # Get user arguments
    args = parse_args(sys.argv[1:])
    # Generate playlist using embedded user input and predicted genre by user's criteria
    if args.command == 'input':
        try:
            #Auth
            sp = authorize()
            #Genre Prediction
            genres = predict_genre(args)
            print("Predicted genre from text input: ")
            print(genres)

            #Text embedding for sentiment analysis
            embedded_text = embed_text(args)

            #Generate target PARAMS
            params = generate_params(embedded_text, args)

            #Recommend songs based on target params
            tracks,names,cover_art,artists = recommend(params, genres, sp, args)

            print("Recommended tracks")
            print(tracks)

            playlist_link = create_spotify_playlist(tracks, args.text, sp, args)

            response_json = {"playlist_link" : playlist_link, "songs" : []}

            for i in range(len(names)):
                curr = {
                    "Name" : names[i],
                    "AlbumArt" : cover_art[i],
                    "Artist" : artists[i]
                }
                response_json["songs"].append(curr)
            response_json = json.dumps(response_json,indent=3)

            # f = open("tracklist.csv", "w")
            # headers = ["Name" ,"AlbumArt", "Artist"]
            # csvwriter = csv.writer(f)
            # csvwriter.writerow(headers)
            # for i in range(len(names)):
            #     data = [names[i],cover_art[i],artists[i]]
            #     csvwriter.writerow(data)
            # f.close()

            # with open('tracklist.csv') as f:
            #     songs = [{k: v for k, v in row.items()}
            #     for row in csv.DictReader(f, skipinitialspace=True)]
            # final = json.dumps(songs,indent = 2)
            print(response_json)
            with open("response.json", "w") as outfile:
                json.dump(response_json, outfile)
            
                



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
