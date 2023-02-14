import React from 'reactn';
import { Box, Typography, TextField } from '@mui/material';
import { CONSTS } from '../../../common/Consts.jsx';

const Options = ({playlistLen, setPlaylistLen}) => {

	const handlePlaylistLenChange = (e) => {
		const len = e.target.value;
		if(len > 100){
			setPlaylistLen(100)
		} else if( len < 1){
			setPlaylistLen(1)
		} else {
			setPlaylistLen(Number(e.target.value))
		}
	}

	return (
		<Box sx={{
			boxShadow: '0px 0px 8px 2px rgba(0,0,0,0.2)',
			borderRadius: '5px',
			padding: '10px',
			color: 'rgba(0,0,0,0.5)',
			width: '70%',
			margin: 'auto'
		}}>
			<Box sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '0 10px'
			}}>
				<Typography variant="overline" sx={{
					color: `${CONSTS.secondaryColor}`,
					fontWeight: 'bold'
				}}>
					Number of Songs :
				</Typography>
				<TextField 
				variant="standard" 
				size="small" 
				color="secondary" 
				value={playlistLen} 
				onChange={(event) => {handlePlaylistLenChange(event)}} 
				type="number"
				InputProps={{ inputProps: { min: 1, max: 50 } }}
				sx={{
					width: '40px',
					'&:focus-visible' : {
						outline: '#f57b42 auto 1px'
					},
					'& input': {
						textAlign: 'center'
					}
				}}/>
			</Box>

		</Box>
	)
}

export { Options }