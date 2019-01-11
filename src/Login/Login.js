import React, {Component} from "react";
import PropTypes from 'prop-types';
import AppAppBar from '../theme/modules/views/AppAppBar';
import Typography from "../theme/modules/components/Typography";
import AppForm from "../theme/modules/views/AppForm";
import compose from "recompose/compose";
import withRoot from "../theme/modules/withRoot";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {login} from "../actions/LoginAction";
import FormButton from "../theme/modules/form/FormButton";
import TextField from "../theme/modules/components/TextField";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    form: {
        marginTop: theme.spacing.unit * 6,
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 2,
    },
    feedback: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangePassword(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onChangeName(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const s = {
            username: this.state.name,
            password: this.state.password
        };
        this.props.login(s);
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <AppAppBar/>
                <AppForm>
                    <React.Fragment>
                        <Typography variant="h3" gutterBottom marked="center" align="center">
                            Sign In
                        </Typography>
                    </React.Fragment>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <Grid justify={'center'} container>
                            <Grid item lg={12} xs={12}>
                                <TextField type="text" fullWidth name="name" placeholder="Username"
                                           onChange={this.onChangeName}
                                           value={this.state.name} required/>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextField type="password" fullWidth name="password" placeholder="Password"
                                           onChange={this.onChangePassword}
                                           value={this.state.password} required/>
                            </Grid>
                            <Grid item lg={12} xs={12} style={{justifyContent: 'center!important'}}>
                                <FormButton type="submit">Log in</FormButton>
                            </Grid>
                        </Grid>
                    </form>
                </AppForm>
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default compose(
    withRoot,
    withStyles(styles),
    connect(null, {login})
)(Login);
