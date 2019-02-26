import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/TopBarStyle';

function MenuBar(props) {
  const { classes } = props;

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button key={0}>
          <ListItemText primary="Empregadores" />
        </ListItem>
      </List>
    </Drawer>
  );
}

MenuBar.propTypes = {
  classes: PropTypes.shape.isRequired,
};

export default withStyles(styles)(MenuBar);
