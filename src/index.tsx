import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './layouts/App/App';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'src/theme';

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
	//TODO 환경변수 ?
  process.env.NODE_ENV === 'production' ? 'https://gilee.click' : 'http://127.0.0.1:3000/';
  //process.env.NODE_ENV === 'production' ? 'https://server.gilee.click/' : 'http://127.0.0.1:3000/';

render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.querySelector('#app'),
);
