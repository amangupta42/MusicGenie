import React, { useGlobal } from 'reactn';
import { Box, Typography, Link } from '@mui/material';
import { CONSTS } from '../../../common/Consts';
import { Config } from '../../../common/Config.js';
import { loginUrl } from './spotify.js';

const PlaylistLink = () => {
	const [gPlaylistLink,] = useGlobal('playlist_link');
	const [gSentence,] = useGlobal('userInput');

	const handleSpotifyClick = async () => {
		window.location.href = loginUrl
		const urls = JSON.parse(window.localStorage.getItem('song_urls'))
		const dataObj = {
			trackUrls : urls,
			userInput: gSentence
		}
		console.log({dataObj})
		try {
			const response = await fetch(`${Config.API_BASE}/create`,{
				method: 'POST',
				headers: {
			      'Content-Type': 'application/json',
			    },
			    body: JSON.stringify(dataObj)
			})
			const responseJSON = await response.json();
			console.log({responseJSON})
		} catch (error) {
			console.log("HERE BE DRAGONS")
			console.log(error);
		}
	}

	return (
		<Box sx={{
			margin: '10px 0',
			padding: '10px 5px',
			background: 'lightgray',
			borderRadius: '20px',
			'&:hover': {
				background: `${CONSTS.spotifyGreen}`
			}
		}}>
			<Link onClick={() => {window.location.href = loginUrl}} sx={{
				color:`white`,
				textDecoration: 'inherit',
				cursor: 'pointer'
			}}>
				<Typography>
					Click here to open playlist on Spotify!
				</Typography>
			</Link>
		</Box>
	)
}

export { PlaylistLink };