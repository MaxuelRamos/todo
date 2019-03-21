import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { registerPoint } from '../../operators/usersOperator';

class Me extends Component {
  onRegisterPointClick = () => {
    const { registerPoint } = this.props;
    registerPoint();
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
  registerPoint: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  loading: store.users.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    registerPoint,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Me);
