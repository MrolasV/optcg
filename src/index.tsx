import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router';
import { router } from 'home/routes';
import '@cloudscape-design/global-styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
  document.getElementById('root')
);