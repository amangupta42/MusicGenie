import React, { useGlobal } from 'reactn';
import { Box, Typography, Link } from '@mui/material';
import { CONSTS } from '../../../common/Consts';

const PlaylistLink = () => {
	const [gPlaylistLink,] = useGlobal('playlist_link');

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
			<Link href={gPlaylistLink} sx={{
				color:`white`,
				textDecoration: 'inherit',
			}}>
				<Typography>
					Click here to open playlist on Spotify!
				</Typography>
			</Link>
		</Box>
	)
}

export { PlaylistLink };