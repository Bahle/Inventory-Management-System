import React, { Component, Fragment } from 'react';
import DashboardMenu from '../components/DashboardMenu';

import logo from '../logo.svg';
import '../css/Layout.css';
import { Layout, Menu, Icon, Card, Col, Breadcrumb } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import UserProfile from '../UserProfile';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const MenuItemGroup = Menu.ItemGroup;

class DashboardLayout extends Component {
	constructor(props) {
		super(props)
		this.props = UserProfile.getPrivileges()

      	const CLERK = 'Clerk', VIEW = 'View', WAREHOUSE = 'Warehouse', ADMIN = 'Admin';
      	const privileges = UserProfile.getPrivileges();

      	this.dynamicLinks = '';

		if(privileges == CLERK) {
			this.dynamicLinks = this.branchLinks;
		} else if(privileges == WAREHOUSE) {
			this.dynamicLinks = this.warehouseLinks;
		} else if(privileges == ADMIN) {
			this.dynamicLinks = this.adminLinks;
		} else if(privileges == VIEW) {
			this.dynamicLinks = this.viewLinks;
		} else {
			// cater for view only later!
		}
	}

	warehouseLinks = <Menu mode="horizontal" defaultSelectedKeys={this.selectedMenuItem} style={{ lineHeight: '64px' }}>
		<Menu.Item key="1"><Link to="/"><Icon type="home" /> Home</Link></Menu.Item>
		<Menu.Item key="2"><Link to="/orders"><Icon type="home" /> Orders</Link></Menu.Item>
		<Menu.Item key="3"><Link to="/receive"><Icon type="database" /> Receive</Link></Menu.Item>
		<Menu.Item key="4"><Link to="/distributions"><Icon type="home" /> Distributions</Link></Menu.Item>
		<Menu.Item key="5"><Link to="/customers"><Icon type="home" /> Branches</Link></Menu.Item>
		<Menu.Item key="6"><Link to="/input"><Icon type="home" /> Input</Link></Menu.Item>
		<Menu.Item key="7"><Link to="/daily-sales"><Icon type="home" /> Daily Sales</Link></Menu.Item>
		<Menu.Item key="9"><Link to="/reports"><Icon type="home" /> Reports</Link></Menu.Item>
		<Menu.Item key="10" className="sm-visible" style={{ float: 'right' }}> <Link to="/logout"><Icon type="setting" /> Log Out </Link></Menu.Item>
	</Menu>

	adminLinks = <Menu mode="horizontal" defaultSelectedKeys={this.selectedMenuItem} style={{ lineHeight: '64px' }}>
		<Menu.Item key="1"><Link to="/"><Icon type="home" /> Home</Link></Menu.Item>
		
		<Menu.Item key="9"><Link to="/orders"><Icon type="home" /> Orders</Link></Menu.Item>
		<Menu.Item key="10"><Link to="/receive"><Icon type="database" /> Receive</Link></Menu.Item>
		<Menu.Item key="11"><Link to="/distributions"><Icon type="home" /> Distributions</Link></Menu.Item>
		<Menu.Item key="7"><Link to="/daily-sales"><Icon type="home" /> Daily Sales</Link></Menu.Item>
		
		<Menu.Item key="4"><Link to="/reports"><Icon type="home" /> Reports</Link></Menu.Item>
		<Menu.Item key="6"><Link to="/input"><Icon type="home" /> Input</Link></Menu.Item>
		<Menu.Item key="5"><Link to="/admin"><Icon type="home" /> Admin</Link></Menu.Item>
		
		<Menu.Item key="8" className="sm-visible" style={{ float: 'right' }}> <Link to="/logout"><Icon type="setting" /> Log Out </Link></Menu.Item>
	</Menu>

	viewLinks = <Menu mode="horizontal" defaultSelectedKeys={this.selectedMenuItem} style={{ lineHeight: '64px' }}>
		<Menu.Item key="1"><Link to="/"><Icon type="home" /> Home</Link></Menu.Item>
		<Menu.Item key="2"><Link to="/orders"><Icon type="home" /> Orders</Link></Menu.Item>
		<Menu.Item key="3"><Link to="/receive"><Icon type="database" /> Receive</Link></Menu.Item>
		<Menu.Item key="4"><Link to="/distributions"><Icon type="home" /> Distributions</Link></Menu.Item>
		<Menu.Item key="5"><Link to="/customers"><Icon type="home" /> Branches</Link></Menu.Item>
		<Menu.Item key="6"><Link to="/input"><Icon type="home" /> Input</Link></Menu.Item>
		<Menu.Item key="7"><Link to="/daily-sales"><Icon type="home" /> Daily Sales</Link></Menu.Item>
		<Menu.Item key="9"><Link to="/reports"><Icon type="home" /> Reports</Link></Menu.Item>
		<Menu.Item key="10" className="sm-visible" style={{ float: 'right' }}> <Link to="/logout"><Icon type="setting" /> Log Out </Link></Menu.Item>
    </Menu>

