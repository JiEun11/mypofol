import React from 'react';
import { Routes, Route } from 'react-router';
import { AuthContextRouter, AuthRoutes } from './auth';
import { Main } from './component/main';
import { Account } from './component/account';

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
        <Route path={'/:accountName'} element={<Account content={'profile'} />} />
        <Route path={'/:accountName/profile'} element={<Account content={'profile'} />} />
        <Route path={'/:accountName/experiences'} element={<Account content={'experiences'} />} />
        <Route path={'/:accountName/educations'} element={<Account content={'educations'} />} />
        <Route path={'/:accountName/trainings'} element={<Account content={'trainings'} />} />
        <Route path={'/:accountName/skills'} element={<Account content={'skills'} />} />
        <Route path={'/:accountName/projects'} element={<Account content={'projects'} />} />
      </AuthRoutes>
      <Routes>
        { /* Main 컴포넌트에 Error Theme 추가하고 /error 라우팅 */ }
        <Route path={'/error'} element={<Main theme='error' />} />
      </Routes>
    </AuthContextRouter>
  );
}