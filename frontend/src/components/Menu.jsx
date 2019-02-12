import React, { Component } from 'react';
import uuid from 'uuid';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';

export default class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [
        {
          name: 'teste 1',
          id: uuid(),
        },
        {
          name: ' teste 2',
          id: uuid(),
        },
      ],
    };
  }

  onSave = (name) => {
    this.setState(prevState => ({
      projects: [...prevState.projects, { name, id: uuid() }],
    }));
  };

  onDelete = (id) => {
    const { projects } = this.state;
    this.setState({ projects: projects.filter(p => p.id !== id) });
  };

  render() {
    const { projects } = this.state;
    return (
      <div>
        <ProjectList projects={projects} onDelete={this.onDelete} />
        <ProjectForm onSave={this.onSave} />
      </div>
    );
  }
}
