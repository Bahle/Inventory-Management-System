import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Table, Divider, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../../constants'
import './index.css';
import UserProfile from '../../../UserProfile';

class List extends Component {
	render() {
		return (
			<DashboardLayout title="Stock Receive">
	  			{ /* !UserProfile.isViewOnly() && <a target="_blank" href={`https://app.miniextensions.com/form/AoiNNU86OcrkqYK7dnbw/`}>
		  			<Button type="primary" style={{ float:'right', marginBottom: '10px', marginRight: '8px' }}>
		  				New Replenishment
		  			</Button>
	  			</a> */ }

				<iframe class="airtable-embed" src={
					UserProfile.isViewOnly() ? "https://airtable.com/embed/shrOI0DZXUxv3Ujsq?backgroundColor=red&viewControls=off"
					: "https://airtable.com/embed/shrOI0DZXUxv3Ujsq?backgroundColor=red&viewControls=on"
				} frameborder="0" onmousewheel="" width="100%" height="533" style={{background: 'transparent', border: '1px solid #ccc'}}></iframe>
			</DashboardLayout>
		)
	}
}

export default List;