
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../pages/home/page'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Servers = lazy(() => import('../pages/servers/page'));
const ServerDetail = lazy(() => import('../pages/server-detail/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/servers',
    element: <Servers />,
  },
  {
    path: '/servers/:id',
    element: <ServerDetail />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
