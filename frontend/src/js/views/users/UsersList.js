import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AccountPlus from '@material-ui/icons/PersonAdd';
import { push } from 'react-router-redux';
import {
  disableUser,
  enableUser,
  editUser,
  loadEmployers,
} from '../../operators/usersOperator';

const styles = theme => ({
  tableCell: {
    paddingRight: 0,
    paddingLeft: 0,
    width: '5%',
  },
  disabled: {
    opacity: 0.5,
    color: 'red',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class UsersList extends Component {
  componentDidMount = () => {
    const { loadEmployers } = this.props;
    loadEmployers();
  };

  onNewUserClick = () => {
    const { push } = this.props;
    push('/users/edit/0');
  };

  onEdit = (user) => {
    const { editUser } = this.props;
    editUser(user.id);
  };

  onDisable = (user) => {
    const { disableUser } = this.props;
    disableUser(user);
  };

  onEnable = (user) => {
    const { enableUser } = this.props;
    enableUser(user);
  };

  render() {
    const { users, classes, loading } = this.props;
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item xs zeroMinWidth>
            <Typography component="h1" variant="h5" className={classes.title}>
              {'Empregadores'}
            </Typography>
          </Grid>
          <Fab
            aria-label="Edit"
            className={classes.fab}
            disabled={loading}
            onClick={this.onNewUserClick}
            size="small"
          >
            <AccountPlus />
          </Fab>
        </Grid>

        <div>
          <Grid item xs={12}>
            {users && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {'Email'}
                    </TableCell>
                    <TableCell className={classes.tableCell} />
                    <TableCell className={classes.tableCell} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow hover tabIndex={-1} key={user.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={!user.enabled ? classes.disabled : null}
                      >
                        {user.email}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <IconButton
                          aria-label="Editar"
                          onClick={() => this.onEdit(user)}
                          disabled={!user.enabled}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.enabled && (
                          <IconButton
                            aria-label="Desabilitar"
                            onClick={() => this.onDisable(user)}
                            color="secondary"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}

                        {!user.enabled && (
                          <IconButton
                            aria-label="Habilitar"
                            onClick={() => this.onEnable(user)}
                          >
                            <UndoIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

UsersList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  disableUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  enableUser: PropTypes.func.isRequired,
  loadEmployers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = store => ({
  loading: store.companies.loading,
  users: store.users.users,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    disableUser,
    enableUser,
    editUser,
    loadEmployers,
    push,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(UsersList));
