import React from 'react'
import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import Editor from './containers/EditorPage.jsx';
import Auth from './modules/Auth.jsx';


const routes = {
    component: Base,
    childRoutes: [

        {
            path: '/',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, DashboardPage);
                } else {
                    callback(null, HomePage);
                }
            }
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/signup',
            component: SignUpPage
        },
        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();
                replace('/');
            }
        },
        /*{
            path: '/editor/:fileId',
            component: Editor
        }
        */
    ]
};


export default routes;
