import React, { useGlobal } from 'reactn';
import { Box, Typography } from '@mui/material';
import { BaseContainer, LogoBtn } from '../../../common/Components.jsx';
import { Song } from './Song';

const Playlist = () => {
	const [gSongs] = useGlobal('songs');

	return (
		<BaseContainer 
			maxWidth='xl' 
		>
			<LogoBtn />
			<Box  sx={{
				height: 'fit-content',
				display: 'block',
			}}>
				<Typography variant='h2'>
					{gSongs.map((song) => (
						<Song 
						key={song.Name}
						title={song.Name}
						artist={song.Artist}
						image={song.AlbumArt}/>
					))}
				</Typography>
			</Box>
		</BaseContainer>
	)
}

export { Playlist };