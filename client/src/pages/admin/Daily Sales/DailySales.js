import React, { Component } from 'react';
import List from '../../../components/List';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import UserProfile from '../../../UserProfile';

class SuppliersList extends Component {
	render() {
		return (
			<DashboardLayout title="Daily Sales">
				{ !UserProfile.isViewOnly() && <Link to={'/daily-sales/import'}>
					<Button type="primary" style={{ float:'right', marginBottom: '10px' }}>Import from Excel</Button>
				</Link> }

				{ !UserProfile.isViewOnly() && <a target="_blank" href={`https://app.miniextensions.com/form/DBDgLW7mEqQeADQvEmLz/`}>
		  			<Button type="primary" style={{ float:'right', marginBottom: '10px', marginRight: '8px' }}>
		  				Add Record
		  			</Button>
	  			</a> }

	  			<iframe class="airtable-embed" src={
	  				UserProfile.isViewOnly() ? "https://airtable.com/embed/shrb5OfJ0WREm5KYu?backgroundColor=red&viewControls=on"
	  				: "https://airtable.com/embed/shrQMvZM55jY9sE6A?backgroundColor=red&viewControls=on"
	  			} frameborder="0" onmousewheel="" width="100%" height="533" style={{background: 'transparent', border: '1px solid #ccc'}}></iframe>
			</DashboardLayout>
		)
	}
}

export default SuppliersList;