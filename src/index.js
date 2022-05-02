import { ThemeProvider } from '@mui/material';
import { theme } from './Styles/muiTheme';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Router />
    </ThemeProvider>
, document.getElementById('root'));
