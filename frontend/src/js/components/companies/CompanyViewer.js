import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadCompany } from '../../operators/companiesOperator';

class CompaniesViewer extends Component {
  componentDidMount() {
    const { loadCompany, params } = this.props;
    loadCompany(params.id);
  }

  render() {
    const { selected, loading } = this.props;
    return (
      <div>
        {loading && <CircularProgress />}
        {!loading && selected && <div>{selected.name}</div>}
      </div>
    );
  }
}

CompaniesViewer.propTypes = {
  params: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  loadCompany: PropTypes.func.isRequired,
  selected: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  loading: state.companies.loading,
  selected: state.companies.selected,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadCompany,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompaniesViewer);
