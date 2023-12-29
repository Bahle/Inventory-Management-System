import React, { Component } from 'react';
import New from '../../../../components/New';

class ProductNew extends Component {
	render() {
		return (
			<New  Root='' Title="New Product" Table="product" Fields={[
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
					type: 'longstring',
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
					label: 'Form',
					type: 'string',
					rules: { required: true, message: 'Please input form'}
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

export default ProductNew;