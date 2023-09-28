import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './AuthContextProvider';
import { AuthNotRequired, AuthRequired } from './AuthNesting';

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