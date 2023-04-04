import json
import glob
import os
import config as cfg
from recommend_playlist import *
import logging
import compress

logging.basicConfig(filename=cfg.LOGFILE_NAME, format="%(asctime)s %(levelname)s: %(message)s",
                    level=logging.INFO)

PARAMS = cfg.PARAMS

def embed_text(text):
    #Use a HuggingFace sentence-transformers/all-MiniLM-L6-v2 model to map sentences & paragraphs to a 384 dimensional dense vector space

    # with open('MiniLMTransformer.pkl', 'rb') as f:
    #     embedder = pickle.load(f)
    embedder = compress.decompress_pickle("MiniLMTransformer.pbz2")
    print("Huggingface model decompressed")
    # Embed input text
    
    input_to_model = embedder.encode(text)
    return input_to_model


def generate_params(model_input):
    

    input_to_spotify_transformer = {}

    # Find the XGB files
    xgboost_files = os.path.join("models/*.pbz2")
    xgboost_models = glob.glob(xgboost_files)
    target_models=[]

    for model in xgboost_models:
        target_models.append(compress.decompress_pickle(model))
    

    # Use each XGB model to predict on corresponding audio parameter
    for parameter, model in zip(PARAMS, target_models):
        preds = model.predict(model_input.reshape(1, -1))
        input_to_spotify_transformer[parameter] = preds[0]


    return input_to_spotify_transformer


def main(text : str, length : int = 20):
    # Get user arguments
    # args = parse_args(sys.argv[1:])
    # Generate playlist using embedded user input and predicted genre by user's criteria

    try:
        print("Start")
        #Auth
        sp = authorize()
        print("Authorized")

        #Genre Prediction
        genres = predict_genre(text)
        print("Predicted genre from text input: ")
        print(genres)

        #Text embedding for sentiment analysis
        embedded_text = embed_text(text)

        #Generate target PARAMS
        params = generate_params(embedded_text)
        print("predicted parameters")
        print(params)

        #Recommend songs based on target params
        tracks,names,cover_art,artists,preview_url = recommend(params, genres, sp, length)

        print("Recommended tracks")
        print(tracks)

        playlist_link = create_spotify_playlist(tracks, text, sp)
        # playlist_link = ""

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
