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
    width: 300,
    // opacity: 0.1,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class TextFieldsSelectExercisesNative extends React.Component {
  state = {
      name: 'Cat in the Hat',
      age: '',
      multiline: 'Controlled',
      currency: 'EUR',
  };

  ReadField = (event) => {
    console.log(event.target.value);
    this.props.onReadField(event.target.value);
  };

  render() {
    const { classes } = this.props;
    
    return (
        <TextField
            id="filled-select-currency-native"
            select = {true}
            label={this.props.placeholder}
            className={classes.textField}
            value={this.props.value}
            onChange={(event)=>this.ReadField(event)}
            SelectProps={{
                native: true,
                size: "3",
                MenuProps: {
                    className: classes.menu,
                },
            }}
            margin="normal"
            variant="filled"
        >
            <option>
                  {"Entered some exercise, pleace."}
            </option>
            {this.props.data.map((item, index) => (
              <option key={index} 
                      value={item.exercisesName}
              >
                  { item.exercisesName }
              </option>
            ))}
        </TextField>
    );
  }
}

TextFieldsSelectExercisesNative.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldsSelectExercisesNative);