import React, { Component } from 'react';
import View from '../../../../components/View';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import { Table, Form, Input } from 'antd';

export default class App extends Component {
  state = { searched: false }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Selling price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Stock Level',
      dataIndex: 'stockLevel',
      key: 'stockLevel',
      render: (text) => text >= 40 ? <span style={{color:'green'}}>Adequate</span> : (text >= 20 ? <span style={{color: 'orange'}}>Medium</span> : <span style={{color: 'red'}}>Critical</span>)
    },
  ];

  dataSource = [
	  {
	    key: '1',
	    name: 'Panado',
	    quantity: 32,
	    price: '1200',
      branch: 'LDNC',
	    stockLevel: 40
	  },
	  {
	    key: '2',
	    name: 'Mybulen',
	    quantity: 42,
	    price: '600',
      branch: 'Kingsway',
	    stockLevel: 20
	  },
	  {
	    key: '3',
	    name: 'Dichlotop',
	    quantity: 42,
	    price: '2300',
      branch: 'LDNC',
	    stockLevel: 20
	  },
	  {
	    key: '4',
	    name: 'Aspirin',
	    quantity: 42,
	    price: '1800',
      branch: 'Kingsway',
	    stockLevel: 10
	  },
	];
  
  handleSearch(e) {
  	this.setState({searched: true})
  }

  render () {
    return (
      <DashboardLayout title={ this.props.Title }>
      	  <h1>Product Search</h1>
      	  <Input.Search placeholder="Please enter the product name, product code or barcode" onSearch={this.handleSearch.bind(this)} style={{height: 50, width: '50%'}} />
          { this.state.searched && <Table style={{ marginTop: 20 }} columns={this.columns} dataSource={this.dataSource} loading={false} /> }
      </DashboardLayout>
		)
	}
}