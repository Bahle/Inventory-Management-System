import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Table, Divider, Button, Icon, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../../constants'
import Orders from './Orders';
import UserProfile from '../../../UserProfile';

const { TabPane } = Tabs;

class List extends Component {
	render() {
		return (
			<DashboardLayout title="Stock Distribution">
	  			{ !UserProfile.isViewOnly() && <a target="_blank" href={`https://app.miniextensions.com/form/EncekSieEAsywjtrvmVq/`}>
		  			<Button type="primary" style={{ float:'right', marginBottom: '10px', marginRight: '8px' }}>
		  				New Distribution
		  			</Button>
	  			</a> }

				<iframe class="airtable-embed" src={
					UserProfile.isViewOnly() ? "https://airtable.com/embed/shrDdcJbz7jY2ipzA?backgroundColor=red&viewControls=on"
					: "https://airtable.com/embed/shrB1jRvrsXsBNavu?backgroundColor=red&viewControls=on"
				}
					frameborder="0" onmousewheel="" width="100%" height="533" style={{background: 'transparent', border: '1px solid #ccc'}}></iframe>
			</DashboardLayout>
		)
	}
}

export default List;