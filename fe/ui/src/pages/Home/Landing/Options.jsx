import React from 'reactn';
import { Box, Typography } from '@mui/material';
import { CONSTS } from '../../../common/Consts.jsx';

const Options = () => {

	return (
		<Box sx={{
			border: `1px solid ${CONSTS.secondaryColor}`,
			borderRadius: '5px',
			padding: '10px',
			color: 'rgba(0,0,0,0.5)'
		}}>
			PlaylistLen
		</Box>
	)
}

export { Options }