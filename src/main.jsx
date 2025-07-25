import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx';
import War from './pages/War.jsx';
import Error from './pages/Error.jsx';
import Homepage from './pages/Homepage.jsx';
import Blackjack from './pages/Blackjack.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: '/war',
        element: <War />,
      },
      {
        path: '/blackjack',
        element: <Blackjack/>,
      },
      {
        path: 'error',
        element:<Error/>
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);