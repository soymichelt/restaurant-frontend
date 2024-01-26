import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Home } from './../pages/home';
import { Signin } from './../pages/signin';
import { Signup } from './../pages/signup';
import { Profile } from '../pages/profile';
import { Page404 } from '../pages/page404';
import { Catalogue } from '../pages/catalogue';
import { Ingredients } from '../pages/ingredients';
import { Orders } from '../pages/orders';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/catalogue',
    element: <Catalogue />,
  },
  {
    path: '/ingredients',
    element: <Ingredients />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

export const RouterComponent = () => {
  return (
    <RouterProvider router={router} />
  );
};
