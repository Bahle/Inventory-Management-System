import React, { Component } from 'react';
import List from '../../../../components/List';

class SuppliersList extends Component {
	render() {
		return (
			<List Root='' Path='/admin' Title="Users" RouteName="user" Table="admin" Columns={
			[{
				title: 'First name',
				dataIndex: 'first_name',
				key: 'first_name'
			},
			{
				title: 'Last name',
				dataIndex: 'last_name',
				key: 'last_name'
			},
			{
				title: 'Privileges',
				dataIndex: 'privileges',
				key: 'privileges'
			}] } />
		)
	}
}

export default SuppliersList;