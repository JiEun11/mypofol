import React, { createContext, useState, useContext } from 'react';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

/**
 *  <AuthContextRouter />
 */
export const AuthContextRouter = ({ children }) => {
    const routesPublic = [];
    const routesAuthNotRequired = {
        path: '/',
        element: <AuthNotRequired />,
        children: []
    };
    const routesAuthRequired = {
        path: '/',
        element: <AuthRequired />,
        children: []
    };

    (children instanceof Array ? children : [children.props.children]).forEach(routes => {
        const routesSrc = routes.props.children instanceof Array ? routes.props.children : [routes.props.children];
        const routesDest = routes.type !== AuthRoutes ? routesPublic : routes.props.authenticated ? routesAuthRequired.children : routesAuthNotRequired.children;

        routesSrc.forEach(route => {
            routesDest.push(route.props);
        });
    });

    const browserRouter = createBrowserRouter([...routesPublic, routesAuthNotRequired, routesAuthRequired]);
    return (
        <AuthContextProvider>
            <RouterProvider router={browserRouter} />
        </AuthContextProvider>
    );
};

/**
 *  <AuthRoutes />
 */
export const AuthRoutes = ({ children }) => {
    return (
        children
    );
}

/**
 *  Auth Context Hook
 */
export const useAuthContext = () => {
    return useContext(AuthContext);
}


//
//  내부 구현 컴포넌트들(Module Internal Comeponents) 
//
const AuthContext = createContext('');

const AuthContextProvider = ({ children }) => {
    // 새 access token 발급받음: 반드시 동기 통신!
    syncFetchToken();

    // 발급받은 새 access token을 Context State 으로 저장
    const tokenState = useState(ACCESSTOKEN);

    return (
        <AuthContext.Provider value={{
            token: tokenState[0],
            storeToken: tokenState[1]
        }}>
            {children}
        </AuthContext.Provider>
    );
}

const AuthRequired = () => {
    const { token } = useAuthContext();
    return !token ? <Navigate to='/signin' /> : <Outlet />;
}

const AuthNotRequired = () => {
    const { token } = useAuthContext();

    if (!token) {
        return <Outlet />;
    }

    const decoded = jwt_decode(token);
    return <Navigate to={`/${decoded.name}`} />;
}

var ACCESSTOKEN;

const syncFetchToken = () => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        if (xhr.status !== 200) {
            console.error(`${xhr.responseURL} ${xhr.status} (${xhr.statusText})`);
            return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json.data) {
            // cookie에 refresh token이 없거나(after logout 또는 first start), 또는 기간이 만료, 또는 유효 않은 refresh token를 cookie로 보냈음.
            console.log('Access token could not be issued with refresh token: EMPTY(logout or first start), EXPIRED or INVALID refresh token');
            return;
        }

        // 정상적으로 발급받은 access token을 메모리(전역변수)에 저장.
        ACCESSTOKEN = json.data.accessToken;
    });

    xhr.open('get', '/api/refresh-token', false);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
};

