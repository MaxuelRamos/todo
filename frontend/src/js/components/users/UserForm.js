import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  editCompany,
  createCompany,
  updateCompany,
} from '../../operators/companiesOperator';

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
      this.setState({
        company: {
          id: 0,
          name: '',
          cnpj: '',
          userCount: 5,
        },
      });
      return;
    }

    if (!selected) {
      editCompany(params.id);
    } else {
      this.setState({ company: { ...selected } });
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
    const { company } = this.state;
    company[e.target.name] = e.target.value;
    this.setState({ company });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { createCompany, updateCompany } = this.props;
    const { company } = this.state;

    if (company.id === 0) {
      createCompany(company);
    } else {
      updateCompany(company);
    }
  };

  render() {
    const { loading, errorMessage } = this.props;
    const { company } = this.state;

    return (
      <div>
        {loading && <CircularProgress />}
        {company && (
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Nome"
              margin="normal"
              variant="outlined"
              placeholder="Informe o nome..."
              name="name"
              value={company.name}
              onChange={this.handleChange}
              inputProps={{ minLength: 4, maxLength: 200 }}
              required
            />

            <TextField
              label="Email"
              margin="normal"
              variant="outlined"
              placeholder="Informe o email..."
              type="email"
              name="username"
              value={user.name}
              onChange={this.handleChange}
              required
            />

            <br />
            <TextField
              label="CNPJ"
              margin="normal"
              variant="outlined"
              placeholder="Informe o cnpj..."
              name="cnpj"
              value={company.cnpj}
              onChange={this.handleChange}
              inputProps={{ minLength: 4, maxLength: 18 }}
              required
            />

            <br />

            <TextField
              label="Limite de usuários"
              margin="normal"
              variant="outlined"
              placeholder="Informe o limite de usuários..."
              name="userCount"
              value={company.userCount}
              onChange={this.handleChange}
              type="number"
              inputProps={{ min: '0', max: '100', step: '1' }}
              required
            />

            <br />

            <Button variant="contained" type="submit" disabled={loading}>
              {'Salvar'}
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
  createCompany: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired,
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
    createCompany,
    updateCompany,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyForm);
