import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './headphones32.png';

export const BaseContainer = styled(Container)(({theme, props={} }) => ({
  	display: 'flex',
	flexDirection: `${props.flexdir ? props.flexdir : 'row'}`,
	justifyContent: `${props.justifycontent ? props.justifycontent : 'center'}`,
	padding:`${props.padding ? props.padding : '64px 20px'}`,
	background : `${props.custombg ? props.custombg : "#f3a686"}`, 
	backgroundImage: `${props.backgroundimage ? props.backgroundimage : 'linear-gradient(45deg, #f3a686 0%, #ffffff 38%)'}`,
	minHeight: '100vh',
	overflow: 'auto',
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
  	minWidth: '50px',
  	height: '40px',
	textAlign: 'center',
	backgroundImage : `url(${Logo})`,
	backgroundSize: '60%',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat', 
}) );
