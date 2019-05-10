import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { loginUser } from '../../operators/authOperator';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import CardFooter from '../../components/Card/CardFooter';
import CustomInput from '../../components/CustomInput/CustomInput';
import Button from '../../components/CustomButtons/Button';

import LoginStyle from '../../styles/LoginStyle';
import image from '../../assets/img/bg7.jpg';

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
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { loading, errorMessage, classes } = this.props;
    const { username, password } = this.state;
    return (
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <Typography variant="h6" color="inherit" noWrap>
                      {'Login'}
                    </Typography>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Email"
                      id="username"
                      margin="normal"
                      variant="outlined"
                      placeholder="Informe seu email..."
                      type="email"
                      name="username"
                      required
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleChange,
                        value: username,
                      }}
                      inputProps={{
                        type: 'email',
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Senha"
                      id="password"
                      margin="normal"
                      variant="outlined"
                      type="password"
                      placeholder="Informe sua senha..."
                      name="password"
                      required
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleChange,
                        value: password,
                      }}
                      inputProps={{
                        type: 'password',
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              {'lock_outline'}
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errorMessage}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      color="primary"
                      size="lg"
                      type="submit"
                      disabled={loading}
                    >
                      {'Entrar'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
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
  classes: PropTypes.shape({}).isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(LoginStyle)(Login));
