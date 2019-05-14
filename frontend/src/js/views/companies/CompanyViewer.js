import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { push } from 'react-router-redux';
import Button from '@material-ui/core/Button';
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
    const { selected, loading, errorMessage } = this.props;
    return (
      <div>
        {loading && <CircularProgress />}
        {selected && (
          <div>
            {userIs('ADMIN') && (
              <Fragment>
                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={this.onEditCompanyClick}
                >
                  {'Editar'}
                </Button>

                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={this.onDisableCompanyClick}
                >
                  {'Desabilitar'}
                </Button>
              </Fragment>
            )}

            <Button
              variant="contained"
              disabled={loading}
              onClick={this.onNewUserClick}
            >
              {'Criar Usuário'}
            </Button>

            <br />
            <br />
            {selected.name}

            <br />

            <CompanyUsersList
              company={selected}
              onDisable={this.onDisableUser}
              onEnable={this.onEnableUser}
              onEdit={this.onEditUser}
            />

            {errorMessage}
          </div>
        )}
      </div>
    );
  }
}

CompaniesViewer.propTypes = {
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
  push: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  loading: store.companies.loading,
  selected: store.companies.selected,
  errorMessage: store.companies.errorMessage,
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
)(CompaniesViewer);
