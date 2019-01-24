import React, {Component} from 'react';
import {Avatar, ListItemAvatar, Typography, withStyles} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {users} from "../common/ApiUtils";
import Icon from '@material-ui/core/Icon'

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
    avatar: {
        marginRight: theme.spacing.unit,
    }
});

class MemberPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            selectedIndex: -1,
            members: [],
        };

        this.getUsers = this.getUsers.bind(this);
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

    componentWillMount() {
        this.getUsers();
    }

    handleClickListItem = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuItemClick = (event, index) => {
        this.setState({selectedIndex: index, anchorEl: null});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes} = this.props;
        const {anchorEl, members} = this.state;

        return (
            <div>
                <List component="nav">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="When device is locked"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemAvatar>
                            <Avatar alt="Member" src={"/files/member.svg"} className={classes.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={members[this.state.selectedIndex] ? members[this.state.selectedIndex].label : ""}
                        />
                        <Icon className={classes.icon} color="primary">
                            arrow_drop_down
                        </Icon>
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {members.map((option, index) => (
                        <MenuItem
                            key={option.value}
                            selected={index === this.state.selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, index)}
                        >
                            <Avatar alt="Member" src={"/files/member.svg"} className={classes.avatar} />
                            <Typography>{option.label} </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(MemberPicker);