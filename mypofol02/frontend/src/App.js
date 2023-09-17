import React from 'react';
import {useRoutes} from 'react-router';
import Profile from './component/account/Profile';
import EducationList from './component/account/education';
import Test from './component/Test';

export default function App() {
  return useRoutes([
    { path:':accountName', element: <Test /> },
    { path:':accountName/profile', element: <Profile />},
    { path:':accountName/educations', element: <EducationList />},
    // { path: '*', element: <Error404 />}
]);
}
