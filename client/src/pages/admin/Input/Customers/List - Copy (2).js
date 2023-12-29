import React, { Component } from 'react';
import List from '../../../../components/List';

class SuppliersList extends Component {
	render() {
		return (
			<List Root='' Path='/input' Title="Customers" Table="customer" Columns={ [
				{
					title: 'Customer',
					dataIndex: 'name',
					key: 'name'
				},
				{
					title: 'Tel. #',
					dataIndex: 'tel_no',
					key: 'tel_no'
				}
			] }
			ExtraActions={ [{text: 'View Details', colour: '', index: 3, route: '/v'}, {text: 'Daily Sales', colour: 'purple', index: 4, route: '/d'}, /*{text: 'View Orders', colour: 'green', index: 5, route: '/o'}, {text: 'View Stock', colour: '#f06907', index: 6, route: '/s'}*/] }
			ExcludeDefaultActions={true}
			HideExtraButton={true}
			ExtraButtons={ [{text: 'View Stock', href: './customers/s/'}] } />
		)
	}
}

export default SuppliersList;