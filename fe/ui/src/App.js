import React from 'reactn';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import Home from './pages/Home';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Itim',
      'cursive',
    ].join(','),
  },});


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
