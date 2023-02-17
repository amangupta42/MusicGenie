import React, { useEffect, useState, useGlobal } from 'reactn';
import { Box, Typography } from '@mui/material';

import { BaseContainer } from '../../common/Components';
import { Header } from './Header';

const Success = () => {
	const [accessToken,setAccessToken] = useState(null)

	const [gSentence,] = useGlobal("userInput");

	useEffect(() => {
	    const hash = window.location.hash
	    let token = window.localStorage.getItem("token")

	    if (!token && hash) {
	        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

	        window.location.hash = ""
	        window.localStorage.setItem("token", token)
	    }

	    setAccessToken(token)

	    let urls = JSON.parse(window.localStorage.getItem('song_urls'));

	    const dataObj = {
	    	token: token,
	    	title: gSentence,
	    	songs: urls
	    }

	    const create = async () => {
	    	const response = await fetch('http://localhost:8000/create',{
				method: 'POST',
				headers: {
			      'Content-Type': 'application/json',
			    },
			    body: JSON.stringify(dataObj)
			});
			const responseJSON = await response.json();
			return responseJSON
	    }

	    const data = create()
	    .catch(console.error);
	    
	}, [])

	return (
		<BaseContainer maxWidth='xl' 
		props={{
			customcol: "black",
		}}>
			<Header/>
		</BaseContainer>
	)
}


export { Success };