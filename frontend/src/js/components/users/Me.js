import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { push } from 'react-router-redux';

class Me extends Component {
  onRegisterPointClick = () => {
    const { push } = this.props;
    push('/me/register');
  };

  render() {
    const { loading } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          disabled={loading}
          onClick={this.onRegisterPointClick}
        >
          {'Bater ponto'}
        </Button>
      </div>
    );
  }
}

Me.propTypes = {
  loading: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  loading: store.users.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    push,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Me);
