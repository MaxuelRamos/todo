import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import ControlPoint from '@material-ui/icons/ControlPoint';
import { withStyles } from '@material-ui/core/styles';
import { DatePicker } from 'material-ui-pickers';
import { editUser } from '../../operators/usersOperator';
import PointsList from './PointsList';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const pontos = [
  {
    id: 1,
    timestamp: new Date(),
    enabled: true,
  },
  {
    id: 2,
    timestamp: new Date(),
    enabled: false,
    comment: 'teste',
  },
  {
    id: 3,
    timestamp: new Date(),
    enabled: true,
  },
  {
    id: 4,
    timestamp: new Date(),
    enabled: true,
  },
];

class Me extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }

  onRegisterPointClick = () => {
    const { push } = this.props;
    push('/me/register');
  };

  onEditClick = () => {
    const { editUser, authenticatedUser } = this.props;
    editUser(authenticatedUser.id);
  };

  onchangeDate = (moment) => {
    console.log(moment.toDate());
    this.setState({ date: moment.toDate() });
  };

  onDisablePoint = (point) => {
    console.log(point);
  };

  render() {
    const { loading, classes } = this.props;
    const { date } = this.state;
    return (
      <Grid container direction="row" spacing={8}>
        <Grid item xs={6}>
          <DatePicker value={date} onChange={this.onchangeDate} autoOk />
        </Grid>
        <Grid item xs={6}>
          <Fab
            variant="extended"
            aria-label="Add"
            disabled={loading}
            onClick={this.onRegisterPointClick}
            color="primary"
            style={{ float: 'right' }}
            className={classes.fab}
          >
            <ControlPoint className={classes.extendedIcon} />
            {' Ponto'}
          </Fab>
        </Grid>

        <Grid item xs={12}>
          <PointsList points={pontos} onDisable={this.onDisablePoint} />
        </Grid>
      </Grid>
    );
  }
}

Me.propTypes = {
  classes: PropTypes.shape({}).isRequired,
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
)(withStyles(styles)(Me));
