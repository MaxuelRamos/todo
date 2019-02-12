import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProjectForm extends Component {
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

    const { name } = this.state;
    const { onSave } = this.props;

    onSave(name);

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

ProjectForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};
