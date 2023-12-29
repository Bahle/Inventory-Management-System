import React, { Component } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom'
import InputForm from './InputForm';

class New extends Component {
	render() {
		return (
			<DashboardLayout title={ this.props.Title }>
				<InputForm Type='New' Table={this.props.Table} Fields={this.props.Fields}  />
			</DashboardLayout>
		)
	}
}

export default New;