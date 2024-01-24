import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Home } from './../pages/home';
import { Signin } from './../pages/signin';
import { Signup } from './../pages/signup';
import { Profile } from '../pages/profile';
import { Page404 } from '../pages/page404';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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
