import {Redirect, Route, Router} from 'react-router-dom'
import React from 'react';
import Login from "../Login/Login";
import {history} from "./History";
import Production from "../Production/Production";

export default () => (
    <Router history={history}>
        <div>
            <Route path={"/"} exact component={Login}/>
            <PrivateRoute path={"/production"} exact component={Production}/>
        </div>
    </Router>
);

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        localStorage.getItem('access_token')
            ? <Component {...props} />
            : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
    )}/>
);