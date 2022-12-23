# Free-text-music-recommendation
Creating a deep learning model to read sentiments from user input and create a playlist of songs matching the mood on Spotify.

## Overview

This project aims to create a working model and application that converts free text into a playlist based on the sentiments of the free text.  

### Languages / Libraries
* Python
* StreamLit
* Spotipy
* Pytorch

## Running the application

### Installation 

1. Get your Spotify Credentials by following the tutorial here: https://www.youtube.com/watch?v=WHugvJ0YR5I 

2. Clone the repo
   ```
   git clone https://github.com/amangupta42/Free-text-music-recommendation.git
   ```
3. Install all the required libraries by installing the requirements in the requirements.txt file with the command

  ```
  pip install -r requirements.txt
  ```
4. Update `config.py` with your credentials for both Spotify Id (Both CLIENT ID and SECRET ID)

5. First run the python file recommender_model.py login input -t "free text"

6. When you run the code for the first time, you will be redirected to spotify for a one time authorization. Once you log in, this will not happen again.

