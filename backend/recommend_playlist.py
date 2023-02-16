import config as cfg
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import logging
import json
import pickle
import numpy as np

# Configuring logging 
logging.basicConfig(filename=cfg.LOGFILE_NAME, format="%(asctime)s %(levelname)s: %(message)s",
                    level=logging.INFO)


def authorizeUser(access_token):

    # Tell spotify which user data fields we need to access and modify
    scope = "user-read-playback-state,user-modify-playback-state,playlist-modify-public"
    sp = spotipy.Spotify(auth=access_token)
    return sp

def authorizeApp():

    scope = 'user-library-read'
    sp = spotipy.Spotify(auth_manager = SpotifyClientCredentials(client_id=cfg.CLIENT_ID,
                                                   client_secret=cfg.CLIENT_SECRET))
    return sp


def predict_genre(text : str):
    # Returns the most similar genres

    with open('CrossEncoder_GenrePicker.pkl', 'rb') as ce_file:
        similarity_model = pickle.load(ce_file)

    

    # Take all combinations of the text and genre
    genres = cfg.genres
    sentence_combinations = [[text, genre] for genre in genres]

    # find the similarity scores between the text and each genre
    similarity_scores = similarity_model.predict(sentence_combinations)
    sim_scores_sorted = reversed(np.argsort(similarity_scores))

    # Return the top genres over a given threshold
    top_genres = []
    top_scores = []
    for idx in sim_scores_sorted:
        if len(top_genres) < 5:
            top_genres.append(genres[idx])
            top_scores.append(similarity_scores[idx])

    for i in range(len(top_scores) - 1):
        if abs(top_scores[i + 1]) - abs(top_scores[i]) > 2:
            top_genres = top_genres[:i + 1]
            break

    return top_genres


def recommend(param_dict, genre_list, sp, length):
    # Generates a list of track_URIs from the given params

    # Call Spotify recommendations API 
    result = sp.recommendations(seed_genres=genre_list, limit=length,country="US", **param_dict)

    # Iterate over response from Spotify, taking track URIs from recommended tracks
    if result:
        track_uris = []
        track_names = []
        cover_arts = []
        artists = []
        preview_url = []
        print(json.dumps(result))
        for track in result['tracks']:
            print(f"Song: {track['name']}, Artist: {dict(track['album']['artists'][0])['name']}\n")
            track_uris.append(track['uri'])
            track_names.append(track['name'])
            cover_arts.append( track['album']['images'][0]['url'])
            artists.append((track['album']['artists'][0])['name'])
            preview_url.append((track['preview_url']))
        logging.info("Tracks added to playlist")
        for name in track_names:
            logging.info(name)
    else:
        logging.warning(f"Nothing was returned from Spotify for url {param_dict}.")
        raise Exception("Nothing returned from Spotify.")
    return track_uris,track_names,cover_arts,artists,preview_url


def create_spotify_playlist(track_uris, input_text, sp):
    # Creates a spotify playlist from a list of track_uris

    user_id = sp.me()['id']
    playlist_to_add = f"{input_text} - {user_id}"

    # Create playlist from given track URIs
    sp.user_playlist_create(user_id, playlist_to_add)
    playlists = sp.user_playlists(user_id)
    playlist_uid = playlists['items'][0]['id']
    playlist_link = f"https://open.spotify.com/playlist/{playlist_uid}"
    

    # Add tracks
    sp.playlist_add_items(playlist_uid, track_uris)
    logging.info(f"Spotify playlist '{playlist_to_add}' was created for Spotify user '{user_id}'.")

    return playlist_link
