import React from 'react';
import PropTypes from 'prop-types';

export default function ProjectList(props) {
  const { projects, onDelete } = props;

  return (
    <div>
      {projects.map(p => (
        <div key={p.id}>
          {p.name}
          <button type="button" onClick={() => onDelete(p.id)}> X </button>
        </div>
      ))}
    </div>
  );
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};
