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
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: 'meters',
    label: 'm',
  },
  {
    value: 'minutes',
    label: 'min',
  },
  {
    value: 'kilogramms',
    label: 'kg',
  }
];

class TextFieldsSelectNative extends React.Component {

  ReadField = (event) => {
    this.props.onreadfield(event.target.value);
  };


  render() {
    const { classes } = this.props;

    return (
        <TextField
            id="filled-select-currency-native"
            select
            label={this.props.placeholder}
            className={classes.textField}
            //defaultValue={this.props.value}
            value={this.props.value}
            onChange={(event)=>this.ReadField(event)}
            SelectProps={{
                native: true,
                MenuProps: {
                    className: classes.menu,
                },
            }}
            margin="normal"
            variant="filled"
        >
            {currencies.map(option => (
              <option key={option.value} value={option.value}>
                  { option.value }
              </option>
            ))}
        </TextField>
    );
  }
}

TextFieldsSelectNative.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldsSelectNative);