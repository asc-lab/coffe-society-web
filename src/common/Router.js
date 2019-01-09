import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react';

import Login from "../components/Login";

export default () => (
    <BrowserRouter>
        <div>
            <Route path={"/"} exact component={Login}/>
        </div>

    </BrowserRouter>
);