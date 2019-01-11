import React, {Component} from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {users} from "../common/ApiUtils";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class UsersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
            value: ''
        };
        this.getUsers = this.getUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getUsers() {
        users().then(res => {
            let users = [];
            res.forEach(x => {
                users.push({
                    value: x.id,
                    label: x.username
                })
            });
            this.setState({
                members: users
            });
        });
    }

    handleChange = event => {
        this.setState({value: event.target.value});
        this.props.onSelectionChange(this.state.members.filter(x => x.value === event.target.value)[0]);
    };

    componentWillMount() {
        this.getUsers();
    }

    render() {
        const {members} = this.state;
        const radios = members.map(x =>
            <FormControlLabel key={x.value} value={x.value} control={<Radio/>} label={x.label}/>);
        const {classes} = this.props;

        return (
            <FormControl id="users" component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Users</FormLabel>
                <RadioGroup
                    aria-label='Users'
                    name='Users'
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleChange}>
                    {radios}
                </RadioGroup>
            </FormControl>
        );
    }
}


UsersList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersList);