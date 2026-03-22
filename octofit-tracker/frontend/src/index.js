import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Set the backend API base URL from environment or fallback
const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const protocol = window.location.protocol;
const backendUrl = codespaceName
  ? `${protocol}//${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
window.REACT_APP_CODESPACE_URL = backendUrl;
console.log('Backend API base URL:', backendUrl);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
