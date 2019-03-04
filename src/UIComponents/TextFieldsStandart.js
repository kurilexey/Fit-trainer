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
        width: 200,
    },
    dense: {
        marginTop: 19,
    }
});

class TextFieldsStandart extends React.Component {
    ReadField = (event) => {
        this.props.onreadfield(event.target.value);
    };

    render() {
        const { classes } = this.props;

        return (
            <TextField
                id="standard-name"
                label={this.props.placeholder}
                className={classNames(classes.textField)}
                margin="dense"
                onChange={(event)=>this.ReadField(event)}
                value = {this.props.value}
                //defaultValue={this.props.value}
            />
        );
    }
}

TextFieldsStandart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldsStandart);