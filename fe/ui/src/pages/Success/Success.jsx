import React, { useEffect, useState } from 'reactn';
import { Box, Typography } from '@mui/material';
import { BaseContainer } from '../../common/Components';

const Success = () => {
	const [accessToken,setAccessToken] = useState(null)

	useEffect(() => {
	    const hash = window.location.hash
	    let token = window.localStorage.getItem("token")

	    if (!token && hash) {
	        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

	        window.location.hash = ""
	        window.localStorage.setItem("token", token)
	    }

	    setAccessToken(token)
	    
	}, [])

	return (
		<BaseContainer sx={{color:'black'}}>
			Success!
		</BaseContainer>
	)
}


export { Success };