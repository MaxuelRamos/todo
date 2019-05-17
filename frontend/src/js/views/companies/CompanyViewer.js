import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { push } from 'react-router-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountPlus from '@material-ui/icons/PersonAdd';
import Alert from '../../components/Alert';
import {
  loadCompany,
  editCompany,
  disableCompany,
} from '../../operators/companiesOperator';
import {
  disableUser,
  enableUser,
  editUser,
} from '../../operators/usersOperator';
import CompanyUsersList from '../users/CompanyUsersList';
import userIs from '../../utils/permissionUtils';

const styles = theme => ({
  title: {
    flexGrow: 1,
  },
  fab: {
    margin: theme.spacing.unit / 2,
  },
});

class CompaniesViewer extends Component {
  componentDidMount() {
    const { loadCompany, params } = this.props;
    loadCompany(params.id);
  }

  onEditCompanyClick = () => {
    const { editCompany, selected } = this.props;
    editCompany(selected.id);
  };

  onDisableCompanyClick = () => {
    const { disableCompany, selected } = this.props;
    disableCompany(selected.id);
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

  onNewUserClick = () => {
    const { push } = this.props;
    push('/users/edit/0');
  };

  render() {
    const {
      selected,
      loading,
      errorMessage,
      usersErrorMessage,
      classes,
    } = this.props;
    return (
      <div>
        <Alert text={errorMessage} type="danger" />
        <Alert text={usersErrorMessage} type="danger" />
        {loading && <CircularProgress />}
        {selected && (
          <div>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              wrap="nowrap"
            >
              <Grid item xs zeroMinWidth>
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.title}
                >
                  {selected.name}
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
              {userIs('ADMIN') && (
                <Fragment>
                  <Fab
                    aria-label="Edit"
                    className={classes.fab}
                    disabled={loading}
                    onClick={this.onEditCompanyClick}
                    size="small"
                  >
                    <Icon>edit_icon</Icon>
                  </Fab>

                  <Fab
                    color="secondary"
                    aria-label="Delete"
                    disabled={loading}
                    onClick={this.onDisableCompanyClick}
                    className={classes.fab}
                    size="small"
                  >
                    <DeleteIcon />
                  </Fab>
                </Fragment>
              )}
            </Grid>

            <CompanyUsersList
              company={selected}
              onDisable={this.onDisableUser}
              onEnable={this.onEnableUser}
              onEdit={this.onEditUser}
            />
          </div>
        )}
      </div>
    );
  }
}

CompaniesViewer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  params: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  loadCompany: PropTypes.func.isRequired,
  selected: PropTypes.shape({}),
  editCompany: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  disableCompany: PropTypes.func.isRequired,
  disableUser: PropTypes.func.isRequired,
  enableUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  usersErrorMessage: PropTypes.string,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  loading: store.companies.loading,
  selected: store.companies.selected,
  errorMessage: store.companies.errorMessage,
  usersErrorMessage: store.users.errorMessage,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadCompany,
    editCompany,
    disableCompany,
    disableUser,
    enableUser,
    editUser,
    push,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CompaniesViewer));
