import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from './js/actions/authActions';

class App extends Component {
  onLogOut = () => {
    const { logoutUser, history } = this.props;

    logoutUser(history);
  };

  render() {
    return (
      <div>
        {/* <Main /> */}
        {'Main'}
        <Button variant="contained" type="submit" onClick={this.onLogOut}>
          {'Logout'}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    logoutUser,
  },
  dispatch,
);

App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.shape({}),
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(App),
);
