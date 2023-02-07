import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './headphones32.png';

export const BaseContainer = styled(Container)(({theme, props={} }) => ({
  	display: 'flex',
	flexDirection: `${props.flexdir ? props.flexdir : 'row'}`,
	justifyContent: `${props.justifycontent ? props.justifycontent : 'center'}`,
	padding:`${props.padding ? props.padding : '64px 20px'}`,
	background : `${props.custombg ? props.custombg : 'white'}`, 
	backgroundImage: `${props.backgroundimage ? props.backgroundimage : 'none'}`,
	height: '100vh',
	color: `${props.customcol ? props.customcol : 'white'}`,
	[theme.breakpoints.down('sm')]: {
      padding: '20px'
    },
}));


export const LogoBtn = styled(Button)( ({theme}) => ({
  	display: 'inline-block',
  	padding: '5px',
  	position: 'fixed',
  	top: '20px',
  	left: '20px',
  	minWidth: '40px',
  	height: '40px',
  	boxShadow: '0px 0px 14px 7px rgba(0,0,0,0.5)',
  	borderRadius: '50%',
	textAlign: 'center',
	backgroundImage : `url(${Logo})`,
	backgroundSize: '50%',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat', 
}) );
