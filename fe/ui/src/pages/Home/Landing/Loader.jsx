import React from 'reactn';
import { Box, Typography } from '@mui/material';
import { Puff } from 'react-loading-icons';
import { CONSTS} from '../../../common/Consts';


const Loader = () => {
	return (
		<Box  sx={{
					minHeight: '100%',
					display: 'flex',
					alignItems: 'center'
				}}>
			<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<Puff stroke={CONSTS.secondaryColor} height="60px" width="60px" />
				<Typography variant="subtitle" color={CONSTS.secondaryColor} sx={{
					marginTop: '15px'
				}}>
					{CONSTS.loadingText}
				</Typography>
			</Box>
		</Box>
	)
};

export { Loader };