import React, { Component } from 'react';
import List from '../../../components/List';

class SuppliersList extends Component {
	render() {
		return (
			<List Root='' Path='/input' Title="Suppliers" Table="supplier" Columns={ [{
				title: 'Supplier',
				dataIndex: 'name',
				key: 'name'
			}] } />
		)
	}
}

export default SuppliersList;