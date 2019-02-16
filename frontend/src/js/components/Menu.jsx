import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import fetchProjects from '../actions/projectsActions';

class MenuBar extends Component {
  componentDidMount() {
    const { fetchProjects } = this.props;
    fetchProjects();
  }

  render() {
    const { projects } = this.props;
    return (
      <div>
        <ProjectList projects={projects} />
        <ProjectForm />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  projects: store.projects.projects,
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchProjects }, dispatch);

MenuBar.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  // deleteProject: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuBar);
