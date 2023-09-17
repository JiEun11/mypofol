import React from 'react';
import {useRoutes} from 'react-router';
import Account from './Account';

export default function App() {
  return useRoutes([
    { path:':accountId', element: <Account /> },
    { path:':accountId/profile', element: <Account />},
    // { path: '*', element: <Error404 />}
]);
}
