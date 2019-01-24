import {Redirect, Route, Router} from 'react-router-dom'
import React from 'react';
import Login from "../Login/Login";
import {history} from "./History";
import Production from "../Production/Production";
import BaristaScreen from "../baristaScreen/BaristaScreen"
import Home from "../home/Home";

export default () => (
    <Router history={history}>
        <div>
            <Route path={"/"} exact component={Login}/>
            <PrivateRoute path={"/home"} exact component={Home}/>
            <PrivateRoute path={"/production"} exact component={Production}/>
            <PrivateRoute path={"/barista"} exact component={BaristaScreen}/>
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