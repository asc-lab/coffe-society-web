import React, {Component} from 'react';
import UsersList from "../components/UsersList";
import {withStyles} from "@material-ui/core";
import ProductDefinition from "../components/ProductDefinition";
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/Grid";
import ProductionTable from "../components/ProductionTable";
import {register} from "../common/ApiUtils";
import uuid from "uuid";
import AppAppBar from "../theme/modules/views/AppAppBar";


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


class Production extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProductDefinition: null,
            selectedUser: null,
            rows: []
        }
    }

    onSelectedProductChanged = (selectedProductValue) => {
        this.setState({selectedProductDefinition: selectedProductValue})
    };
    onSelectedUserChanged = (selectedUserValue) => {
        this.setState({selectedUser: selectedUserValue})
    };

    onClick = () => {

        const row = {
            id: uuid(),
            memberName: this.state.selectedUser.label,
            productName: this.state.selectedProductDefinition.label
        };
        const registerData = {
            id: uuid(),
            productDefId: this.state.selectedProductDefinition.value,
            productReceiverId: this.state.selectedUser.value,
            productName: this.state.selectedProductDefinition.label,
            productExecutorId: ""
        };
        register(registerData).catch(error => console.log('ERROR'));
        this.setState({
            rows: [...this.state.rows, row]
        });

    };

    render() {
        let {rows} = this.state;
        return (
            <div>
                <AppAppBar/>
                <Grid container>
                    <Grid item xs={4}>
                        <ProductDefinition onSelectionChange={(value) => this.onSelectedProductChanged(value)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <UsersList onSelectionChange={(value) => this.onSelectedUserChanged(value)}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={this.onClick}>OK</Button>
                    </Grid>
                    <ProductionTable rows={rows}/>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Production);