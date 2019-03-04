import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: "column",
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 80,
    },
    dense: {
        marginTop: 19,
    }
});

class TextFieldsStandartNumber extends React.Component {
    ReadField = (event) => {
        this.props.onreadfield(event.target.value);
    };

    render() {
        const { classes } = this.props;

        return (
            <TextField
                id="standard-name"
                type="number"
                label={this.props.placeholder}
                className={classNames(classes.textField)}
                margin="dense"
                onChange={(event)=>this.ReadField(event)}
                value = {+this.props.value <= 1 ? "1" : this.props.value}
            />
        );
    }
}

TextFieldsStandartNumber.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldsStandartNumber);