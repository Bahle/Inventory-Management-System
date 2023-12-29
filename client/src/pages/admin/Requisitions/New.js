import React, { Component } from 'react';
import New from '../../../components/New';

class SupplierNew extends Component {
	render() {
		return (
			<New  Root='' Title="New Supplier" Table="supplier" Fields={[
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

export default SupplierNew;