import React, { Component } from 'react';
import List from '../../../../components/List';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import { Button } from 'antd';

class SuppliersList extends Component {
	render() {
		return (
			<DashboardLayout title="Manual Stock Entry">
	  			<a target="_blank" href={`https://app.miniextensions.com/form/UUdMvrE3RkJo6u8o74M6/`}>
		  			<Button type="primary" style={{ float:'right', marginBottom: '10px', marginRight: '8px' }}>
		  				Add Stock Entry
		  			</Button>
	  			</a>

				<iframe class="airtable-embed" src="https://airtable.com/embed/shriUs6Rl6ANoX5Pd?backgroundColor=red&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style={{background: 'transparent', border: '1px solid #ccc'}}></iframe>
			</DashboardLayout>
		)
	}
}

export default SuppliersList;