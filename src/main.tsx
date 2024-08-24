import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './layout/Sidebar/Layout';
import { Cart } from './Pages/Cart/Cart';
import { Menu } from './Pages/Menu/Menu';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/menu',
        element: <Menu />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
