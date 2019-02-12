import React, { Component } from 'react';
import { Menu } from 'antd';

export default class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [
        {
          name: 'teste 1',
          id: 1,
        },
        {
          name: ' teste 2',
          id: 2,
        },
      ],
      current: '',
    };
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    const { projects, current } = this.state;
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          style={{ width: 256 }}
          mode="inline"
        >
          {projects.map(p => (
            <Menu.Item key={p.id}>{p.name}</Menu.Item>
          ))}
        </Menu>
      </div>
    );
  }
}
