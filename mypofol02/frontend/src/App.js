import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate, useRoutes } from 'react-router';
import Index from './component/main';
import Profile from './component/account/profile';
import Educations from './component/account/education';
import Experiences from './component/account/experience';
import Trainings from './component/account/training';

export default function App() {
  /*
  return useRoutes([
    { path:'/', element: <Index /> },
    { path:':accountName', element: <Profile /> },
    { path:':accountName/profile', element: <Profile />},
    { path:':accountName/educations', element: <Educations />},
    { path:':accountName/experiences', element: <Experiences />},
    { path: '*', element: <Error404 />}
  ]);
  */
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<Index />} />
        <Route path={'/welcome'} element={<Index theme='welcome' />} />
        <Route path={'/signin'} element={<Index dialog='signin' />} />
        <Route path={'/signup'} element={<Index dialog='signup' />} />        
        <Route path={':accountName'} element={<Profile />} />
        <Route path={':accountName/profile'} element={<Profile />} />
        <Route path={':accountName/educations'} element={<Educations />} />
        <Route path={':accountName/experiences'} element={<Experiences />} />
        <Route path={':accountName/trainings'} element={<Trainings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}