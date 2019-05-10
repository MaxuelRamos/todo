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
import Button from '@material-ui/core/Button';
import { push } from 'react-router-redux';
import {
  disableUser,
  enableUser,
  editUser,
  loadEmployers,
} from '../../operators/usersOperator';

const styles = theme => ({
  table: {
    width: '100%',
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

  onEditUser = (user) => {
    const { editUser } = this.props;
    editUser(user.id);
  };

  onDisableUser = (user) => {
    const { disableUser } = this.props;
    disableUser(user);
  };

  onEnableUser = (user) => {
    const { enableUser } = this.props;
    enableUser(user);
  };

  render() {
    const { users, classes, loading } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          disabled={loading}
          onClick={this.onNewUserClick}
        >
          {'Criar Usuário'}
        </Button>

        {users && (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Habilitado</TableCell>

                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow hover tabIndex={-1} key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell>{user.enabled ? 'Sim' : 'Não'}</TableCell>

                  <TableCell>
                    <IconButton
                      aria-label="Editar"
                      onClick={() => this.onEditUser(user)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {user.enabled && (
                      <IconButton
                        aria-label="Desabilitar"
                        onClick={() => this.onDisableUser(user)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}

                    {!user.enabled && (
                      <IconButton
                        aria-label="Habilitar"
                        onClick={() => this.onEnableUser(user)}
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
