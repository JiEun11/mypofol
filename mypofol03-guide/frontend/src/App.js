import React from 'react';
import { Routes, Route } from 'react-router';
import { AuthContextRouter, AuthRoutes } from './auth';
import { Main } from './component/main';
import { AccountProfile, AccountExperiences, AccountTrainings, AccountEducations, AccountSkills, AccountProjects } from './component/account';

export default function App() {
  return (
    <AuthContextRouter>
      <AuthRoutes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/welcome'} element={<Main theme='welcome' />} />
        <Route path={'/signin'} element={<Main dialog='signin' />} />
        <Route path={'/signup'} element={<Main dialog='signup' />} />
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
        { /* Index 컴포넌트에 Error Theme 추가하고 /error 라우팅 */ }
        <Route path={'/error'} element={<Main theme='error' />} />
      </Routes>
    </AuthContextRouter>
  );
}