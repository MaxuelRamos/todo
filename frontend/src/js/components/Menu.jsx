import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import CompaniesList from './CompaniesList';
import fetchCompanies from '../actions/companiesActions';

class MenuBar extends Component {
  componentDidMount() {
    const { fetchCompanies } = this.props;
    fetchCompanies();
  }

  render() {
    const { companies } = this.props;
    return (
      <div>
        <CompaniesList companies={companies} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  companies: store.companies.companies,
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchCompanies }, dispatch);

MenuBar.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  fetchCompanies: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuBar);
