import React, { useGlobal } from 'reactn';
import { Box, Typography } from '@mui/material';
import { BaseContainer, LogoBtn } from '../../../common/Components.jsx';
import { Song } from './Song';
import { Buttons } from './Buttons';

const Playlist = () => {
	const [gSongs, setgSongs] = useGlobal('songs');

	return (
		<BaseContainer 
			maxWidth='xl' 
			props={{
				custombg: "#f3a686" ,
				backgroundimage: 'linear-gradient(45deg, #f3a686 0%, #ffffff 38%)',
				customcol: "black",
			}}
		>
			<LogoBtn />
			<Box sx={{
				display: 'flex',
				flexDirection: 'column'
			}}>
				<Buttons/>
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