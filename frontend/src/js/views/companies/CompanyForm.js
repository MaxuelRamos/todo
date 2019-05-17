import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import Alert from '../../components/Alert';
import {
  editCompany,
  createCompany,
  updateCompany,
} from '../../operators/companiesOperator';

const styles = {
  buttonArea: {
    paddingTop: 30,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
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
    const { loading, classes, errorMessage } = this.props;
    const { company } = this.state;

    return (
      <div>
        <Alert text={errorMessage} type="danger" />
        {loading && <CircularProgress />}
        {!loading && company && (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              {'Formulário de Empresa'}
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    label="Nome"
                    margin="normal"
                    placeholder="Informe o nome..."
                    name="name"
                    value={company.name}
                    onChange={this.handleChange}
                    inputProps={{ minLength: 1, maxLength: 200 }}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="cnpj"
                    label="CNPJ"
                    margin="normal"
                    placeholder="Informe o cnpj..."
                    name="cnpj"
                    value={company.cnpj}
                    onChange={this.handleChange}
                    inputProps={{ minLength: 4, maxLength: 18 }}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="maxUsers"
                    label="Limite de usuários"
                    margin="normal"
                    placeholder="Informe o limite de usuários..."
                    name="userCount"
                    value={company.userCount}
                    onChange={this.handleChange}
                    type="number"
                    inputProps={{ min: '0', max: '100', step: '1' }}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
              <div className={classes.buttonArea}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {'Salvar'}
                </Button>
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    );
  }
}

CompanyForm.propTypes = {
  errorMessage: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
  params: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  editCompany: PropTypes.func.isRequired,
  createCompany: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired,
  selected: PropTypes.shape({}),
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
)(withStyles(styles)(CompanyForm));
