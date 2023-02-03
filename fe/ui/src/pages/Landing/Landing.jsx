import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { BaseContainer, LogoBtn } from '../../common/Components.jsx';
import { EmotionInput } from './EmotionInput.jsx';

const Landing = () => {
	return (
		<BaseContainer 
			maxWidth='xl' 
			props={{
				custombg: "#3852E0" ,
				customcol: "#E09F4F",
				flexdir: "column",
				justifycontent: "space-between"
			}}
			
		>
			<LogoBtn />
			<Box  sx={{
				height: 'fit-content',
				display: 'block',
			}}>
				<Typography variant='h2'>
					Get Songs for your current mood!
				</Typography>
			</Box>

			<EmotionInput/>
			<Box></Box>
		</BaseContainer>
	)
}

export { Landing };