import React from 'reactn';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import Home from './pages/Home';
import Success from './pages/Success';
import { CONSTS } from './common/Consts.jsx';

import { Routes, Route } from "react-router-dom";


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
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/success" element={<Success />}/>
          
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
