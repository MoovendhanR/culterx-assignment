import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  <GoogleOAuthProvider clientId="2011571916-rncn65ao3eedh1hp833tfk8ev6vend1s.apps.googleusercontent.com">
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </GoogleOAuthProvider>;
  </React.StrictMode>
);


