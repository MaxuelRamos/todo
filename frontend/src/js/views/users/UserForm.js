import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { push } from 'react-router-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Alert from '../../components/Alert';
import { loadCompanies } from '../../operators/companiesOperator';
import {
  editUser,
  createUser,
  updateUser,
} from '../../operators/usersOperator';
import userIs from '../../utils/permissionUtils';

const styles = {
  buttonArea: {
    paddingTop: 30,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const {
      editUser,
      selected,
      company,
      params,
      push,
      loadCompanies,
    } = this.props;

    if (userIs('ADMIN')) {
      loadCompanies();
    }

    if (Number(params.id) === 0) {
      // Se o usuário tiver editando suas informações, não precisa passar a empresa
      if (userIs('EMPLOYER') && !company) {
        push('/');
        return;
      }

      this.setState({
        user: {
          id: 0,
          email: '',
          companyId: company ? company.id : -1,
        },
      });
      return;
    }

    if (!selected) {
      editUser(params.id);
    } else {
      this.setState({ user: { ...selected } });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = this.props;
    // Se o item selecionado mudar, deve-se mudar o item em edição
    if (selected !== nextProps.selected) {
      this.setState({ user: { ...nextProps.selected } });
    }
  }

  isNew = () => {
    const { user } = this.state;
    return !user.id;
  };

  handleChange = (e) => {
    const { user } = this.state;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { createUser, updateUser } = this.props;
    const { user } = this.state;

    if (!user.id || user.id === 0) {
      createUser(user);
    } else {
      updateUser(user);
    }
  };

  render() {
    const {
      loading, errorMessage, companies, classes,
    } = this.props;
    const { user } = this.state;
    return (
      <div>
        <Alert text={errorMessage} type="danger" />
        {loading && <CircularProgress />}
        {!loading && user && (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              {'Formulário de Usuário'}
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    margin="normal"
                    placeholder="Informe o email..."
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                {user.role !== 'ADMIN' && userIs('ADMIN') && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Empresa"
                      name="companyId"
                      value={user.companyId}
                      onChange={this.handleChange}
                      SelectProps={{
                        native: true,
                      }}
                      margin="normal"
                      fullWidth
                    >
                      {companies.map(company => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                )}
              </Grid>

              {userIs('ADMIN') && this.isNew() && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Perfil"
                    name="role"
                    value={user.role}
                    onChange={this.handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    margin="normal"
                    fullWidth
                  >
                    <option value="USER">Usuário comum</option>
                    <option value="EMPLOYER">Empregador</option>
                  </TextField>
                </Grid>
              )}

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

UserForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  authenticatedUser: PropTypes.shape({}),
  companies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  params: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  selected: PropTypes.shape({}),
  company: PropTypes.shape({}),
  errorMessage: PropTypes.string,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authenticatedUser: state.auth.authenticatedUser,
  loading: state.users.loading,
  company: state.companies.selected,
  companies: state.companies.companies,
  selected: state.users.selected,
  errorMessage: state.users.errorMessage,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editUser,
    createUser,
    loadCompanies,
    updateUser,
    push,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(UserForm));
