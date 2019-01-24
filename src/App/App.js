import React, {Component} from 'react';
import {Provider} from 'react-redux';
import withRoot from "../theme/modules/withRoot";
import store from "../common/store";
import Router from "../common/Router";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({ typography: { useNextVariants: true } });

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router/>
                </Provider>
            </ThemeProvider>
        );
    }
}

export default withRoot(App);
