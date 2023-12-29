import React, { Component } from 'react';
import List from '../../../../components/List';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import { Button } from 'antd';
import UserProfile from '../../../../UserProfile';

class SuppliersList extends Component {
	render() {
		return (
			<DashboardLayout title="Suppliers">
	  			{ !UserProfile.isViewOnly() && <a target="_blank" href={`https://app.miniextensions.com/form/1JcTppjJOJJq2tw6Y9Zd/`}>
		  			<Button type="primary" style={{ float:'right', marginBottom: '10px', marginRight: '8px' }}>
		  				New Supplier
		  			</Button>
	  			</a> }

				<iframe class="airtable-embed" src={
					UserProfile.isViewOnly() ? "https://airtable.com/embed/shrQUe9iATFC5mSwe?backgroundColor=red&viewControls=on"
					: "https://airtable.com/embed/shrT3hV2YGESK5QjA?backgroundColor=red&viewControls=on"
				} frameborder="0" onmousewheel="" width="100%" height="533" style={{background: 'transparent', border: '1px solid #ccc'}}></iframe>
			</DashboardLayout>
		)
	}
}

export default SuppliersList;