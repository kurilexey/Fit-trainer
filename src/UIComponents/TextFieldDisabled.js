import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class TextFieldDisabled extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <TextField
            disabled
            id="standard-disabled"
            label="Email address"
            defaultValue={this.props.defaultvalue}
            className={classes.textField}
            margin="normal"
        />
    );
  }
}

TextFieldDisabled.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldDisabled);