import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import ProductPicker from '../baristaScreen/ProductPicker';
import MemberPicker from "./MemberPicker";
import * as PropTypes from "prop-types";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {

    },
    filler: {
        'flex-grow': 2
    },
    paper: {
        paddingRight: theme.spacing.unit * 2,
        background: '#eeeeee'
    },
    fab: {
        marginTop: theme.spacing.unit/2
    }
});


class BaristaScreenRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            row: props.row,
            onRemove: props.onRemove,
            onChange: props.onChange,
            definitions: props.definitions,
            members: props.members
        };

        this.classes = props;
    }

    updateDefinition(definitionId) {
        let oldRow = this.state.row;

        this.setState({
            row: {
                id: oldRow.id,
                definitionId: definitionId,
                memberId: oldRow.memberId
            }
        });
        this.state.onChange({
            id: oldRow.id,
            definitionId: definitionId,
            memberId: oldRow.memberId
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            row: nextProps.row,
            onRemove: nextProps.onRemove,
            onChange: nextProps.onChange,
            definitions: nextProps.definitions,
            members: nextProps.members
        });
    }

    render() {
        let {row, onRemove, definitions, members} = this.state;
        let {classes} = this.classes;
        return (
             <Grid key={row.id} item xs={12}>
                <Paper  className={classes.paper}>
                    <Grid container direction="row" spacing={0} alignContent={"space-around"}>
                        <Grid item xs={4}>
                            <ProductPicker definitions={definitions} onChange={(definitionId) => this.updateDefinition(definitionId)}/>
                        </Grid>
                        <Grid item xs={4}>
                            <MemberPicker members={members}/>
                        </Grid>
                        <Grid item container direction="row" xs={4} wrap={"nowrap"} alignContent={"space-between"}>
                            <Grid item className={classes.filler}>

                            </Grid>
                            <Grid item>
                                <Fab color="secondary" aria-label="Add" className={classes.fab}>
                                    <DeleteIcon  onClick={()=>onRemove(row.id)}/>
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

BaristaScreenRow.propTypes = {
    classes: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    definitions: PropTypes.array.isRequired,
    members: PropTypes.array.isRequired
};

export default withStyles(styles)(BaristaScreenRow);