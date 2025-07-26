// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { RootProvider } from './context/core/RootProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </React.StrictMode>
);
