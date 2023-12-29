import React, { Component } from 'react';
import View from '../../../components/View';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Table, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;

class ExpandedTable extends Component {
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
  ];

  dataSource = [
	  {
	    key: '1',
	    name: 'Panado',
	    quantity: 32,
	  },
	  {
	    key: '2',
	    name: 'Mybulen',
	    quantity: 28,
	  },
	  {
	    key: '3',
	    name: 'Dichlotop',
	    quantity: 60,
	  },
	  {
	    key: '4',
	    name: 'Aspirin',
	    quantity: 25,
	  },
	];

  	render () {
    	return (
    		<div>
    			<h3>Details <div style={{float: 'right'}}><Button>Confirm</Button></div></h3> 
	    		<Table style={{border: 'solid thin #c8c8c8', backgroundColor: 'white'}} columns={this.columns} dataSource={this.dataSource} rowSelection={{}} loading={false} pagination={false} />
	    	</div>
	    )
    }
}

export default class App extends Component {
  columns = [
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Total items',
      dataIndex: 'totalItems',
      key: 'totalItems',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <div>{text == 'Pending' ? <span style={{color: 'orange'}}>Complete</span> : <span style={{color: 'orangered'}}>{text}</span> }</div>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => <Link to="/distributions/new"><Button type="text">Confirm</Button></Link>
    },
  ];

  dataSource = [
	  {
	    key: '1',
	    branch: 'Kingsway',
	    totalItems: 32,
	    date: '09/10/2020',
	    status: 'Pending',
	  },
	  {
	    key: '2',
	    branch: 'LNDC',
	    totalItems: 42,
	    date: '03/10/2020',
	    status: 'Pending',
	  },
	  {
	    key: '3',
	    branch: 'Kingsway',
	    totalItems: 32,
	    date: '02/10/2020',
	    status: 'Pending',
	  },
	  {
	    key: '4',
	    branch: 'LNDC',
	    totalItems: 42,
	    date: '28/09/2020',
	    status: 'Partial',
	  },
	  {
	    key: '5',
	    branch: 'Kingsway',
	    totalItems: 32,
	    date: '21/09/2020',
	    status: 'Partial',
	  },
	  {
	    key: '6',
	    branch: 'LNDC',
	    totalItems: 42,
	    date: '13/09/2020',
	    status: 'Partial',
	  },
	];

  render () {
    return (
    	  /* expandedRowRender={record => <ExpandedTable />} */
          <Table style={{ marginTop: 20 }} columns={this.columns} dataSource={this.dataSource} loading={false} expanded={true} />
		)
	}
}