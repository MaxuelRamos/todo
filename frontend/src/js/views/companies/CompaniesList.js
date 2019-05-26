import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { push } from 'react-router-redux';
import Grid from '@material-ui/core/Grid';
import Moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { loadCompanies } from '../../operators/companiesOperator';
import Alert from '../../components/Alert';

const styles = theme => ({
  title: {
    flexGrow: 1,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
  },
  fab: {
    margin: theme.spacing.unit,
  },
});

class CompaniesList extends Component {
  componentDidMount() {
    const { loadCompanies } = this.props;
    loadCompanies();
  }

  onCompanyClick = (event, company) => {
    const { push } = this.props;
    push(`/companies/${company.id}`);
  };

  onNewCompanyClick = () => {
    const { push } = this.props;
    push('/companies/edit/0');
  };

  render() {
    const {
      classes, companies, loading, errorMessage,
    } = this.props;
    return (
      <div>
        <Alert text={errorMessage} type="danger" />
        {loading && <CircularProgress className={classes.progress} />}
        {!loading && (
          <div>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Typography component="h1" variant="h5" className={classes.title}>
                {'Empresas'}
              </Typography>
              <Fab
                color="primary"
                aria-label="Add"
                disabled={loading}
                onClick={this.onNewCompanyClick}
                className={classes.fab}
                size="small"
              >
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCell} align="left">
                      {'Nome'}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {'Expiração'}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.map(company => (
                    <TableRow
                      hover
                      onClick={event => this.onCompanyClick(event, company)}
                      tabIndex={-1}
                      key={company.id}
                    >
                      <TableCell
                        className={classes.tableCell}
                        component="th"
                        scope="row"
                      >
                        {company.name}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="right">
                        {company.expiration
                          ? Moment(company.expiration).format('DD/MM/YYYY')
                          : ''}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  errorMessage: store.companies.errorMessage,
  companies: store.companies.companies,
  loading: store.companies.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadCompanies,
    push,
  },
  dispatch,
);

CompaniesList.propTypes = {
  errorMessage: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  companies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loadCompanies: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CompaniesList));
