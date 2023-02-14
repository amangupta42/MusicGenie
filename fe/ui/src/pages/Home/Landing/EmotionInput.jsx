import React, { useState, useEffect, useGlobal } from 'reactn';
import { Box, Typography, TextField, Button } from '@mui/material';
import { CONSTS } from '../../../common/Consts.jsx';
import { Options } from './Options.jsx';

const EmotionInput = ({setSongsLoading}) => {

	const [sentence, setSentence] = useState("")
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)
	const [expandOptions, setExpandOptions] = useState(false)
	const [playlistLen, setPlaylistLen] = useState(20)

	const [gsetSongsLoaded, setgSongsLoaded] = useGlobal('songsLoaded')
	const [gSongs, setgSongs] = useGlobal('songs');
	const [gPlaylistLink, setgPlaylistLink] = useGlobal('playlist_link');

	const handleInputChange = (event) => {
		setSentence(event.target.value)
	}

	const handleClick = async (event) => {
		const dataObj = {
			text : sentence,
			length: playlistLen
		};
		setSongsLoading(true)
		let response = null
		let responseJSON = null
		try {
			console.log("HERE")
			response = await fetch('http://localhost:8000/input',{
				method: 'POST',
				headers: {
			      'Content-Type': 'application/json',
			    },
			    body: JSON.stringify(dataObj)
			})
		} catch (error){
			console.log(error);
		} finally {
			if(response){
				try { 
					responseJSON = await response.json();
				} catch(error) {
					console.log(error)
				} finally {
					setgSongs(responseJSON.songs)
					setgPlaylistLink(responseJSON)
					setgSongsLoaded(true)
					setSongsLoading(false)
				}
			}	
		}
		
	}

	const toggleExpandOptions = () => {
		setExpandOptions(!expandOptions)
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
			<Box marginBottom='20px'>
				<TextField  value={sentence} onChange={handleInputChange}
					multiline 
					maxRows="8" 
					placeholder="" 
					variant="outlined"
					label={CONSTS.emotionLabel} 
					color='warning'
					sx={{
						minWidth: "300px",
						marginBottom: '5px',
					}}
				/>
				<Typography variant="caption" display="block" onClick={toggleExpandOptions} sx={{
					width: 'fit-content',
    				marginLeft: 'auto',
    				cursor: 'pointer',
    				color: `${CONSTS.secondaryColor}`
				}}>
					{expandOptions? 'Less' : 'More'}
				</Typography>
				{expandOptions? 
				<Options playlistLen={playlistLen} setPlaylistLen={setPlaylistLen}/> 
				: 
				null
				}
			</Box>
			<Button variant="contained" 
			disabled={isButtonDisabled} 
			onClick={(e) => {handleClick(e)}}
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