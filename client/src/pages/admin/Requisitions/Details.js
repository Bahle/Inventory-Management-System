import React, { Component } from 'react';
import View from '../../../components/View';

class SupplierDetails extends Component {
	render() {
		return (
			<View Root='' Title="Supplier details" Table="supplier" SpecialFields={
				{
					vat: {
						label: 'Do they charge vat?',
						type : 'boolean'
					}
				}
			} />
		)
	}
}

export default SupplierDetails;