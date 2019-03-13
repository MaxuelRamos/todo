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
import loadCompanies from '../../operators/companiesOperator';

const styles = {
  table: {
    width: '100%',
  },
};

class CompaniesList extends Component {
  state = {
    selected: null,
  };

  componentDidMount() {
    const { loadCompanies } = this.props;
    loadCompanies();
  }

  handleClick = (event, company) => {
    this.setState({ selected: company });
  };

  render() {
    const { classes, companies } = this.props;
    const { selected } = this.state;
    return (
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>cnpj</TableCell>
              <TableCell align="right">Data de Expiração</TableCell>
              <TableCell align="right">Usuários</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map(company => (
              <TableRow
                hover
                onClick={event => this.handleClick(event, company)}
                tabIndex={-1}
                key={company.id}
                selected={company === selected}
              >
                <TableCell component="th" scope="row">
                  {company.name}
                </TableCell>
                <TableCell>{company.cnpj}</TableCell>
                <TableCell align="right">{company.expiration}</TableCell>
                <TableCell align="right">{company.userCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  companies: store.companies.companies,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadCompanies,
  },
  dispatch,
);

CompaniesList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  companies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loadCompanies: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CompaniesList));
