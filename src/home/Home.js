import React, {Component} from 'react';
import ProductionTable from "../components/ProductionTable";
import {products} from "../common/ApiUtils";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import * as uuid from "uuid";
import PropTypes from "prop-types";
import Button from "@material-ui/core/es/Button/Button";
import {history} from '../common/History'
import AppAppBar from "../theme/modules/views/AppAppBar";

const styles = theme => ({
    root: {
        height: '500px!important',
        overflow: 'auto'
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
        this.getProducts = this.getProducts.bind(this);
    }

    static redirectToProduction() {
        history.push('/production');
    }

    getProducts() {
        products().then(res => {
            let products = [];
            res.forEach(x => {
                products.push({
                    id: uuid(),
                    memberName: x.memberName,
                    productName: x.productName
                })
            });
            this.setState({
                rows: products
            });
        });
    }

    componentWillMount() {
        this.getProducts();
    }

    render() {
        const {classes} = this.props;
        const {rows} = this.state;
        return (
            <>
                <AppAppBar/>
                <Grid container justify={'center'}>
                    <Grid item xs={12} lg={6} className={classes.root}>
                        <ProductionTable rows={rows}/>
                    </Grid>
                    <Grid item xs={12} lg={1}>
                        <Button onClick={Home.redirectToProduction}> Production</Button>
                    </Grid>
                </Grid>
            </>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);