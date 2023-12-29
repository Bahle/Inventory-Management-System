import React, { Component } from 'react';
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import UserProfile from '../../UserProfile'
import { SERVER_URL } from '../../constants'

const FormItem = Form.Item;

// var server = 'http://localhost:5000'; // put this in a file called constants

class NormalLoginForm extends Component {
  state = {
  	toDashboard: false,
  	loginError: false
  }

  handleSubmit = (e) => {
    e.preventDefault();

     this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

      axios.post('/sign-in', {
    		username: values.username,
    		password: values.password
    	}).then((response) => {
    		console.log('Received from server: ' + JSON.stringify(response.data));

        var privilege = response.data.privileges;
        /*if(values.username == 'mohale.ntheko@gmail.com')
          privilege = 2; //'Clerk';
        else if(values.username == 'khabele.mohau@gmail.com')
          privilege = 1; //'View';
        else if(values.username == 'mohale.tau@gmail.com')
          privilege = 4; //'Warehouse';
        else
          privilege = 3; //Admin';*/

    		if(response.data.status === 1) {
    			UserProfile.setName(values.username);
          UserProfile.setPrivileges(privilege);
				this.setState(() => ({
			        toDashboard: true
			    }));
    		} else {
    			this.setState(() => ({
		        	loginError: true
		      	}));
    		}
    	}).catch((err) => {
    		console.log(err);
        this.setState({serverError: true})
    	});
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    
    if (this.state.toDashboard === true) {
      return <Redirect to='/' />
    }

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>

        {this.state.loginError && <div style={{color: 'red'}}>Incorrect email and/or password.</div>}
        {this.state.serverError && <div style={{color: 'red'}}>Could not reach the server. Please contact your administrator.</div>}

        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class SignIn extends Component {
	render() {
		return (
			<div id="login-container">
				<div style={{ marginTop: -80 }}>
          <Icon type="solution" style={{ fontSize: 42, margin: 10 }} />
  				<h3>Inventory Management System</h3>
  				<Card bordered={true} style={{ width: 350, margin: 'auto' }}>
  					<WrappedNormalLoginForm />
  				</Card>
        </div>
	   </div>
		)
	}
}

export default SignIn;