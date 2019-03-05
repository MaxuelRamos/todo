import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { loginUser } from '../../operators/authOperator';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    const { loginUser } = this.props;

    loginUser({ username, password });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, errorMessage } = this.props;
    const { username, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label="Email"
          margin="normal"
          variant="outlined"
          placeholder="Informe seu email..."
          type="email"
          name="username"
          value={username}
          onChange={this.handleChange}
          required
        />

        <br />
        <TextField
          label="Senha"
          margin="normal"
          variant="outlined"
          type="password"
          placeholder="Informe sua senha..."
          name="password"
          value={password}
          onChange={this.handleChange}
          required
        />
        <br />
        <Button variant="contained" type="submit" disabled={loading}>
          {'Login'}
        </Button>
        <br />
        {errorMessage}
      </form>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.auth.loading,
  errorMessage: store.auth.errorMessage,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loginUser,
  },
  dispatch,
);

Login.propTypes = {
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
