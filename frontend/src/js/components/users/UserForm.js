import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { push } from 'react-router-redux';
import {
  editUser,
  createUser,
  updateUser,
} from '../../operators/usersOperator';

class CompanyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const {
      editUser, selected, company, params, push,
    } = this.props;

    if (!company) {
      push('/');
      return;
    }

    if (Number(params.id) === 0) {
      this.setState({
        user: {
          id: 0,
          email: '',
          companyId: company.id,
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

  handleChange = (e) => {
    const { user } = this.state;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { createUser, updateUser } = this.props;
    const { user } = this.state;

    console.log('user', user);

    if (user.id === 0) {
      createUser(user);
    } else {
      updateUser(user);
    }
  };

  render() {
    const { loading, errorMessage } = this.props;
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
  editUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  selected: PropTypes.shape({}),
  company: PropTypes.shape({}),
  errorMessage: PropTypes.string,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.companies.loading,
  company: state.companies.selected,
  selected: state.users.selected,
  errorMessage: state.companies.errorMessage,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editUser,
    createUser,
    updateUser,
    push,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyForm);
