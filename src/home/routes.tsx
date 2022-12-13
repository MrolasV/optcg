import * as React from 'react';
import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route
} from 'react-router-dom';
import App from 'App';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path="*">
      <Route path="home" element={<App nextPage='page2' buttonText='Home'/>} />
      <Route path="page2" element={<App nextPage='home' buttonText='Page2'/>} />
      {/* <Route path="*" element={<Navigate to="home" replace />} /> */}
    </Route>
  ), 
);