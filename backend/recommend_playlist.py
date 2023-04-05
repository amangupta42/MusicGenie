import config as cfg
from spotipy.oauth2 import SpotifyClientCredentials
import logging
import compress

# Configuring logging 
logging.basicConfig(filename=cfg.LOGFILE_NAME, format="%(asctime)s %(levelname)s: %(message)s",
                    level=logging.INFO)




def argsort(seq):
    # http://stackoverflow.com/questions/3071415/efficient-method-to-calculate-the-rank-vector-of-a-list-in-python
    return sorted(range(len(seq)), key=seq.__getitem__)

def predict_genre(text : str, similarity_model):
    # Returns the most similar genres

    # with open('CrossEncoder_GenrePicker.pkl', 'rb') as ce_file:
    #     similarity_model = pickle.load(ce_file)

    # similarity_model = compress.decompress_pickle("CrossEncoder_GenrePicker.pbz2")
    # print("Genre model decompressed")

    # Take all combinations of the text and genre
    genres = cfg.genres
    
    sentence_combinations = [[text, genre] for genre in genres]

    # find the similarity scores between the text and each genre
    similarity_scores = similarity_model.predict(sentence_combinations)
    sim_scores_sorted = reversed(argsort(similarity_scores))
    
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
    result = sp.recommendations(seed_genres=genre_list, limit=50, **param_dict)
    # result = sp.new_releases(limit = 20)
    # Iterate over response from Spotify, taking track URIs from recommended tracks
    
    if result:
        track_uris = []
        track_names = []
        cover_arts = []
        artists = []
        preview_url = []
        
        for track in result['tracks']:
            
            print(f"Song: {track['name']}, Artist: {dict(track['album']['artists'][0])['name']}\n")
            track_uris.append(track['uri'])
            track_names.append(track['name'])
            cover_arts.append( track['album']['images'][0]['url'])
            artists.append((track['album']['artists'][0])['name'])
            preview_url.append((track['preview_url']))
        


        # for item in result['albums']['items']:
            
        #     print(f"Song: {item['name']}, Artist: {item['artists'][0]['name']}\n")
        #     track_uris.append(item['uri'])
        #     track_names.append(item['name'])
        #     cover_arts.append( item['images'][0]['url'])
        #     artists.append((item['artists'][0])['name'])
            # track_info = sp.track(item['uri'])
            # print(track_info)
            # preview_url.append(track_info['preview_url'])
        
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
    playlist_to_add = f"{input_text} - MusicGenie"

    # Create playlist from given track URIs
    sp.user_playlist_create(user_id, playlist_to_add)
    playlists = sp.user_playlists(user_id)
    playlist_uid = playlists['items'][0]['id']
    playlist_link = f"https://open.spotify.com/playlist/{playlist_uid}"
    

    # Add tracks
    sp.playlist_add_items(playlist_uid, track_uris)
    logging.info(f"Spotify playlist '{playlist_to_add}' was created for Spotify user '{user_id}'.")

    return playlist_link
