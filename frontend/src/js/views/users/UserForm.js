import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { push } from 'react-router-redux';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { loadCompanies } from '../../operators/companiesOperator';
import {
  editUser,
  createUser,
  updateUser,
} from '../../operators/usersOperator';
import userIs from '../../utils/permissionUtils';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';

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
    console.log(user.id);
    console.log(!user.id);
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
      loading, errorMessage, authenticatedUser, companies,
    } = this.props;
    const { user } = this.state;
    return (
      <div>
        {loading && <CircularProgress />}
        {user && (
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Email"
              margin="normal"
              variant="outlined"
              placeholder="Informe o email..."
              type="email"
              name="email"
              value={user.email}
              onChange={this.handleChange}
              required
            />

            <br />

            {userIs('ADMIN') && (
              <TextField
                select
                label="Empresa"
                name="companyId"
                value={user.companyId}
                onChange={this.handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Por favor, informe a empresa"
                margin="normal"
                variant="outlined"
              >
                {companies.map(company => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </TextField>
            )}

            <br />

            {userIs('ADMIN') && this.isNew() && (
              <TextField
                select
                label="Perfil"
                name="role"
                value={user.role}
                onChange={this.handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Por favor, informe o perfil de usuário"
                margin="normal"
                variant="outlined"
              >
                <option value="USER">Usuário comum</option>
                <option value="EMPLOYER">Empregador</option>
              </TextField>
            )}
            <br />

            {/* {user.id === authenticatedUser.id && (
              <div>
                <TextField
                  label="Senha"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  placeholder="Informe sua senha..."
                  name="password"
                  value={user.password}
                  onChange={this.handleChange}
                />
                <br />
                <TextField
                  label="Confirmação de Senha"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  placeholder="Informe sua senha novamente..."
                  name="passwordConfirm"
                  value={user.passwordConfirm}
                  onChange={this.handleChange}
                />
                <br />
              </div>
            )} */}

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

UserForm.propTypes = {
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
  loading: state.companies.loading,
  company: state.companies.selected,
  companies: state.companies.companies,
  selected: state.users.selected,
  errorMessage: state.companies.errorMessage,
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
)(UserForm);
