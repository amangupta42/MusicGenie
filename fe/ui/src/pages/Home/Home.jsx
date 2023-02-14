import React, { useGlobal } from 'reactn';
import Landing from './Landing';
import Playlist from './Playlist';

const Home = () => {
	const [ gsongsLoaded, setgSongsLoaded ] = useGlobal('songsLoaded');
	return (
		<>
		{
			gsongsLoaded ? 
			<Playlist/>
				:
			<Landing/>
		}
		</>
	)
}

export { Home };