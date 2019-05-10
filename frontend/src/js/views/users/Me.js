import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { push } from 'react-router-redux';
import { editUser } from '../../operators/usersOperator';
import userIs from '../../utils/permissionUtils';

class Me extends Component {
  onRegisterPointClick = () => {
    const { push } = this.props;
    push('/me/register');
  };

  onEditClick = () => {
    const { editUser, authenticatedUser } = this.props;
    editUser(authenticatedUser.id);
  };

  render() {
    const { loading } = this.props;
    return (
      <div>
        {userIs('USER') && (
          <Button
            variant="contained"
            disabled={loading}
            onClick={this.onRegisterPointClick}
          >
            {'Bater ponto'}
          </Button>
        )}
        <Button
          variant="contained"
          disabled={loading}
          onClick={this.onEditClick}
        >
          {'Editar'}
        </Button>
      </div>
    );
  }
}

Me.propTypes = {
  authenticatedUser: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  editUser: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  loading: store.users.loading,
  authenticatedUser: store.auth.authenticatedUser,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    push,
    editUser,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Me);
