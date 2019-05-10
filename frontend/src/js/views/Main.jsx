import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/NavigatorStyle';
import { logout, loadAuthenticatedUser } from '../operators/authOperator';
import userIs from '../utils/permissionUtils';

class Navigator extends Component {
  state = {
    mobileOpen: false,
    anchorEl: null,
  };

  componentDidMount() {
    const { loadAuthenticatedUser } = this.props;
    loadAuthenticatedUser();
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleAccountMenuClose = () => {
    const { logout } = this.props;
    this.setState({ anchorEl: null });

    logout();
  };

  goTo(dest) {
    const { push } = this.props;
    const { mobileOpen } = this.state;
    if (mobileOpen) {
      this.handleDrawerToggle();
    }
    push(dest);
  }

  render() {
    const {
      classes, theme, children, authenticatedUser,
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button onClick={() => this.goTo('/me')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Me" />
          </ListItem>

          {userIs('ADMIN') && (
            <Fragment>
              <ListItem button onClick={() => this.goTo('/companies')}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Empresas" />
              </ListItem>
              <ListItem button onClick={() => this.goTo('/users')}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
              </ListItem>
            </Fragment>
          )}
        </List>
      </div>
    );

    return (
      <div>
        {authenticatedUser && (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.grow}
                >
                  {authenticatedUser && authenticatedUser.email}
                </Typography>

                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleAccountMenuClose}>

                      Sair
                    </MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden smUp implementation="css">
                <Drawer
                  container={this.props.container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </nav>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {children}
            </main>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  authenticatedUser: store.auth.authenticatedUser,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    logout,
    loadAuthenticatedUser,
    push,
  },
  dispatch,
);

Navigator.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.shape({}),
  theme: PropTypes.shape({}).isRequired,
  authenticatedUser: PropTypes.shape({}),
  children: PropTypes.node,
  logout: PropTypes.func.isRequired,
  loadAuthenticatedUser: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(Navigator));
