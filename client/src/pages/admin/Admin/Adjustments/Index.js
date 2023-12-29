import React, { Component } from 'react';
import DashboardLayout from '../../../../layouts/DashboardLayout';
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
				  <h2>Input</h2>

				  <Row gutter={32}>
			        <Col span={12} style={{ textAlign: 'center' }}>
			        	<Link to="/admin/adjustments/stock-levels">
			        		<Button type="primary" style={myStyle}>Stock Levels</Button>
			        	</Link>
			        </Col>

			        <Col span={12} style={{ textAlign: 'center' }}>
			        	<Link to="/admin/adjustments/prices">
			        		<Button type="primary" style={myStyle}>Prices</Button>
			        	</Link>
			        </Col>
			      </Row>
				</div>
			</DashboardLayout>
		)
	}
}

export default Input;