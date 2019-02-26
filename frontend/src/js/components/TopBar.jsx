import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import styles from '../styles/TopBarStyle';

function TopBar(props) {
  const { classes } = props;
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {'Ponto'}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  classes: PropTypes.shape.isRequired,
};

export default withStyles(styles)(TopBar);
