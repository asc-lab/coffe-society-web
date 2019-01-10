import React, {Component} from 'react';
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Radio from "@material-ui/core/Radio";
import {definitions} from "../common/ApiUtils";

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


class ProductDefinition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            definitions: [],
            value: ''
        };
        this.getDefinitions = this.getDefinitions.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange = event => {
        this.setState({value: event.target.value});
        this.props.onSelectionChange(this.state.definitions.filter(x => x.value === event.target.value)[0]);
    };

    componentWillMount() {
        this.getDefinitions();
    }

    render() {
        const {definitions} = this.state;
        const radios = definitions.map(x =>
            <FormControlLabel key={x.value} value={x.value} control={<Radio/>} label={x.label}/>);
        const {classes} = this.props;
        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Definitions</FormLabel>
                <RadioGroup
                    aria-label='Definitions'
                    name='Definitions'
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleChange}>
                    {radios}
                </RadioGroup>
            </FormControl>
        );
    }
}

ProductDefinition.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductDefinition);