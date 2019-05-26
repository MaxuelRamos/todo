import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Out from '@material-ui/icons/CallMade';
import In from '@material-ui/icons/CallReceived';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Typography } from '@material-ui/core';

const styles = {
  in: {
    color: 'green',
  },
  out: {
    color: 'red',
  },
  disabled: {
    opacity: 0.5,
    textDecoration: 'line-through',
  },
};

const PointsList = (props) => {
  const { points, onDisable, classes } = props;
  let counter = 0;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          <TableCell component="th" scope="row">
            {'Horário'}
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {points.map(point => (
          <TableRow hover key={point.id}>
            <TableCell padding="checkbox">
              {point.enabled && (
                <div>
                  {counter++ % 2 === 0 ? (
                    <In className={classes.in} />
                  ) : (
                    <Out className={classes.out} />
                  )}
                </div>
              )}
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography className={!point.enabled ? classes.disabled : ''}>
                {moment(point.timestamp).format('HH:mm')}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <IconButton
                aria-label="Desabilitar"
                disabled={!point.enabled}
                onClick={() => onDisable(point)}
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

PointsList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  points: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  onDisable: PropTypes.func.isRequired,
};

export default withStyles(styles)(PointsList);
