import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { editCompany } from '../../operators/companiesOperator';

class CompanyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { editCompany, selected, params } = this.props;

    if (Number(params.id) === 0) {
      this.setState({ company: { id: 0 } });
      return;
    }

    if (!selected) {
      editCompany(params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = this.props;
    // Se o item selecionado mudar, deve-se mudar o item em edição
    if (selected !== nextProps.selected) {
      this.setState({ company: { ...nextProps.selected } });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // loginUser({ username, password });
  };

  render() {
    const { loading, errorMessage, selected } = this.props;
    const { company } = this.state;

    return (
      <div>
        {loading && <CircularProgress />}
        {company && (
          <form onSubmit={this.handleSubmit}>
            {company.id}
            {selected && selected.id}
            <Button variant="contained" type="submit" disabled={loading}>
              {'Login'}
            </Button>
            <br />
            {errorMessage}
          </form>
        )}
      </div>
    );
  }
}

CompanyForm.propTypes = {
  params: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  editCompany: PropTypes.func.isRequired,
  selected: PropTypes.shape({}),
  errorMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  loading: state.companies.loading,
  selected: state.companies.selected,
  errorMessage: state.companies.errorMessage,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editCompany,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyForm);
