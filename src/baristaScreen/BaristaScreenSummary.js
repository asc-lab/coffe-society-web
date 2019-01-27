import React, {Component} from 'react';
import {Avatar, Typography, withStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
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
        marginRight: theme.spacing.unit * 2,
        height: '50px',
        width: '50px'
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    listItem: {
        paddingTop: theme.spacing.unit / 2,
        paddingBottom: theme.spacing.unit / 2
    },
    menuItem: {
        height: '60px'
    },
    summeryItem: {
        marginRight: theme.spacing.unit * 2
    }
});

class BaristaScreenSummary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            definitions: props.definitions,
            counts: props.counts
        };
    }

    render() {
        const {classes} = this.props;
        const {definitions, counts} = this.state;

        return (
            <Grid direction={"row"} alignItems={"center"} container className={classes.grid}>
                {
                    definitions
                    .filter(definition => counts[definition.value])
                    .map(definition => {
                        return (
                            <Grid item xs={2} key={definition.value} className={classes.summaryItem} container alignItems={"center"}>
                                <Avatar
                                    alt={definition.label}
                                    src={"/files/" + definition.label + ".svg"}
                                    className={classes.avatar}
                                />
                                <Typography variant={"h5"}> { counts[definition.value]?counts[definition.value]:0 } </Typography>
                            </Grid>
                        );
                    })
                }
                {
                    counts[""] &&
                    <Grid item xs={1} key={""} container alignItems={"center"}>
                        <Grid item>
                            <Avatar
                                alt={"Unknown"}
                                src={"/files/none.svg"}
                                className={classes.avatar}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant={"h5"}> { counts[""] } </Typography>
                        </Grid>
                    </Grid>
                }
            </Grid>
        );
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState( {
            definitions: nextProps.definitions,
            counts: nextProps.counts
        });
    }
}

BaristaScreenSummary.propTypes = {
    classes: PropTypes.object.isRequired,
    definitions: PropTypes.array.isRequired,
    counts: PropTypes.object.isRequired
};

export default withStyles(styles)(BaristaScreenSummary);