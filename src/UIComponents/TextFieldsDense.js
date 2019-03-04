
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
        width: 300,
    },
    dense: {
        marginTop: 19,
    }
});

class TextFieldsDense extends React.Component {
    ReadEmail = (event) => {
        this.props.reademail(event.target.value);
    };

    render() {
        const { classes } = this.props;

        return (
            <TextField
                id="standard-dense"
                label="Email address"
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                onChange={(event)=>this.ReadEmail(event)}
            />
        );
    }
}

TextFieldsDense.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldsDense);