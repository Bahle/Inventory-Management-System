import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

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
				  <h2>Admin</h2>

				  <Row gutter={32}>
			        <Col span={12} style={{ textAlign: 'center' }}>
			        	<Link to="/admin/users">
			        		<Button type="primary" style={myStyle}>User Accounts</Button>
			        	</Link>
			        </Col>

			        <Col span={12} style={{ textAlign: 'center' }}>
			        	<Link to="/admin/adjustments">
			        		<Button type="primary" style={myStyle}>Adjustments</Button>
			        	</Link>
			        </Col>
			      </Row>
				</div>
			</DashboardLayout>
		)
	}
}

export default Input;