import React, { Component } from 'react';
import Edit from '../../../../components/Edit';

class SupplierEdit extends Component {
	render() {
		return (
			<Edit Root='a' Title="Edit Supplier" Table="supplier" Fields={[
				{
					name: 'email',
					type: 'string',
					rules: { required: true, email: true, message: 'Please input email'}
				},
				{
					name: 'password',
					type: 'password',
					rules: { required: true, message: 'Please input password.'}
				},
				{
					name: 'first_name',
					type: 'string',
					rules: { required: true, message: 'Please input the first name'}
				},
				{
					name: 'last_name',
					type: 'last_name',
					rules: { required: true, message: 'Please input the last name.'}
				},
				{
					name: 'gender',
					type: 'select',
					rules: { required: true, message: 'Please input gender'},
					values: ['Male', 'Female']
				},
				{
					name: 'store',
					type: 'select',
					rules: { required: true, email: true, message: 'Please input store'},
					values: ['Kingsway', 'LNDC', 'Warehouse']
				},
				{
					name: 'privileges',
					type: 'select',
					rules: { required: true, email: true, message: 'Please input store'},
					values: ['Admin', 'Clerk', 'View']
				}
			]} />
		)
	}
}

export default SupplierEdit;