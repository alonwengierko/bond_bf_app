// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import App from './App.tsx'

import './index.css'
import './project.css'
import Root from './routes/root';
import ErrorPage from './error-page';
import BondbyIsin from './BondbyIsin';
import BondbyIssuer from './BondbyIssuer';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>
    
  },
  // {
  //   path: "/bonds/prices",
  //   element: <BondbyIsin/>
  // },
  {
    path: "/bonds/prices/:isin",
    element: <BondbyIsin/>
  },
  {
    path: "/bonds/issuers",
    element: <BondbyIssuer/>
  }
])

// const theme = createTheme({
//   fontFamily: 'Montserrat, sans-serif',
//   defaultRadius: 'md',
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
);
