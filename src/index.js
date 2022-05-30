import React from 'react';
import ReactDOM from 'react-dom/client';
import Reset from './styles/Reset';
import Common from './styles/Common';
import GlobalFont from './styles/font/font.js';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Reset />
    <Common />
    <GlobalFont />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
