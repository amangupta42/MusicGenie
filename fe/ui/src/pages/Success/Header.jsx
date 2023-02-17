import React, { useGlobal } from 'reactn';
import { Box , Typography } from '@mui/material';

import { CONSTS } from '../../common/Consts.jsx';

const Header = () => {

	const [gSentence,] = useGlobal('userInput');

	return (
		<Box sx={{
			height: 'fit-content',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center'
		}}>
			<Typography variant='h1'>
				Success!
			</Typography>
			<Typography variant='h4' sx={{
				color:`${CONSTS.secondaryColor}`
			}}>
				Added playlist {gSentence} on your spotify account.
			</Typography>
		</Box>
	)
}


export { Header };