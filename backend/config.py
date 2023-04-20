
#This is the developer details. Only change the client ID and secret according to the information in the SPotify Developer Account.
CLIENT_ID = "fd03f464343c44a99e7326a92127ff7e"
CLIENT_SECRET = "2fd02f0aaa5d47e9a9acd3d5caa4d6c0"
REDIRECT_URI = "http://https://amangupta42.github.io/success"

AUTH_URL = 'https://accounts.spotify.com/api/token'
BASE_URL = 'https://api.spotify.com/v1'

# These genres are for checking whhat genres match with the sentiment in the free text entered by the user. You can customize to
# get songs only belonging to one genre or check from many. If the threshold does not include the items in the genre database, the
# default genre list is used.

# genres = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass",
#           "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill",
#           "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house",
#           "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic",
#           "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove",
#           "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays",
#           "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol",
#           "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc",
#           "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party",
#           "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house",
#           "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock",
#           "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes",
#           "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer",
#           "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"]

genres = ["acoustic", "alt-rock", "alternative", "ambient", "anime",
          "bluegrass", "blues", "children", "chill", "classical", "club",
          "comedy", "country", "dance", "disco", "disney", "dubstep", "edm",
          "electronic", "emo", "folk", "funk", "garage", "gospel", "goth",
          "grunge", "guitar", "happy", "hard-rock", "hardcore", "heavy-metal",
          "hip-hop", "holidays", "house", "idm", "indie", "indie-pop", "jazz", "k-pop", "kids", "latin", "metal",
          "movies", "opera", "party", "piano", "pop", "power-pop", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae",
          "reggaeton", "road-trip", "rock", "rock-n-roll", "romance", "sad", "salsa", "show-tunes",
          "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "study", "summer",
          "synth-pop", "tango", "techno", "work-out", "world-music"]

PARAMS = ['target_acousticness', 'target_danceability', 'target_energy', 'target_instrumentalness',
                  'key', 'target_liveness', 'target_loudness', 'mode', 'target_speechiness',
                  'target_tempo', 'time_signature', 'target_valence']

#Default genres if the user enteres input sentiment does not match with the above genres declared.
default_genres = ['pop', 'rock', 'folk', 'hip-hop', 'electronic']

#LOG File details
LOGFILE_NAME = "logs.log"

#Threshold to check genre compatibility.
THRESHOLD = -5

#Audio features that are recieved from Spotify API.
AUDIO_FEATURES_TO_EXTRACT = ['danceability', 'energy', 'key', 'mode', 'loudness', 'speechiness', 'acousticness',
                             'instrumentalness', 'liveness', 'valence', 'tempo', 'time_signature']
