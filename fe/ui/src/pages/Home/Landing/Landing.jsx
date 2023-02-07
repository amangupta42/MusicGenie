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
				custombg: "#08AEEA" ,
				backgroundimage: 'linear-gradient(31deg, #08AEEA 16%, #2AF598 62%)',
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
						display: 'block',
					}}>
						<Typography variant='h2'>
							MoodToMusic
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