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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>
    
  },
  {
    path: "/bonds/prices",
    element: <BondbyIsin/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
