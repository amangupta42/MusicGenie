import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { BaseContainer, LogoBtn } from '../../../common/Components.jsx';
import { EmotionInput } from './EmotionInput.jsx';
import { Loader } from './Loader.jsx';
import { CONSTS } from '../../../common/Consts';

const Landing = () => {
	const [ songsLoading, setSongsLoading] = useState(false)

	return (
		<BaseContainer 
			maxWidth='xl' 
			props={{
				customcol: "black",
			}}
			
		>	
			{
				songsLoading ? 
				<Loader/>
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
						<Typography variant='h4' sx={{color:`${CONSTS.secondaryColor}`}}>
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