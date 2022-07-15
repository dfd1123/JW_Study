import React from 'react';
import NotFound from '@/views/pages/NotFound';
import ErrorPage from '@/views/pages/ErrorPage';
import { Route } from '@/router';

// ex
/*
const commonRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
      {path: '*', element: <Navigate to='/404' />},
      {path: '/', element: <MainView />},
      {path: '404', element: <PageNotFoundView />},
      {path: 'account', element: <Navigate to='/account/list' />},
    ],
  };
 */

const common: Route[] = [
  {
    path: '/',
    redirect: '/list',
  },
  {
    path: '/404',
    element: <NotFound />,
    meta: {
      headerHide: true,
      footerHide: true,
    },
  },
  {
    path: '/500',
    element: <ErrorPage />,
    meta: {
      headerHide: true,
      footerHide: true,
    },
  },
];

export default common;
