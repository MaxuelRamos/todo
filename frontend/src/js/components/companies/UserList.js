import React from 'react';
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
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  table: {
    width: '100%',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function UserList(props) {
  const {
    users, classes, onEdit, onDelete,
  } = props;
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
                  <IconButton aria-label="Editar" onClick={() => onEdit(user)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Excluir"
                    onClick={() => onDelete(user)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

UserList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(UserList));
