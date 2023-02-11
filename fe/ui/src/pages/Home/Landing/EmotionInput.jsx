import React, { useState, useEffect, useGlobal } from 'reactn';
import { Box, Typography, TextField, Button } from '@mui/material';
import { CONSTS } from '../../../common/Consts.jsx';

const EmotionInput = ({setSongsLoading}) => {

	const [sentence, setSentence] = useState("")
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)
	const [gsetSongsLoaded, setgSongsLoaded] = useGlobal('songsLoaded')
	const [gSongs, setgSongs] = useGlobal('songs');
	const [gPlaylistLink, setgPlaylistLink] = useGlobal('playlist_link');

	const handleInputChange = (event) => {
		setSentence(event.target.value)
	}

	const handleClick = async (event) => {
		const dataObj = {text : sentence};
		setSongsLoading(true)
		const response = await fetch('http://localhost:8000/input',{
			method: 'POST',
			headers: {
		      'Content-Type': 'application/json',
		    },
		    body: JSON.stringify(dataObj)
		});
		
		const responseJSON = await response.json();
		setgSongs(responseJSON.songs)
		setgPlaylistLink(responseJSON)
		setSongsLoading(false)
		setgSongsLoaded(true)
	}

	useEffect(() => {
		if(sentence.length > 0) {
			setIsButtonDisabled(false)
		}
		else{
			setIsButtonDisabled(true)
		}
	},[sentence])

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-between'

		}}>
			
			<TextField  value={sentence} onChange={handleInputChange}
				multiline 
				maxRows="8" 
				placeholder="" 
				variant="outlined"
				// color="black"
				label="Feeling happy on a sunny beach!!..." color='warning'
				sx={{
					minWidth: "300px",
					margin: '20px 0',
				}}
			/>
			<Button variant="contained" 
			disabled={isButtonDisabled} 
			onClick={handleClick}
			sx={{
				color: `${CONSTS.secondaryColor}`,
				backgroundColor: 'black',
			}}>
				Generate Playlist
			</Button>
		</Box>
	)
}

export { EmotionInput };