import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import AppAppBar from "../theme/modules/views/AppAppBar";
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import uuid from "uuid";
import Paper from '@material-ui/core/Paper';
import ProductPicker from '../baristaScreen/ProductPicker';
import MemberPicker from "./MemberPicker";

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
        marginTop: theme.spacing.unit * 1,
        paddingRight: theme.spacing.unit * 2,
    }
});


class BaristaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [
                {
                    id: uuid(),
                    productDefinitionId:"",
                    productName:""
                },
                {
                    id: uuid(),
                    productDefinitionId:"",
                    productName:""
                },
                {
                    id: uuid(),
                    productDefinitionId:"",
                    productName:""
                }
            ]
        };
        this.classes = props;
    }

    addRow = () => {
        const row = {
            id: uuid(),
            productDefinitionId:"",
            productName:""
        };
        this.setState({
            rows: [...this.state.rows, row]
        });
    };

    removeRow = (rowId) => {
        this.setState({
            rows: this.state.rows.filter(row => {return row.id!==rowId})
        });
    };

    render() {
        let {rows} = this.state;
        let {classes} = this.classes
        return (
            <div className={classes.root}>
                <AppAppBar/>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                    spacing={16}
                    alignContent={"space-between"}>

                    {rows.map(row => {
                        return (
                            <Grid key={row.id} item xs={12}>
                                <Paper  className={classes.paper}>
                                    <Grid container direction="row" spacing={16} alignContent={"space-around"}>
                                        <Grid item xs={4}>
                                            <ProductPicker productName="Bleasdasd"/>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <MemberPicker />
                                        </Grid>
                                        <Grid item container direction="row" xs={4} wrap={"nowrap"} alignContent={"space-between"}>
                                            <Grid item className={classes.filler}>

                                            </Grid>
                                            <Grid item>
                                                <Fab color="secondary" aria-label="Add" className={classes.fab}>
                                                    <DeleteIcon  onClick={()=>this.removeRow(row.id)}/>
                                                </Fab>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                            </Paper>
                            </Grid>
                        );
                    })}
                    <Grid
                        item
                        container
                        direction="row"
                        alignContent={"space-around"}
                        spacing={8}
                        className={classes.buttons}
                    >
                        <Grid item>
                            <Fab color="secondary" aria-label="Add" className={classes.fab} size={"large"}>
                                <AddIcon  onClick={this.addRow}/>
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(BaristaScreen);