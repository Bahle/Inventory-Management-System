import React, { Component } from 'react';
import List from '../../../../components/List';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import UserProfile from '../../../../UserProfile';

class ProductList extends Component {
	render() {
		return (
			<DashboardLayout title="Product">
	  			{ !UserProfile.isViewOnly() && <Link to={'/products/import'}>
					<Button type="primary" style={{ float:'right', marginBottom: '10px' }}>Import from Excel</Button>
				</Link> }

				{ !UserProfile.isViewOnly() && <a target="_blank" href={`https://app.miniextensions.com/form/DwQpa7CFQJWxdxD9owUG/`}>
		  			<Button type="primary" style={{ float:'right', marginBottom: '10px', marginRight: '8px' }}>
		  				Add Record
		  			</Button>
	  			</a> }

				<iframe class="airtable-embed" src={
					UserProfile.isViewOnly() ? "https://airtable.com/embed/shrk4hrFEcKFlPnPA?backgroundColor=red&viewControls=on"
					: "https://airtable.com/embed/shrUf4HFrGSjTVNVx?backgroundColor=red&viewControls=on"
				} frameborder="0" onmousewheel="" width="100%" height="533" style={{background: 'transparent', border: '1px solid #ccc'}}></iframe>
			</DashboardLayout>
		)
	}
}

export default ProductList;