import React from 'react';
import ReactDOM from 'react-dom/client'; //connects the app with public/index.html
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

//with ReactDOM we connect our app to the root div inside public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
