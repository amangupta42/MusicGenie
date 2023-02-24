import React, { useGlobal } from 'reactn';
import { Box, Typography } from '@mui/material';
import { BaseContainer, LogoBtn } from '../../../common/Components.jsx';
import { Song } from './Song';
import { Buttons } from './Buttons';
import { PlaylistLink } from './PlaylistLink';

const Playlist = () => {
	const [gSongs, setgSongs] = useGlobal('songs');

	return (
		<BaseContainer 
			maxWidth='xl' 
			props={{
				customcol: "black",
			}}
		>
			<LogoBtn />
			<Box sx={{
				display: 'flex',
				flexDirection: 'column'
			}}>
				<Buttons/>
				<PlaylistLink/>
				<Box  sx={{
					height: 'fit-content',
					display: 'block',
				}}>
					<Typography variant='h2'>
						{gSongs.map((song) => (
							<Song 
							key={song.name}
							title={song.name}
							artist={song.artist}
							image={song.albumArt}
							previewUrl={song.soundClip}/>
						))}
					</Typography>
				</Box>
			</Box>
			
		</BaseContainer>
	)
}

export { Playlist };