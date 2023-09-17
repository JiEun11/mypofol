import React from 'react';
import {useRoutes} from 'react-router';
import Profile from './component/account/Profile';
import EducationList from './component/account/education';
import Test from './component/Test';
import Experiences from './component/account/experience/Experiences';

export default function App() {
  return useRoutes([
    { path:':accountName', element: <Test /> },
    { path:':accountName/profile', element: <Profile path={`profile`} />},
    { path:':accountName/educations', element: <EducationList path={`educations`}/>},
    { path:':accountName/experiences', element: <Experiences path={`experiences`} />},
    // { path: '*', element: <Error404 />}
]);
}
