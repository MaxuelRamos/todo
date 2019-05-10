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
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { loadCompanies } from '../../operators/companiesOperator';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
  },
  table: {
    minWidth: 1,
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
    const { classes, companies, loading } = this.props;
    return (
      <div>
        {loading && <CircularProgress className={classes.progress} />}
        {!loading && (
          <div>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Button
                variant="contained"
                disabled={loading}
                onClick={this.onNewCompanyClick}
              >
                {'Criar'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Nome</TableCell>
                    <TableCell className={classes.tableCell}>cnpj</TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {'Data de Expiração'}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {'Usuários'}
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
                      <TableCell className={classes.tableCell}>
                        {company.cnpj}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="right">
                        {company.expiration}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="right">
                        {company.userCount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </div>
        )}
        {
          //   {!loading && (
          //   // <div>
          //   //
          //     <Grid>
          //       <Grid item xs={12}>
          //         <Table>
          //           <TableHead>
          //             <TableRow>
          //               <TableCell>Nome</TableCell>
          //               <TableCell>cnpj</TableCell>
          //               <TableCell align="right">Data de Expiração</TableCell>
          //               <TableCell align="right">Usuários</TableCell>
          //             </TableRow>
          //           </TableHead>
          //           <TableBody>
          //             {companies.map(company => (
          //               <TableRow
          //                 hover
          //                 onClick={event => this.onCompanyClick(event, company)}
          //                 tabIndex={-1}
          //                 key={company.id}
          //               >
          //                 <TableCell component="th" scope="row">
          //                   {company.name}
          //                 </TableCell>
          //                 <TableCell>{company.cnpj}</TableCell>
          //                 <TableCell align="right">{company.expiration}</TableCell>
          //                 <TableCell align="right">{company.userCount}</TableCell>
          //               </TableRow>
          //             ))}
          //           </TableBody>
          //         </Table>
          //       </Grid>
          //     </Grid>
          //     // </div>
          //   )}
          // </Grid>
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
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
