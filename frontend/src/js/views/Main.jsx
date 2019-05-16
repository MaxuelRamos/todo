import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';
import People from '@material-ui/icons/People';
import MenuIcon from '@material-ui/icons/Menu';
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
import { editUser } from '../operators/usersOperator';
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

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    const { logout } = this.props;
    this.setState({ anchorEl: null });

    logout();
  };

  handleEditProfile = () => {
    const { editUser, authenticatedUser } = this.props;
    this.setState({ anchorEl: null });
    editUser(authenticatedUser.id);
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
          {userIs('ADMIN') && (
            <Fragment>
              <ListItem button onClick={() => this.goTo('/companies')}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Empresas" />
              </ListItem>
              <ListItem button onClick={() => this.goTo('/users')}>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
              </ListItem>
            </Fragment>
          )}

          {userIs('EMPLOYER') && (
            <ListItem
              button
              onClick={() => this.goTo(`/companies/${authenticatedUser.companyId}`)
              }
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Empresa" />
            </ListItem>
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
                <div className={classes.title} />
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
                  onClose={this.handleMenuClose}
                >
                  <MenuItem onClick={this.handleEditProfile}>
                    {'Editar Perfil'}
                  </MenuItem>
                  <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
                </Menu>
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
    editUser,
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
  editUser: PropTypes.func.isRequired,
  loadAuthenticatedUser: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(Navigator));
