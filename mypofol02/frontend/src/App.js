import React from 'react';
import {useRoutes} from 'react-router';

import Profile from './component/account/profile';
import Educations from './component/account/education';
import Experiences from './component/account/experience';

export default function App() {
  return useRoutes([
    { path:':accountName', element: <Profile /> },
    { path:':accountName/profile', element: <Profile />},
    { path:':accountName/educations', element: <Educations />},
    { path:':accountName/experiences', element: <Experiences />},
    // { path: '*', element: <Error404 />}
  ]);
}
