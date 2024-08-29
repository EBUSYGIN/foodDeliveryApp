import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Sidebar from './layout/Sidebar/Sidebar';
import { Cart } from './Pages/Cart/Cart';
import { Menu } from './Pages/Menu/Menu';
import ErrorPage from './Pages/Error/Error';
import ProductPage from './Pages/Product/ProductPage';
import axios from 'axios';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Sidebar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: '/product/:id',
        element: <ProductPage />,
        loader: async ({ params }) => {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/products/${params.id}`
          );
          return data;
        }
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
