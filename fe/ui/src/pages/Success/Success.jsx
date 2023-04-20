import React, { useEffect, useState, useGlobal } from 'reactn';
import { Box, Typography } from '@mui/material';

import { BaseContainer } from '../../common/Components';
import { Header } from './Header';
import { Config } from '../../common/Config.js';

const Success = () => {
	const [authCode,setAuthCode] = useState(null)

	const [gSentence, setgSentence] = useGlobal('userInput');

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const authCode = urlParams.get('code');
	    // const hash = window.location.hash
	    // let authCode = window.localStorage.getItem("authCode")

	    // if (!authCode && hash) {
	    //     authCode = hash.substring(1).split("&").find(elem => elem.startsWith("code")).split("=")[1]

	    //     window.location.hash = ""
	    
	    // }

	    if(authCode){
	    	window.localStorage.setItem("authCode", authCode)
	    }

	    setAuthCode(authCode)

	    let urls = JSON.parse(window.localStorage.getItem('song_urls'));

	    const dataObj = {
	    	authCode: authCode,
	    	title: gSentence,
	    	trackUrls: urls
	    }
	    
	    const create = async () => {
	    	const response = await fetch(`${Config.API_BASE}/create`,{
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