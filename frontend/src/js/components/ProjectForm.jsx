import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import uuid from 'uuid';
// import { addProject } from '../actions/projectsActions';

class ProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // const { name } = this.state;
    // const { addProject } = this.props;

    // addProject({ id: uuid(), name });

    this.setState({ name: '' });
  };

  render() {
    const { name } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          type="text"
          value={name}
          onChange={this.handleChange}
        />

        <button type="submit"> Salvar </button>
      </form>
    );
  }
}

// const mapDispatchToProps = dispatch => bindActionCreators({ addProject }, dispatch);

export default ProjectForm;

// ProjectForm.propTypes = {
//   addProject: PropTypes.func.isRequired,
// };
