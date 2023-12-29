import React, { Component } from 'react';
import New from '../../../../components/New';

class CustomerNew extends Component {
	render() {
		return (
			<New  Root='' Title="New Customer" Table="customer" Fields={[
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

export default CustomerNew;