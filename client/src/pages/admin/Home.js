import React, { Component } from 'react';
import { Breadcrumb } from 'antd'
import { Row, Col, Alert, Card, Table } from 'antd';
import HomeRequisitionsTable from './HomeRequisitionsTable';
import HomeStockTable from './HomeStockTable';
import { Redirect } from 'react-router-dom';
import '../../css/Layout.css';
import UserProfile from '../../UserProfile';

import DashboardLayout from '../../layouts/DashboardLayout';

class Home extends Component {
  render() {
  	const CLERK = 2, VIEW = 1, WAREHOUSE = 4, ADMIN = 3;
    const privileges = UserProfile.getPrivileges();

    return (
      <DashboardLayout>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          { false && privileges == WAREHOUSE && <div>
	          <Alert message="Mybulen quantity low - 120" type="warning" closeText="Order Now" onClose={() => window.location = '/orders/1' } />
	          <Alert message="Mybulen quantity low - 80" type="warning" closeText="Order Now" onClose={() => window.location = '/orders/1' } />
	          <Alert message="Mybulen very low - 60" type="error" closeText="Order Now" onClose={() => window.location = '/orders/1' } />
	      </div> }

	      <h2>Stock Inventory Levels</h2>

	      <iframe class="airtable-embed" src="https://airtable.com/embed/shroHOcLBSxguA83K?backgroundColor=red&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style={{background: 'transparent', border: '1px solid #ccc'}}></iframe>
	      
          {/*<div style={{ marginTop: 40 }}>
          	<Row gutter={16}>
	          	<Col span={12} style={{ marginTop: 20 }}>
		          <Card title="Stock Quantities" bordered={true}>
		            <HomeStockTable />
		          </Card>
		        </Col>

		        <Col span={12} style={{ marginTop: 20 }}>
		          <Card title="Stock Churn" bordered={true}>
		            <img src="/images/sales.png" width="100%" />
		          </Card>
		        </Col>
		    </Row>
	      </div>*/}
        </div>
      </DashboardLayout>)
  }
}

export default Home;