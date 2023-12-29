import React, { Component } from 'react';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import axios from 'axios';
import { SERVER_URL } from '../../../../constants';
import { Form, Input, Select, Col, Row, Button, Radio, Breadcrumb, Icon } from 'antd';
import { Redirect, Link } from 'react-router-dom'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton  = Radio.Button;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class MyForm extends Component {
	state = {}

	id = window.location.pathname.split('/')[5];

	componentDidMount() {
			axios.get(SERVER_URL + `/supplier?id=${this.id}`)
				.then(response => {
					// console.log('Got from server: ' + JSON.stringify(response.data[0]));

					this.setState(response.data[0])
				})
				.catch(error => console.log(error));
	}

	render() {
	  	const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
	    return (
	      <Form layout="inline" onSubmit={this.handleSubmit}>
	      	<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
		      	<Col span={24}>
			      	<FormItem
			          label="Supplier">
			          	<h4>{this.state.name}</h4>
			        </FormItem>
			    </Col>
		    </div>

		    <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
		      	<Col span={24}>
			      	<FormItem
			          label="Account #">
			          	<h4>{this.state.account_no}</h4>
			        </FormItem>
			    </Col>
		    </div>

	        <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
	          	<Col span={24}>
	    	      	<FormItem
	    	          label="City">
	    	          <h4>{this.state.city}</h4>
	    	        </FormItem>
	    	    </Col>
	        </div>

            <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
              	<Col span={24}>
        	      	<FormItem
        	          label="Tel. #">
        	          <h4>{this.state.tel_no}</h4>
        	        </FormItem>
        	    </Col>
            </div>

            <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
              	<Col span={24}>
        	      	<FormItem
        	          label="Do they charge VAT?"
        	        >
	        	        <h4>{this.state.vat ? "Yes" : "No"}</h4>
        	        </FormItem>
        	    </Col>
            </div>

            <div style={{ display: 'inline-block', width: '100%' }}>
            	<Link to={{ pathname: `../e/${this.id}`, state: this.state }} >
            		<Button type="primary" size="large" style={{ float: 'right', width: '120px', margin: '0 5px' }}>Edit</Button>
            	</Link>
            	<Link to="./"><Button type="default" size="large" style={{ float: 'right', width: '120px', margin: '0 5px' }}>Cancel</Button></Link>
            </div>
	      </Form>
	      )
	}
}

const WrappedForm = Form.create()(MyForm);

class Supplier extends Component {
	render() {
		return (
			<DashboardLayout title="Supplier details">
				<Breadcrumb>
				    <Breadcrumb.Item><Link to="/a"><Icon type="home" /> Home</Link></Breadcrumb.Item>
				    <Breadcrumb.Item><Link to="/a/input"> Input</Link></Breadcrumb.Item>
				    <Breadcrumb.Item><Link to="/a/input/suppliers"> Suppliers</Link></Breadcrumb.Item>
				    <Breadcrumb.Item>Details</Breadcrumb.Item>
				  </Breadcrumb>

				<WrappedForm />
			</DashboardLayout>
		)
	}
}

export default Supplier;