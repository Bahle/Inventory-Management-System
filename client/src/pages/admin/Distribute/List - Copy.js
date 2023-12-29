import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Table, Divider, Button, Icon, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../../constants'
import Orders from './Orders';

const { TabPane } = Tabs;

class DeleteLink extends Component {
	state = {
		refreshPage: false
	}

	handleClick(e) {
		e.preventDefault();

		if( window.confirm('Are you sure you want to delete this record?') ) {
			alert(SERVER_URL + `/${this.props.Table}?id=${this.props.id}`);
			return;

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
	  title: 'Customer',
	  dataIndex: 'name',
	  key: 'name',
	  render: text => <a href="javascript:;">{text}</a>,
	}, {
	  title: 'Total',
	  dataIndex: 'total_retail',
	  key: 'total_retail',
	  render: (text) => <span>{text === null ? '0.00' : new Number(text).toFixed(2)}</span>
	}, {
	  title: 'Date',
	  dataIndex: 'date_distributed',
	  key: 'date_distributed',
	}, {
	  title: 'Action',
	  key: 'action',
	  render: (text, record) => (
	    <span>
	      <Link to={'/distributions/v/' + record.distribution_id}><Button>View</Button></Link>
	      {/*<Divider type="vertical" />
	      <DeleteLink Path={'/distributions'} Table={'distribution'} id={record.distribution_id} />*/}
	    </span>
	  ),
	}];

	componentWillMount() {
		axios.get(SERVER_URL + '/distribution')
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
			<DashboardLayout title="Stock Distribution">
				{ <div style={{ position: 'relative', zIndex: 10 }}>
		  			<Link to="/distributions/new">
			  			<Button type="primary" style={{ float:'right', marginBottom: '10px' }}>
			  				New Distribution
			  			</Button>
			  		</Link>
		  		</div>  }

		  		<Tabs
		          hideAdd
		          onChange={() => {}}
		          /*activeKey={activeKey}*/
		          type="editable-card"
		          onEdit={() => {}}
		          style={{clear: 'both'}}
		        >
			        <TabPane tab="Pending Orders" style={{padding: '0 20px'}}>
			  			<Orders />
			  		</TabPane>
			  		<TabPane tab="Distribution History">
			  			<Table columns={this.columns} dataSource={this.state.tableData} loading={this.state.tableLoading} />
			  		</TabPane>
		  		</Tabs>
			</DashboardLayout>
		)
	}
}

export default List;