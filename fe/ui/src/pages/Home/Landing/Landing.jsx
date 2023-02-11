import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { BaseContainer, LogoBtn } from '../../../common/Components.jsx';
import { EmotionInput } from './EmotionInput.jsx';

const Landing = () => {
	const [ songsLoading, setSongsLoading] = useState(false)

	useEffect(() => {
		console.log(songsLoading)
	},[songsLoading])

	return (
		<BaseContainer 
			maxWidth='xl' 
			props={{
				custombg: "#f3a686" ,
				backgroundimage: 'linear-gradient(45deg, #f3a686 0%, #ffffff 38%)',
				customcol: "black",
			}}
			
		>	
			{
				songsLoading ? 
				<Box  sx={{
					height: 'fit-content',
					display: 'block',
				}}>
					<Typography variant='h2'>
						LOADING ...
					</Typography>
				</Box>
				:
				<Box sx={{
					display:'flex',
					flexDirection:'column',
					justifyContent:'space-between'
				}}>
					<LogoBtn />
					<Box  sx={{
						height: 'fit-content',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center'
					}}>
						<Typography variant='h1'>
							MusicGenie
						</Typography>
						<Typography variant='h4' sx={{color:'#f57b42'}}>
							Just enter how you feel to get a playlist of songs with similar emotion
						</Typography>
					</Box>

					<EmotionInput setSongsLoading={setSongsLoading}/>
					<Box></Box>
				</Box>
			}
		</BaseContainer>
	)
}

export { Landing };