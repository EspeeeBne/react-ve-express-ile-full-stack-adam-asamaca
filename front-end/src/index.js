import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SiteStatusProvider } from './contexts/SiteStatusContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SiteStatusProvider>
    <App />
  </SiteStatusProvider>
);
