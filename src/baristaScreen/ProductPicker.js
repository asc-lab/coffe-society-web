import React, {Component} from 'react';
import {Avatar, ListItemAvatar, withStyles} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {definitions} from "../common/ApiUtils";
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
        marginRight: theme.spacing.unit*2,
    },
});

class ProductPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            selectedIndex: -1,
            definitions: [],
        };

        this.getDefinitions = this.getDefinitions.bind(this);
    }

    getDefinitions() {

        definitions().then(res => {
            let definitions = [];
            res.forEach(x => {
                definitions.push({
                    value: x.id,
                    label: x.name
                })
            });
            this.setState({
                definitions: definitions
            });
        });
    }

    componentWillMount() {
        this.getDefinitions();
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
        const {anchorEl, definitions} = this.state;

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
                            <Avatar alt="Remy Sharp" src={"/files/" + (definitions[this.state.selectedIndex] ? definitions[this.state.selectedIndex].label : "none")+".svg"} className={classes.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={definitions[this.state.selectedIndex] ? definitions[this.state.selectedIndex].label : ""}
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
                    {definitions.map((option, index) => (
                        <MenuItem
                            key={option.value}
                            selected={index === this.state.selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, index)}
                        >
                            <Avatar alt="Remy Sharp" src={"/files/" + option.label +".svg"} className={classes.avatar} />
                            {option.label}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(ProductPicker);