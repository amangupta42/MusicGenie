import React, { useGlobal } from 'reactn';
import { Box , Typography, Button} from '@mui/material';
import { CONSTS } from '../../../common/Consts';
import { loginUrl } from './spotify';

const Buttons = () => {
	const [,setgSongsLoaded] = useGlobal('songsLoaded');
	const [,setgSongs] = useGlobal('songs');

	const createNewPlaylist = () => {
		setgSongs([])
		setgSongsLoaded(false)
	}

	const spotifyRedirect = () => {
		window.location.replace(loginUrl)
	}

	return (
		<Box sx={{
			marginBottom: '10px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			<Button onClick={spotifyRedirect} sx={{
				boxSizing: 'border-box',
				minWidth: '150px',
				minHeight: '60px',
				borderRadius: '10px',
				backgroundColor: `${CONSTS.spotifyGreen}`,
				border: '1px solid black',
				color: 'white',
				marginRight: '20px',
				'&:hover': {
					boxShadow: `10px 5px 5px ${CONSTS.spotifyGreen}`,
					backgroundColor: `${CONSTS.spotifyGreen}`,
				}
			}}>
				<Typography variant="caption">
					Get it on Spotify!
				</Typography>
				
			</Button>
			<Button onClick={createNewPlaylist} sx={{
				boxSizing: 'border-box',
				minWidth: '150px',
				minHeight: '60px',
				borderRadius: '10px',
				backgroundColor: `${CONSTS.secondaryColor}`,
				border: '1px solid black',
				color: 'white',
				'&:hover': {
					boxShadow: `10px 5px 5px ${CONSTS.secondaryColor}`,
					backgroundColor: `${CONSTS.secondaryColor}`,
				}
			}}>
				<Typography variant="caption">
					Create new playlist!
				</Typography>
				
			</Button>
		</Box>
	)
}

export { Buttons }