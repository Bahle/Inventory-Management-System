import React, { Component } from 'react';
import Edit from '../../../../components/Edit';

class SupplierEdit extends Component {
	render() {
		return (
			<Edit Root='' Title="Edit Supplier" Table="supplier" Fields={[
				{
					name: 'name',
					type: 'string',
					rules: { required: true, message: 'Please input name'}
				},
				{
					name: 'account_no',
					type: 'string',
					rules: { required: true, message: 'Please input account no.'}
				},
				{
					name: 'city',
					type: 'string',
					rules: { required: true, message: 'Please input city'}
				},
				{
					name: 'tel_no',
					type: 'tel',
					rules: { required: true, message: 'Please input tel no.'}
				},
				{
					name: 'vat',
					type: 'boolean',
					rules: { required: true, message: 'Please input vat'}
				}
			]} />
		)
	}
}

export default SupplierEdit;