import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import {
  loadCompany,
  editCompany,
  disableCompany,
  disableCompanyUser,
  enableCompanyUser,
} from '../../operators/companiesOperator';
import UserList from '../users/UserList';

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

  onEditUser = (user) => {};

  onDisableUser = (user) => {
    const { disableCompanyUser, selected } = this.props;
    disableCompanyUser(selected, user);
  };

  onEnableUser = (user) => {
    const { enableCompanyUser, selected } = this.props;
    enableCompanyUser(selected, user);
  };

  render() {
    const { selected, loading, errorMessage } = this.props;
    return (
      <div>
        {loading && <CircularProgress />}
        {selected && (
          <div>
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

            <br />
            {selected.name}

            <br />

            <UserList
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
  disableCompany: PropTypes.func.isRequired,
  disableCompanyUser: PropTypes.func.isRequired,
  enableCompanyUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
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
    disableCompanyUser,
    enableCompanyUser,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompaniesViewer);
