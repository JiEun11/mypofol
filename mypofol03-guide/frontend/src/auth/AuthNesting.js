import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './AuthContextProvider';
import jwt_decode from 'jwt-decode';

export const AuthRequired = () => {
    const { token } = useAuthContext();
    return !token ? <Navigate to='/signin' /> : <Outlet />;
}

export const AuthNotRequired = () => {
    const { token } = useAuthContext();

    if (!token) {
        return <Outlet />;
    }

    const decoded = jwt_decode(token);
    return <Navigate to={`/${decoded.name}`} />;
}