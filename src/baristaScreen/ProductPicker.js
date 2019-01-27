import React, {Component} from 'react';
import {Avatar, ListItemAvatar, withStyles} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Icon from '@material-ui/core/Icon'
import * as PropTypes from "prop-types";

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
        height: '60px',
        width: '60px'
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    listItem: {
        paddingTop: theme.spacing.unit/2,
        paddingBottom: theme.spacing.unit/2
    },
    menuItem: {
        height: '60px'
    }
});

class ProductPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            selectedIndex: -1,
            definitions: props.definitions,
            onChange: props.onChange
        };


    }

    handleClickListItem = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuItemClick = (event, index) => {
        this.setState({selectedIndex: index, anchorEl: null});
        this.state.onChange(this.state.definitions[index].value)
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    // componentWillReceiveProps(nextProps, nextContext) {
    //     this.setState({
    //         anchorEl: this.state.anchorEl,
    //         selectedIndex: this.state.selectedIndex,
    //         definitions: nextProps.definitions,
    //         onChange: nextProps.onChange
    //     });
    // }

    render() {
        const {classes} = this.props;
        const {anchorEl, definitions} = this.state;

        const label = definitions[this.state.selectedIndex] ? definitions[this.state.selectedIndex].label : "none";

        return (
            <div>
                <List component="nav" className={classes.list}>
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="When device is locked"
                        onClick={this.handleClickListItem}
                        className={classes.listItem}
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt={label}
                                src={"/files/" + label +".svg"}
                                className={classes.avatar}
                            />
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
                            className={classes.menuItem}
                        >
                            <Avatar alt={option.label} src={"/files/" + option.label +".svg"} className={classes.avatar} />
                            {option.label}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

ProductPicker.propTypes = {
    classes: PropTypes.object.isRequired,
    definitions: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(ProductPicker);