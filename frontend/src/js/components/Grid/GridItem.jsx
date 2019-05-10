import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const style = {
  grid: {
    position: 'relative',
    width: '100%',
    minHeight: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
    flexBasis: 'auto',
  },
};

function GridItem({ ...props }) {
  const {
    classes, children, className, ...rest
  } = props;
  return (
    <Grid item {...rest} className={`${classes.grid} ${className}`}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default withStyles(style)(GridItem);