	state = {
		loggedIn: UserProfile.getName() !== null
	}
	
	selectedMenuItem;

	componentWillMount() {
		switch(window.location.href.split('/')[4]) {
			case '':
				this.selectedMenuItem = ['1'];
				break;
			case 'receive':
				this.selectedMenuItem = ['2'];
				break;
			case 'distributions':
				this.selectedMenuItem = ['3'];
				break;
			case 'input':
				this.selectedMenuItem = ['4'];
				break;
			case 'reports':
				this.selectedMenuItem = ['5'];
				break;
			case 'admin':
				this.selectedMenuItem = ['6'];
		}
	}

	componentDidMount() {

	}

	render() {
		if (this.state.loggedIn === false) {
		  alert('User not signed in. Redirecting to the login page.');

		  return <Redirect to='/sign-in' />
		}

		var folders = window.location.pathname;
		// remove starting /
		if(folders[0] === '/') folders = folders.substring(1, folders.length);

		// remove ending / if any
		if(folders[folders.length-1] === '/') folders = folders.substring(0, folders.length-1);
		folders = folders.split('/');

		var fullPath = (this.props.Root == '' || this.props.Root === undefined ? '' : '/' + this.props.Root);

		/*
		branch: home, products, requisitions, reports -
		warehouse: home, requisitions, receive, distributions, suppliers, stock, reports -
		admin: home, branches, suppliers, reports, admin -
		*/

		return(
			<Layout>
			  <Header style={{ position: 'fixed', width: '100%', zIndex: 10 }}>
			    <div className="logo" />
			    
			    
				  { /*<Menu.Item key="2"><Link to="/receive"><Icon type="database" /> Receive</Link></Menu.Item>
			      <Menu.Item key="3"><Link to="/distributions"><Icon type="shopping-cart" /> Distributions</Link></Menu.Item>
				  { UserProfile.getPrivileges() >= 2 ? <Menu.Item key="4"><Link to="/input"><Icon type="desktop" /> Input</Link></Menu.Item> : <span></span> }
				  <Menu.Item key="5"><Link to="/reports"><Icon type="shop" /> Reports</Link></Menu.Item> */ }

				  { this.dynamicLinks }
			      
			      { /* UserProfile.getPrivileges() == 3 ? <Menu.Item key="6"><Link to="/admin"><Icon type="setting" /> Admin</Link></Menu.Item> : <span></span>*/ }
			      
			    
			  </Header>
			  <Content style={{ padding: '20px 0px', marginTop: 64 }}>
			  	  <Col xs={{ span:24, offset: 0 }} sm={{ span:24, offset: 0 }} lg={{ span:22, offset: 1 }} md={{ span:22, offset: 1 }}>
			  		 <Card title={this.props.title} style={{ width: '100%' }}>
			  			<Breadcrumb>
			  				<Breadcrumb.Item><Link to={`/${this.props.Root}`}><Icon type="home" /> Home</Link></Breadcrumb.Item>
			  				{
			  					folders.map((item, index) => {
			  						if(item == 'a' || item == 'v' || item == 'e' || !isNaN(item)) return;

			  						fullPath += '/' + item;

			  						if((index+1) != folders.length) {
			  							// ignore if Root because it is already displayed by default
			  							if(item != this.props.Root) {
			  								// Uppercase first letter
			  								return <Breadcrumb.Item key={item}><Link to={fullPath}> {item[0].toUpperCase() + item.substr(1, item.length)}</Link></Breadcrumb.Item>
			  							}
			  						} else {
			  							return <Breadcrumb.Item key={item}>{item[0].toUpperCase() + item.substr(1, item.length)}</Breadcrumb.Item>
			  						}
			  					})
			  				}
			  			</Breadcrumb>
			  			<br/>
			  			{this.props.children}
			  		</Card>
			  	  </Col>
		      </Content>

		      <Footer style={{ textAlign: 'center' }}>
		        Pharmacy System © { new Date().getFullYear() }
		      </Footer>
		    </Layout>
		)
	}
}

DashboardLayout.defaultProps = {
	Root: ''
}

export default DashboardLayout;