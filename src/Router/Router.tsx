import { createBrowserRouter, defer } from 'react-router-dom';
import Sidebar from '../layout/Sidebar/Sidebar';
import ErrorPage from '../Pages/Error/Error';
import { Cart } from '../Pages/Cart/Cart';
import { Menu } from '../Pages/Menu/Menu';
import ProductPage from '../Pages/Product/ProductPage';
import axios from 'axios';
import AuthLayout from '../layout/AuthLayout/AuthLayout';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';

export const router = createBrowserRouter([
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
        errorElement: <>Продукт не найден</>,
        loader: async ({ params }) => {
          return defer({
            data: await axios
              .get(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
              .then((data) => data)
          });
          // const { data } = await axios.get(
          //   `${import.meta.env.VITE_API_URL}/products/${params.id}`
          // );
          // return data;
        }
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />
      },
      {
        path: '/auth/register',
        element: <RegisterPage />
      }
    ]
  }
]);
