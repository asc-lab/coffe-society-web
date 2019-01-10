import React, {Component} from 'react';
import {Provider} from 'react-redux';
import withRoot from "../theme/modules/withRoot";
import store from "../common/store";
import Router from "../common/Router";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}

export default withRoot(App);
