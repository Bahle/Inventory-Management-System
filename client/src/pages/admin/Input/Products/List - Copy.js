import React, { Component, Button } from 'react';
import List from '../../../../components/List';

class ProductList extends Component {
	render() {
		return (
			<List Root='' Path='/input' Title="Products" Table="product" Columns={ [
				{
					title: 'Product',
					dataIndex: 'name',
					key: 'name'
				},
				{
					title: 'Description',
					dataIndex: 'description',
					key: 'description'
				},
				{
					title: 'Pack size',
					dataIndex: 'pack_size',
					key: 'pack_size'
				},
				/* {
					title: 'Price',
					dataIndex: 'price',
					key: 'price'
				}, */
				{
					title: 'Quantity',
					dataIndex: 'quantity',
					key: 'quantity'
				}
			] } ExtraButtons={ [{text: 'Import From Excel', href: './products/import'}] }
			ExtraActions={ [{text: 'Add stock', colour: '#f06907', index: 2, route: '/s'}] } />
		)
	}
}

export default ProductList;