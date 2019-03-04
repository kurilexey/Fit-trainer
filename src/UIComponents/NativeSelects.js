import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 250,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class NativeSelects extends React.Component {

  ReadField = (event) => {
    this.props.onreadfield(event);
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl} >
          <InputLabel htmlFor="name-native-error">
              {this.props.placeholder}
          </InputLabel>
          <NativeSelect
              value={this.props.value}
              onChange={(event) => this.ReadField(event)}
              input={<Input id="name-native-error" />}
          >
            <option value={this.props.value}>
                {this.props.value}
            </option>
            {this.props.data.map((item, index) => (
                <option key={index} value={item.exercisesName}>
                    { item.exercisesName }
                </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

NativeSelects.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);