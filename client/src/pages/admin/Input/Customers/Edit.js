import React, { Component } from 'react';
import Edit from '../../../../components/Edit';

class CustomerEdit extends Component {
	render() {
		return (
			<Edit Root='' Title="Edit Customer" Table="customer" Fields={[
				{
					name: 'name',
					type: 'string',
					rules: { required: true, message: 'Please input name'}
				},
				{
					name: 'address',
					type: 'text',
					rules: { required: true, message: 'Please input address'}
				},
				{
					name: 'account_no',
					type: 'string',
					rules: { required: true, message: 'Please input account no.'}
				},
				{
					name: 'tel_no',
					type: 'tel',
					rules: { required: true, message: 'Please input tel no.'}
				},
				{
					name: 'mark_up',
					type: 'integer',
					rules: { required: true, message: 'Please input mark_up'}
				}
			]} />
		)
	}
}

export default CustomerEdit;