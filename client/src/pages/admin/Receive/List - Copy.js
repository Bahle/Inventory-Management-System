import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Table, Divider, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../../constants'
import './index.css';

class DeleteLink extends Component {
	state = {
		refreshPage: false
	}

	handleClick(e) {
		e.preventDefault();

		if( window.confirm('Are you sure you want to delete this record?') ) {
			axios.delete(SERVER_URL + `/${this.props.Table}?id=${this.props.id}`).then(response => {
				alert('Record deleted successfully!');
				window.location.reload();
			})
			.catch(error => console.log(error));
		}
	}

	render() {
		return (
			<a href={'./d/' + this.props.Table + 's/' + this.props.id} style={{color:'red'}} onClick={this.handleClick.bind(this)}>Delete</a>
		)
	}
}

class List extends Component {
	state = {
		tableLoading: true,
		tableData: []
	}

	// for some resone total gets truncated e.g. 27.6 
	columns = [{
	  title: 'Supplier',
	  dataIndex: 'name',
	  key: 'name',
	  render: text => <a href="javascript:;">{text}</a>,
	}, {
	  title: 'Total',
	  dataIndex: 'total',
	  key: 'total',
	  render: (text) => <span>{text === null ? '0.00' : new Number(text).toFixed(2)}</span>
	}, {
	  title: 'Date',
	  dataIndex: 'date_issued',
	  key: 'date_issued',
	}, {
	  title: 'Action',
	  key: 'action',
	  render: (text, record) => (
	    <span>
	      <Link to={'/receive/v/' + record.product_receive_id}>View</Link>
	      <Divider type="vertical" />
	      <DeleteLink Path={'/receive'} Table={'receive'} id={record.product_receive_id} />
	    </span>
	  ),
	}];

	componentWillMount() {
		axios.get(SERVER_URL + '/receive')
			.then((response) => {
				console.log('got response: ' + JSON.stringify(response.data));

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
				<div style={{ position: 'relative', zIndex: 10 }}>
		  			<Link to={'/receive/import'}>
			  			<Button type="primary" style={{ float:'right', marginBottom: '10px', marginLeft: '8px' }}>
			  				Import From Excel
			  			</Button>
			  		</Link>

			  		<Link to="/receive/new">
			  			<Button type="primary" style={{ float:'right', marginBottom: '10px' }}>
			  				New Replenishment
			  			</Button>
		  			</Link>
		  		</div>

		  		<Table columns={this.columns} dataSource={this.state.tableData} loading={this.state.tableLoading} />
			</DashboardLayout>
		)
	}
}

export default List;