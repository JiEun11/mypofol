import React from 'react';
import { Routes, Route } from 'react-router';
import { AuthContextRouter, AuthRoutes } from './auth';

import Index from './component/main';
import AccountProfile from './component/account/profile';
import AccountExperiences from './component/account/experiences';

import AccountEducations from './component/account/education';
import AccountTrainings from './component/account/training';
import AccountSkills from './component/account/skill';
import AccountProjects from './component/account/project';

export default function App() {
  return (
    <AuthContextRouter>
      <AuthRoutes>
        <Route path={'/'} element={<Index />} />
        <Route path={'/welcome'} element={<Index theme='welcome' />} />
        <Route path={'/signin'} element={<Index dialog='signin' />} />
        <Route path={'/signup'} element={<Index dialog='signup' />} />
      </AuthRoutes>
      <AuthRoutes authenticated>
        <Route path={'/:accountName'} element={<AccountProfile />} />
        <Route path={'/:accountName/profile'} element={<AccountProfile />} />
        <Route path={'/:accountName/educations'} element={<AccountEducations />} />
        <Route path={'/:accountName/experiences'} element={<AccountExperiences />} />
        <Route path={'/:accountName/trainings'} element={<AccountTrainings />} />
        <Route path={'/:accountName/skills'} element={<AccountSkills />} />
        <Route path={'/:accountName/projects'} element={<AccountProjects />} />
      </AuthRoutes>
      <Routes>
        <Route path={'/error'} element={<Index theme='error' />} />
      </Routes>
    </AuthContextRouter>
  );
}