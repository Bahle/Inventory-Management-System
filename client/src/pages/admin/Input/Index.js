import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import UserProfile from '../../../UserProfile';

var myStyle = {
	width: '100%',
	height: '150px',
	fontSize: '18px'
}

class Input extends Component {
	render() {
		return (
			<DashboardLayout>
				<div>
				  <h2>Input</h2>

				  <Row gutter={32}>
			        <Col span={8} style={{ textAlign: 'center' }}>
			        	<Link to="/suppliers">
			        		<Button type="primary" style={myStyle}>Suppliers</Button>
			        	</Link>
			        </Col>

			        { !UserProfile.isViewOnly() && <Col span={8} style={{ textAlign: 'center' }}>
			        	<Link to="/customers">
			        		<Button type="primary" style={myStyle}>Branches</Button>
			        	</Link>
			        </Col> }

			        <Col span={8} style={{ textAlign: 'center' }}>
			        	<Link to="/products">
			        		<Button type="primary" style={myStyle}>Products</Button>
			        	</Link>
			        </Col>

			        { !UserProfile.isViewOnly() && <Col span={8} style={{ textAlign: 'center', marginTop: 24 }}>
			        	<Link to="/manual-stock-entry">
			        		<Button type="primary" style={myStyle}>Manual Stock Entry</Button>
			        	</Link>
			        </Col> }
			      </Row>
				</div>
			</DashboardLayout>
		)
	}
}

export default Input;