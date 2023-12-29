import React, { Component } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom'
import InputForm from './InputForm';

class Edit extends Component {
	render() {
		return (
			<DashboardLayout title={ this.props.Title }>
				<InputForm Type='Edit' Table={this.props.Table} Fields={this.props.Fields}  />
			</DashboardLayout>
		)
	}
}

export default Edit;