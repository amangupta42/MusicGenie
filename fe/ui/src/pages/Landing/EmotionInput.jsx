import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const EmotionInput = () => {

	const [sentence, setSentence] = useState("")
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	const handleInputChange = (event) => {
		setSentence(event.target.value)
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
			<Typography>
				Just enter how you feel to get a playlist of songs with similar emotion
			</Typography>
			
			<TextField  value={sentence} onChange={handleInputChange} 
				multiline 
				maxRows="8" 
				placeholder="Feeling happy on a sunny beach!..." 
				variant="outlined"
				sx={{
					minWidth: "300px",
					margin: '20px 0'
				}}
			/>
			<Button variant="contained" color="success" disabled={isButtonDisable}>Generate Playlist</Button>
		</Box>
	)
}

export { EmotionInput };