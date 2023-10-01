import React from 'react';
import { Routes, Route } from 'react-router';
import { AuthContextRouter, AuthRoutes } from './auth';
import { LayoutAccount, LayoutMain } from './component/layout';
import { Main, Welcome, Error, DialogSignin, DialogSignup } from './component/main';
import { AccountProfile, AccountExperiences, AccountTrainings, AccountEducations, AccountProjects, AccountSkills } from './component/account'

export default function App() {
  return (
    <AuthContextRouter>
      <AuthRoutes>
        <Route path={'/'} element={<LayoutMain />} >
          <Route index element={<Main />} />
          <Route path={'welcome'} element={<Welcome />} />
          <Route path={'signin'} element={<DialogSignin />} />
          <Route path={'signup'} element={<DialogSignup />} />
        </Route>
      </AuthRoutes>

      <AuthRoutes authenticated>
        <Route path={'/:accountName'} element={<LayoutAccount />} >
          <Route index element={<AccountProfile />} />
          <Route path={'profile'} element={<AccountProfile />} />
          <Route path={'experiences'} element={<AccountExperiences />} />
          <Route path={'educations'} element={<AccountEducations />} />
          <Route path={'trainings'} element={<AccountTrainings />} />
          <Route path={'skills'} element={<AccountSkills />} />
          <Route path={'projects'} element={<AccountProjects />} />
        </Route>
      </AuthRoutes>

      <Routes>
        <Route path={'/'} element={<LayoutMain />} >
          <Route path={'error'} element={<Error />} />
        </Route>
      </Routes>

    </AuthContextRouter>
  );
}