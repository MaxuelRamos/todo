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
} from '../../operators/companiesOperator';
import UserList from './UserList';

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
    console.log('editando', user);
  };

  onDeleteUser = (user) => {
    const { disableCompanyUser, selected } = this.props;
    disableCompanyUser(selected, user);
  };

  render() {
    const { selected, loading } = this.props;
    return (
      <div>
        {loading && <CircularProgress />}
        {!loading && selected && (
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
              users={selected.users}
              onDelete={this.onDeleteUser}
              onEdit={this.onEditUser}
            />
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
};

const mapStateToProps = state => ({
  loading: state.companies.loading,
  selected: state.companies.selected,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadCompany,
    editCompany,
    disableCompany,
    disableCompanyUser,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompaniesViewer);
