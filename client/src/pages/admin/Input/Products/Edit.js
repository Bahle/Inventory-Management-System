import React, { Component } from 'react';
import Edit from '../../../../components/Edit';
import DashboardLayout from '../../../../layouts/DashboardLayout';

class ProductEdit extends Component {
	render() {
		return (
			<DashboardLayout title="Product">
				<iframe class="airtable-embed" src="https://airtable.com/embed/shrsWKl5DA1XsGZEC?backgroundColor=red" frameborder="0" onmousewheel="" width="100%" height="533" style={{background: 'transparent', border: '1px solid #ccc'}}></iframe>
			</DashboardLayout>
		)
	}
}

export default ProductEdit;