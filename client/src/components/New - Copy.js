import React, { Component } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import axios from 'axios';
import { SERVER_URL } from '../constants';
import { fieldLabel } from '../utils';
import { Form, Input, InputNumber, Select, Col, Row, Button, Radio, Breadcrumb, Icon } from 'antd';
import { Redirect, Link } from 'react-router-dom'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton  = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class MyForm extends Component {
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	      }

	      var params = {};

	      for(let item in this.props.Fields) {
	      	params[item.name] = values[item.name];
	      }

	      this.props.Fields.forEach(item => params[item.name] = values[item.name]);

	      axios.post(SERVER_URL + `/${this.props.Table}`, params).then((response) => {
	      	if(response.data.results == 'success') {
	      		alert('Record added successfully!');
	      		window.history.back();
	      	}
	      }).catch((error) => {
	      	console.log(error);
	      })
	    });
	  }

	  render() {
	  	const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

	  	const prefixSelector = getFieldDecorator('prefix', {
	  	      initialValue: '266',
	  	    })(
	  	      <Select style={{ width: 80 }}>
	  	        <Option value="266">+266</Option>
	  	        <Option value="27">+27</Option>
	  	      </Select>
	  	    );

	    var fields = [];

	  	return (
	      <Form layout="inline" onSubmit={this.handleSubmit}>
	      	{ this.props.Fields.map((item, index) => {			      	
		          	if( item.type == 'string' ) {
		          		return (
          			  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
          				      	<Col span={24}>
				          			<FormItem label={ fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<Input style={{ width: '360px' }} placeholder={`Please input the ${fieldLabel(item.name)}`} />
				          			)}
				        			</FormItem>
				        		</Col>
	    					</div> )
		          	} else if( item.type == 'integer' ) {
		          		return (
          			  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
          				      	<Col span={24}>
				          			<FormItem label={ fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<InputNumber min={0} style={{ width: '360px' }} placeholder={`Please input the ${fieldLabel(item.name)}`} />
				          			)}
				        			</FormItem>
				        		</Col>
	    					</div> )
		          	} else if( item.type == 'boolean' ) {
		          		return (
          			  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
          				      	<Col span={24}>
				          			<FormItem label={ fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<RadioGroup>
					                        <RadioButton value="1">Yes</RadioButton>
					                        <RadioButton value="0">No</RadioButton>
					                      </RadioGroup>
				          			)}
				        			</FormItem>
				        		</Col>
	    					</div> )
		          	} else if( item.type == 'tel' ) {
		          		return (
          			  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
          				      	<Col span={24}>
				          			<FormItem label={ fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<Input addonBefore={prefixSelector} style={{ width: '360px' }} placeholder={`Please enter the ${fieldLabel(item.name)}`} />
				          			)}
				        			</FormItem>
				        		</Col>
	    					</div> )
		          	} else if( item.type == 'longstring' ) {
		          		return (
          			  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
          				      	<Col span={24}>
				          			<FormItem label={ fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<TextArea Rows={4} style={{ width: '360px' }} placeholder={`Please enter the ${fieldLabel(item.name)}`} />
				          			)}
				        			</FormItem>
				        		</Col>
	    					</div> )
		          	} else if( item.type == 'select' ) {
		          		return (
          			  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
          				      	<Col span={24}>
				          			<FormItem label={ fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<Select style={{ width: '360px' }} placeholder={`Please enter the ${fieldLabel(item.name)}`}>
				          					{
				          						item.values.map(value => <Option value={value}>{value}</Option>)
				          					}
		          				        </Select>
				          			)}
				        			</FormItem>
				        		</Col>
	    					</div> )
		          	}
  				})
	  		 }

    	    <div style={{ display: 'inline-block', width: '100%', clear: 'both', marginTop: '5px', paddingTop: '5px' }}>
			    <Col span={24}>
			    	<FormItem style={{ float: 'right'}}>
	    	          <Button
	    	          	size="large"
	    	            type="primary"
	    	            htmlType="submit"
	    	            disabled={hasErrors(getFieldsError())}
	    	            style={{ float: 'right', width: '170px' }}
	    	          >
	    	            Submit
	    	          </Button>
	    	        </FormItem>

	    	        <FormItem style={{ float: 'right'}}>
	    	          <Link to="../">
	    	          <Button
	    	          	size="large"
	    	            type="default"
	    	            style={{ float: 'right', width: '170px' }}
	    	          >
	    	            Cancel
	    	          </Button>
	    	          </Link>
	    	        </FormItem>
			    </Col>
			</div>
	      </Form>
	      )
	}
}

const WrappedForm = Form.create()(MyForm);

class New extends Component {
	render() {
		var folders = window.location.pathname;
		// remove starting /
		if(folders[0] === '/') folders = folders.substring(1, folders.length);

		// remove ending / if any
		if(folders[folders.length-1] === '/') folders = folders.substring(0, folders.length-1);
		folders = folders.split('/');

		var fullPath = '/' + this.props.Root;

		return (
			<DashboardLayout title={ this.props.Title }>
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
									return <Breadcrumb.Item><Link to={fullPath}> {item[0].toUpperCase() + item.substr(1, item.length)}</Link></Breadcrumb.Item>
								}
							} else {
								return <Breadcrumb.Item>{item[0].toUpperCase() + item.substr(1, item.length)}</Breadcrumb.Item>
							}
						})
					}
				  </Breadcrumb>
				  <br/>
				  <WrappedForm Table={this.props.Table} Fields={this.props.Fields}  />
			</DashboardLayout>
		)
	}
}

export default New;