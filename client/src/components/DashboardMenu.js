import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

class DashboardMenu extends Component {
  menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="#">Home</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">Profile</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="#">Achievements</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Leaderboard</Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Dropdown overlay={this.menu} trigger={['click']}>
      <a className="ant-dropdown-link" href="#">
        Menu <Icon type="menu-unfold" />
      </a>
    </Dropdown>
    )
  }
}

export default DashboardMenu;