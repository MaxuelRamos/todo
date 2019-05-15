import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = {
  alert: {
    minWidth: 150,
    padding: 15,
    marginBottom: 10,
    marginTop: 10,
    border: '1px solid transparent',
    borderRadius: 3,
  },
  danger: {
    backgroundColor: '#e27c79',
    borderColor: '#dd6864',
    color: '#9f2723',
  },
  warning: {
    backgroundColor: '#ebc063',
    borderColor: '#e8b64c',
    color: '#a07415',
  },
  success: {
    backgroundColor: '#91cf91',
    borderColor: '#80c780',
    color: '#3d8b3d',
  },
};

const Alert = (props) => {
  const { text, type, classes } = props;
  return (
    <div>
      {!!text && (
        <div className={`${classes.alert} ${classes[type]}`} role="alert">
          {text}
        </div>
      )}
    </div>
  );
};

Alert.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Alert);
