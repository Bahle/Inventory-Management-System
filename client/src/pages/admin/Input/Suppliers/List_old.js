import React, { Component } from 'react';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import { Table, Divider, Button, Breadcrumb, Icon } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../../../constants';
import './index.css';

/*supplier
date
total
view*/

class DeleteLink extends Component {
	state = {
		refreshPage: false
	}

	handleClick(e) {
		e.preventDefault();

		if( window.confirm('Are you sure you want to delete this supplier?') ) {
			// var supplier_id = this.props.supplier_id;

			axios.delete(SERVER_URL + '/delete-supplier', {
				params: {
					supplier_id: this.props.supplier_id
				}
			}).then(response => {
				this.setState({refreshPage: true})

				// alert('Supplier delete successfully!');
			})
			.catch(error => console.log(error));
		}
	}

	render() {
		if( this.state.refreshPage === true ) {
			return <Redirect to="/a/input/suppliers" />
		}

		return (
			<a href={'./d/supplier/' + this.props.supplier_id} style={{color:'red'}} onClick={this.handleClick.bind(this)}>Delete</a>
		)
	}
}

class List extends Component {
	state = {
		tableLoading: true,
		tableData: []
	}

	columns = [{
	  title: 'Supplier',
	  dataIndex: 'name',
	  key: 'name'
	}, {
	  title: 'Action',
	  key: 'action',
	  render: (text, record) => (
	    <span>
	      <Link to={'/a/input/suppliers/v/' + record.supplier_id}>View</Link>
	      <Divider type="vertical" />
	      <Link to={'/a/input/suppliers/e/' + record.supplier_id}><span style={{color:'green'}}>Edit</span></Link>
	      <Divider type="vertical" />
	      <DeleteLink supplier_id={record.supplier_id} />
	    </span>
	  ),
	}];

	data = [{
	  key: '1',
	  supplier_id: 1,
	  supplier: 'John Brown',
	  total: 'R320.00',
	  date: '20/02/2018',
	}, {
	  key: '2',
	  supplier_id: 2,
	  supplier: 'Jim Green',
	  total: 'R4,200.00',
	  date: '03/04/2018',
	}, {
	  key: '3',
	  supplier_id: 3,
	  supplier: 'Joe Black',
	  total: 'R320.00',
	  date: '05/05/2018',
	}];

	componentWillMount() {
		axios.get(SERVER_URL + '/suppliers')
			.then((response) => {
				this.setState({
					tableLoading: false,
					tableData: response.data
				});
			}).catch((err) => {
				console.log(err);
			})
	}

	render() {
		return (
			<DashboardLayout title="Stock Receive">
				<Breadcrumb>
				    <Breadcrumb.Item><Link to="/a"><Icon type="home" /> Home</Link></Breadcrumb.Item>
				    <Breadcrumb.Item><Link to="/a/input"> Input</Link></Breadcrumb.Item>
				    <Breadcrumb.Item>Suppliers</Breadcrumb.Item>
				  </Breadcrumb>

		  		<div style={{ position: 'relative', zIndex: 10 }}>
		  			<Button type="primary" style={{ float:'right', marginBottom: '10px' }}>
		  				<Link to="/a/input/suppliers/new">Add Supplier</Link>
		  			</Button>
		  		</div>

		  		<Table columns={this.columns} dataSource={this.state.tableData} loading={this.state.tableLoading} />
			</DashboardLayout>
		)
	}
}

export default List;