import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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

class RadioButtonsGroup extends React.Component {
    state = {
        value: ''
    };

    handleChange = event => {
        this.setState({value: event.target.value});
    };

    renderList() {
        let {renderList} = this.props;
        return renderList.map(x =>
            <FormControlLabel key={x.value} value={x.value} control={<Radio/>} label={x.label}/>
        );
    }

    render() {
        const {classes} = this.props;
        const {selectName} = this.props;
        let renderList1 = this.renderList();
        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">{selectName}</FormLabel>
                    <RadioGroup
                        aria-label={selectName}
                        name={selectName}
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {renderList1}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);