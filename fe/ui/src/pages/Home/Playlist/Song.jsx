import React from 'reactn';
import { Box, Typography } from '@mui/material';
// import Logo from '../../../common/headphones32.png';

const Song = (({title, artist, image}) => {
	return (
		<Box sx={{
		maxHeight: '50px',
		minWidth: '70%',
		padding: '10px 20px',
		margin: '10px',
		border: '1px solid black',
		borderBottom: '1px solid black',
		color: 'inherit',
		borderRadius: '5px',
		// backgroundColor: 'rgba(245, 123, 66, 0.5)'
	}}>
		<Box sx={{
			paddingLeft: '50px',
			display:'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'center',
			backgroundImage: `url(${image})`,
			backgroundPosition: 'top left',
			backgroundRepeat: 'no-repeat',
			backgroundSize: '40px',
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
		
	</Box>
	)
})

export { Song }