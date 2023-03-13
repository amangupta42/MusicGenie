import React , { useEffect, useState } from 'reactn';
import { Box, Typography, Button } from '@mui/material';
import { CONSTS } from '../../../common/Consts';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

const Song = (({title, artist, image, previewUrl=null}) => {
	const [snippet, ]  = useState(new Audio(previewUrl));
	const [isPlaying, setIsPlaying] = useState(false)

	const handleSongPlay = () => {
		if(previewUrl !== null){
			setIsPlaying(true)
			snippet.play()
		}
	}

	const handleSongStop = () => {
		snippet.pause();
		snippet.currentTime = 0;
		setIsPlaying(false)
	}

	// Pause audio if playing on unmount
	useEffect(() => {
		return () => {
			snippet.pause();
			snippet.currentTime = 0;
			setIsPlaying(false)
		}
	},[])

	return (
		<Box sx={{
		minHeight: 'fit-content',
		maxHeight: '60px',
		minWidth: '70%',
		padding: '10px 20px',
		paddingLeft: '70px',
		backgroundImage: `url(${image})`,
		backgroundPosition: 'top 10px left 20px',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '40px',
		margin: '10px',
		color: 'inherit',
		borderRadius: '5px',
	    boxShadow: `10px 5px 5px ${CONSTS.secondaryColor}`,
	    border: `1px solid ${CONSTS.secondaryColor}`,
	    display: 'flex',
	    justifyContent: 'space-between'
	}}>
		<Box sx={{
			display:'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'center',
		}}>
			
			<Typography variant='subtitle' sx={{
				fontSize:"20px",
				display: 'block',
				width: '100%',
				textAlign: 'left'
			}}>
				{title} 	
			</Typography>
		
		
			<Typography variant='subtitle' sx={{
				fontSize:"16px",
				display: 'block',
				width: '100%',
				textAlign: 'left'
			}}>
				{artist} 	
			</Typography>
		</Box>

		{
			!isPlaying ? 
			(<PlayCircleIcon className={previewUrl === null ? 'disabled' : ''}
			onClick={handleSongPlay}
			sx={{
				display: 'flex',
				minWidth: '40px',
				maxWidth: '40px',
				height: '40px',
				borderRadius: '50%',
				backgroundColor: `${CONSTS.secondaryColor}`,
				marginLeft: '10px',
				cursor: 'pointer',
				'&:hover': {
					opacity: 0.8
				},
				'&.disabled': {
					opacity: 0.4,
					cursor: 'default'
				}
			}}/>) : 
			(<StopCircleIcon className={previewUrl === null ? 'disabled' : ''}
			onClick={handleSongStop}
			sx={{
				display: 'flex',
				minWidth: '40px',
				maxWidth: '40px',
				height: '40px',
				borderRadius: '50%',
				backgroundColor: `${CONSTS.secondaryColor}`,
				marginLeft: '10px',
				cursor: 'pointer',
				'&:hover': {
					opacity: 0.8
				},
				'&.disabled': {
					opacity: 0.4,
					cursor: 'default'
				}
			}}/>)
		}
		
	</Box>
	)
})

export { Song }