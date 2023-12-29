import React, { Component } from 'react';
import Edit from '../../../../components/Edit';

class ProductEdit extends Component {
	render() {
		return (
			<Edit Root='' Title="Edit Supplier" Table="product" Fields={[
				{
					name: 'product_code',
					type: 'string',
					rules: { required: true, message: 'Please input product code'}
				},
				{
					name: 'name',
					type: 'string',
					rules: { required: true, message: 'Please input name'}
				},
				{
					name: 'quantity',
					type: 'integer',
					rules: { required: true, message: 'Please input quantity'}
				},
				{
					name: 'description',
					type: 'text',
					rules: { required: true, message: 'Please input description'}
				},
				{
					name: 'strength',
					type: 'string',
					rules: { required: true, message: 'Please input strength'}
				},
				{
					name: 'additional_info',
					type: 'string',
					rules: { required: false, message: 'Please input strength'}
				},
				{
					name: 'types',
					type: 'select',
					values: ['Type A', 'Type B', 'Type C'],
					rules: { required: true, message: 'Please input types'}
				},
				{
					name: 'pack_size',
					type: 'string',
					rules: { required: true, message: 'Please input types'}
				},
				{
					name: 'mark_up',
					type: 'integer',
					rules: { required: true, message: 'Please input mark up value'}
				},
				{
					name: 'min_stock_level',
					type: 'integer',
					rules: { required: true, message: 'Please input types'}
				},
				{
					name: 'barcode',
					type: 'string',
					rules: { required: true, message: 'Please input barcode'}
				}
			]} />
		)
	}
}

export default ProductEdit;