
import React from 'react';
import PropTypes from 'prop-types';
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
        width: 300,
    },
    dense: {
        marginTop: 19,
    }
});

class TextFieldsPassword extends React.Component {
    ReadPass = (event) => {
        this.props.readinput(event.target.value);
    };

    render() {
        const { classes } = this.props;

        return (
            <TextField 
                label= {this.props.placeholder}
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                onChange={(event)=>this.ReadPass(event)}
            />
        );
    }
}

TextFieldsPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldsPassword);