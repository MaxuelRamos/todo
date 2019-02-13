import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import { deleteProject } from '../actions/projectsActions';

function MenuBar(props) {
  const { projects, deleteProject } = props;
  return (
    <div>
      <ProjectList projects={projects} onDelete={deleteProject} />
      <ProjectForm />
    </div>
  );
}

const mapStateToProps = store => ({
  projects: store.projects.projects,
});

const mapDispatchToProps = dispatch => bindActionCreators({ deleteProject }, dispatch);

MenuBar.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuBar);
