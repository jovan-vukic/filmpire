import React from 'react';
import ReactDOM from 'react-dom/client'; //connects the app with public/index.html

import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './components/App';

//with ReactDOM we connect our app to the root div inside public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({}); //for now we'll pass an empty object

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
);
