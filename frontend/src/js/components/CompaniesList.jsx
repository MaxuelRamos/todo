import React from 'react';
import PropTypes from 'prop-types';

export default function CompaniesList(props) {
  const { companies } = props;

  return (
    <div>
      {companies.map(p => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}

CompaniesList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
