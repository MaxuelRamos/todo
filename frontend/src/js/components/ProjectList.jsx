import React from 'react';
import PropTypes from 'prop-types';

export default function ProjectList(props) {
  const { projects } = props;

  return (
    <div>
      {projects && (
        <div>
          {projects.map(p => (
            <div key={p.id}>{p.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
