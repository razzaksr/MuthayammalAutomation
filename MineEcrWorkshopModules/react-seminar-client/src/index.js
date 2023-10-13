import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Login } from './Login';
import { Dashboard } from './Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {
      (sessionStorage.getItem('person'))
      ?
      <>
        <Dashboard/>
      </>
      :
      <><Login/></>
    }
  </React.StrictMode>
);
