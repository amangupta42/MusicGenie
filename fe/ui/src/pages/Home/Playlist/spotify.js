import { Config } from '../../../common/Config.js';

// let state = generateRandomString(16);
const authUrl = "https://accounts.spotify.com/authorize";
const redirectUrl = `${Config.BASE_URL}/success`;
const clientId = "fd03f464343c44a99e7326a92127ff7e";

const scopes = "user-read-playback-state user-modify-playback-state playlist-modify-public"

export const loginUrl = `${authUrl}?
	client_id=${clientId}
	&redirect_uri=${redirectUrl}
	&scope=${scopes}
	&response_type=code
`
