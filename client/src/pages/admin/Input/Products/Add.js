import React, { Component } from 'react';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import { SERVER_URL } from '../../../../constants';
import { Table, Divider, Tag } from 'antd';

// name, description, type, pack_size, barcode, strength
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Description',
  dataIndex: 'description',
  key: 'description',
}, {
  title: 'Type',
  dataIndex: 'type',
  key: 'type',
}, {
  title: 'Pack Size',
  key: 'pack_size',
  dataIndex: 'pack_size'
}, {
  title: 'Barcode',
  key: 'barcode',
  dataIndex: 'barcode'
}, {
  title: 'Strength',
  key: 'strength',
  dataIndex: 'strength'
}];

const data = [{
  key: '1',
  name: 'John Brown',
  description: 32,
  type: 'ABC',
  pack_size: '30mg',
  barcode: '610000231',
  strength: 'Very Strong'
}, {
  key: '2',
  name: 'John Brown',
  description: 32,
  type: 'ABC',
  pack_size: '30mg',
  barcode: '610000231',
  strength: 'Very Strong'
}, {
  key: '3',
  name: 'John Brown',
  description: 32,
  type: 'ABC',
  pack_size: '30mg',
  barcode: '610000231',
  strength: 'Very Strong'
}];

class Import extends Component {
	render() {
		return (
			<DashboardLayout title='Add New Records'>
        <Table columns={columns} dataSource={data} />
			</DashboardLayout>
		)
	}
}

export default Import;