import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import AppAppBar from "../theme/modules/views/AppAppBar";
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import uuid from "uuid";
import BaristaScreenRow from './BaristaScreenRow';
import {definitions, users} from "../common/ApiUtils";
import BaristaScreenSummary from "./BaristaScreenSummary";


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
    button: {},
    filler: {
        'flex-grow': 2
    },
    paper: {
        //marginTop: theme.spacing.unit * 1,
        paddingRight: theme.spacing.unit * 2,
        background: '#eeeeee'
    },
    fab: {
        marginTop: theme.spacing.unit / 2
    }
});


class BaristaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            definitions: [],
            members: [],
            rows: [
                {
                    id: uuid(),
                    definitionId: "5c4702a3f59c930f1d1a0ee6",
                    memberId: ""
                },
                {
                    id: uuid(),
                    definitionId: "5c4702a3f59c930f1d1a0ee6",
                    memberId: ""
                },
                {
                    id: uuid(),
                    definitionId: "",
                    memberId: ""
                }
            ]
        };
        this.classes = props;

        this.getDefinitions = this.getDefinitions.bind(this);
        this.getUsers = this.getUsers.bind(this);
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
        this.getDefinitions();
    }

    addRow = () => {
        const row = {
            id: uuid(),
            definitionId: "",
            memberId: ""
        };
        this.setState({
            rows: [...this.state.rows, row]
        });
    };

    removeRow = (rowId) => {
        this.setState({
            rows: this.state.rows.filter(row => {
                return row.id !== rowId
            })
        });
    };

    updateRow = (row) => {
        this.setState({
            rows: this.state.rows.map(r => r.id === row.id ? row : r)
        });
    };

    calculateCounts() {
        let counts = {};
        this.state.rows.forEach(r => counts[r.definitionId] = (counts[r.definitionId] | 0) + 1);
        return counts;
    }

    render() {
        let {rows, definitions, members} = this.state;
        let {classes} = this.classes;

        const counts = this.calculateCounts();


        return (
            <div className={classes.root}>
                <AppAppBar/>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                    spacing={8}
                    alignContent={"space-between"}>

                    {rows.map(row => {
                        return (
                            <BaristaScreenRow
                                key={row.id + definitions.length + members.length}
                                row={row}
                                onRemove={this.removeRow}
                                onChange={this.updateRow}
                                definitions={definitions}
                                members={members}
                            />
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
                        {
                            definitions.length>0 &&
                            <Grid item style={{flexGrow:1}} >
                                <BaristaScreenSummary definitions={definitions} counts={counts}/>
                            </Grid>
                        }
                        <Grid item>
                            <Fab color="secondary" aria-label="Add" className={classes.fab} size={"large"}>
                                <AddIcon onClick={this.addRow}/>
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(BaristaScreen);