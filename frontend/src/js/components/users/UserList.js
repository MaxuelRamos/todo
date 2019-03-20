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
import { loadUsers } from '../../operators/usersOperator';

const styles = theme => ({
  table: {
    width: '100%',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class UserList extends Component {
  componentDidMount = () => {
    const { loadUsers, company } = this.props;
    loadUsers(company);
  };

  render() {
    const {
      users, classes, onEdit, onDisable, onEnable,
    } = this.props;
    return (
      <div>
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
                      onClick={() => onEdit(user)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {user.enabled && (
                      <IconButton
                        aria-label="Desabilitar"
                        onClick={() => onDisable(user)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}

                    {!user.enabled && (
                      <IconButton
                        aria-label="Habilitar"
                        onClick={() => onEnable(user)}
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

UserList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  company: PropTypes.shape({}).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDisable: PropTypes.func.isRequired,
  onEnable: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  users: store.users.users,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadUsers,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(UserList));
