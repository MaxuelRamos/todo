import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import ControlPoint from '@material-ui/icons/ControlPoint';
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
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-end"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {userIs('USER') && (
          <div style={{ justifyContent: 'flex-end' }}>
            <Fab
              variant="extended"
              aria-label="Add"
              disabled={loading}
              onClick={this.onRegisterPointClick}
              color="primary"
            >
              <ControlPoint />
              {'Bater Ponto'}
            </Fab>
          </div>
        )}
      </Grid>
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
