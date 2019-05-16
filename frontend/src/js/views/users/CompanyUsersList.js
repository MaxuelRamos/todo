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
import { loadUsers } from '../../operators/usersOperator';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  tableCell: {
    paddingRight: 0,
    paddingLeft: 0,
    width: '5%',
  },
  disabled: {
    opacity: 0.5,
    color: 'red',
  },
});

class CompanyUsersList extends Component {
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
                        onClick={() => onEdit(user)}
                        disabled={!user.enabled}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {user.enabled && (
                        <IconButton
                          aria-label="Desabilitar"
                          onClick={() => onDisable(user)}
                          color="secondary"
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
        </Grid>
      </div>
    );
  }
}

CompanyUsersList.propTypes = {
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
)(withStyles(styles)(CompanyUsersList));
