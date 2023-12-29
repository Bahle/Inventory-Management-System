import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

var myStyle = {
	width: '100%',
	height: '150px',
	fontSize: '18px'
}

class Reports extends Component {
	render() {
		return (
			<DashboardLayout>
				<div>
				  <h2>Reports</h2>

				  <Row gutter={32}>
			        <Col span={8} style={{ textAlign: 'center' }}>
			        	<Link to="/reports/suppliers">
			        		<Button type="primary" style={myStyle}>Suppliers</Button>
			        	</Link>
			        </Col>

			        <Col span={8} style={{ textAlign: 'center' }}>
			        	<Link to="/reports/customers">
			        		<Button type="primary" style={myStyle}>Customers</Button>
			        	</Link>
			        </Col>

			        <Col span={8} style={{ textAlign: 'center' }}>
			        	<Link to="/reports/products">
			        		<Button type="primary" style={myStyle}>Products</Button>
			        	</Link>
			        </Col>
			      </Row>
				</div>
			</DashboardLayout>
		)
	}
}

export default Reports;