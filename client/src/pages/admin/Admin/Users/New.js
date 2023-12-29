import React, { Component } from 'react';
import New from '../../../../components/New';

class SupplierNew extends Component {
	render() {
		return (
			// email	password	first_name	last_name	gender	store	privileges	date_created	date_updated
			<New  Root='a' Title="New User" Table="admin" Fields={[
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
					rules: { required: true, message: 'Please input gender', values: ['Male', 'Female']}
				},
				{
					name: 'store',
					type: 'select',
					rules: { required: true, email: true, message: 'Please input store', values: ['Kingsway', 'LNDC', 'Warehouse']} /* !!!later load from database!!! */
				},
				{
					name: 'privileges',
					type: 'select',
					rules: { required: true, email: true, message: 'Please input store', values: ['Admin', 'Clerk', 'View']} /* !!!later load from database!!! */
				},
			]} />
		)
	}
}

export default SupplierNew;