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
import moment from 'moment';
import { editUser } from '../../operators/usersOperator';
import PointsList from './PointsList';
import { loadPoints } from '../../operators/pointsOperator';

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

class Me extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    const { loadPoints } = this.props;
    const { date } = this.state;
    loadPoints(moment(date).format('YYYY-MM-DD'));
  }

  onRegisterPointClick = () => {
    const { push } = this.props;
    push('/me/register');
  };

  onEditClick = () => {
    const { editUser, authenticatedUser } = this.props;
    editUser(authenticatedUser.id);
  };

  onchangeDate = (newDate) => {
    this.setState({ date: newDate.toDate() });
    const { loadPoints } = this.props;
    loadPoints(newDate.format('YYYY-MM-DD'));
  };

  onDisablePoint = (point) => {
    console.log(point);
  };

  render() {
    const { loading, classes, points } = this.props;
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
          <PointsList points={points} onDisable={this.onDisablePoint} />
        </Grid>
      </Grid>
    );
  }
}

Me.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  authenticatedUser: PropTypes.shape({}).isRequired,
  points: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  loading: PropTypes.bool.isRequired,
  editUser: PropTypes.func.isRequired,
  loadPoints: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  loading: store.users.loading,
  points: store.points.points,
  authenticatedUser: store.auth.authenticatedUser,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    push,
    editUser,
    loadPoints,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Me));
