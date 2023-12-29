import React, { Component } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Table, Divider, Button, Breadcrumb, Icon } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../constants';

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

let action = '', actions = '';

class List extends Component {
	state = {
		tableLoading: true,
		tableData: []
	}

	extraActions = this.props.ExtraActions

	columns = [...this.props.Columns, {
	  title: 'Action',
	  key: 'action',
	  render: (text, record) => {const tableId = record[ this.props.Table + '_id' ]; const path = `${this.props.Path}/${this.props.RouteName ? this.props.RouteName : this.props.Table}`;return (
	    <span>
	      { this.extraActions && (() => action = this.extraActions.find(a => a.index == 0))() && <span><Link to={`${path}s${action.route}/${tableId}`}><span style={{color: action.colour}}>{action.text}</span></Link><Divider type="vertical" /></span> }
	      { this.props.ExcludeDefaultActions !== true && <div><Link to={ `${path}s/v/${tableId}` }>View</Link>
	      <Divider type="vertical" /></div> }
	      { this.extraActions && (() => action = this.extraActions.find(a => a.index == 1))() && <span><Link to={`${path}s${action.route}/${tableId}`}><span style={{color: action.colour}}>{action.text}</span></Link><Divider type="vertical" /></span> }
	      { this.props.ExcludeDefaultActions !== true && <div><Link to={ `${path}s/e/${tableId}` }><span style={{color:'green'}}>Edit</span></Link>
	      <Divider type="vertical" /></div> }
	      {  this.extraActions && (() => action = this.extraActions.find(a => a.index == 2))() && <span><Link to={`${path}s${action.route}/${tableId}`}><span style={{color: action.colour}}>{action.text}</span></Link><Divider type="vertical" /></span>  }
	      { this.props.ExcludeDefaultActions !== true && <DeleteLink Path={this.props.Path} Table={this.props.Table} id={record[ this.props.Table + '_id' ]} /> }
	      { this.extraActions && (() => actions = this.extraActions.filter(a => a.index > 2))() && <span>
	      	{ actions.map(action => {
	      		return (<span key={action.text}>
		      		<Divider type="vertical" />
		      		<Link to={`${path}s${action.route}/${tableId}`}><span style={{color: action.colour}}>{action.text}</span></Link>
		      	</span>)
	      	}) }
	      </span> }
	    </span>
	  )},
	}];

	componentWillMount() {
		console.log('Running ', SERVER_URL + '/' + this.props.Table);

		axios.get(SERVER_URL + '/' + this.props.Table)
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
			<DashboardLayout title={this.props.Title}>
				<div style={{ position: 'relative', zIndex: 10 }}>
		  			<Link to={`${this.props.Path}/${this.props.RouteName ? this.props.RouteName : this.props.Table}s/new`}>
			  			{ !this.props.HideExtraButton && <Button type="primary" style={{ float:'right', marginBottom: '10px' }}>
			  				Add Record
			  			</Button> }
		  			</Link>
		  			{
		  				this.props.ExtraButtons === undefined ? <span></span> : this.props.ExtraButtons.map(button => {
		  					return (<Link key={button.text} to={button.href}>
		  						<Button type="primary" style={{ float:'right', marginBottom: '10px', marginRight: '8px' }}>{button.text}</Button>
		  					</Link>)
		  				})
		  			}
		  		</div>

		  		<Table columns={this.columns} dataSource={this.state.tableData} loading={this.state.tableLoading} />
			</DashboardLayout>
		)
	}
}

export default List;