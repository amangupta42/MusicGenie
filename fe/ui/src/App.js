import React from 'reactn';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import Home from './pages/Home';
import { CONSTS } from './common/Consts.jsx';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Itim',
      'cursive',
    ].join(','),
  },
  palette: {
    secondary: {
      main: `${CONSTS.secondaryColor}`
    }
  }
  });


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        < Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
