import React, { Component } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import axios from 'axios';
import { SERVER_URL } from '../constants';
import { fieldLabel } from '../utils';
import { Form, Input, Select, Col, Row, Button, Radio, Breadcrumb, Icon, InputNumber } from 'antd';
import { Link, Redirect } from 'react-router-dom'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton  = Radio.Button;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class MyForm extends Component {
	state = {
		toDetails: false,
		...this.props.Data
	}

	id = window.location.pathname.split('/')[5];

	componentWillMount() {
		/*if( this.state.supplier_id === undefined ) {
			axios.get(SERVER_URL + `/supplier?id=${this.id}`)
				.then(response => {
					console.log('Got from server: ' + JSON.stringify(response.data[0]));

					this.setState(response.data[0])
				})
				.catch(error => console.log(error));
		}*/
	}

	componentDidMount() {
		if( this.state[`${this.props.Table}_id`] === undefined ) { // .supplier_id
			console.log(SERVER_URL + `/${this.props.Table}?id=${this.id}`);

			axios.get(SERVER_URL + `/${this.props.Table}?id=${this.id}`)
				.then(response => {
					console.log('response.data', response.data[0]);
					this.props.form.setFieldsValue(response.data[0]);
				})
				.catch(error => console.log(error));
		} else {
			this.props.form.setFieldsValue(this.state);
		}
	}

	handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }

        var params = {};
        params['id'] = this.id;

        for(let item in this.props.Fields) {
        	params[item.name] = values[item.name];
        }

        this.props.Fields.forEach(item => params[item.name] = values[item.name]);

        axios.put(SERVER_URL + `/${this.props.Table}`, params).then((response) => {
        	if(response.data.results == 'success') {
        		alert('Supplier updated successfully!');
      		
      		this.setState({toDetails: true});
        	}
        }).catch((error) => {
        	console.log(error);
        })
      });
    }

	render() {
	  	const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

	  	if( this.state.toDetails === true ) {
	  		return <Redirect to={`../v/${this.id}`} />
	  	}

	  	const prefixSelector = getFieldDecorator('prefix', {
	  	      initialValue: '266',
	  	    })(
	  	      <Select style={{ width: 80 }}>
	  	        <Option value="266">+266</Option>
	  	        <Option value="27">+27</Option>
	  	      </Select>
	  	    );

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
		          	}
  				})
	  		 }

    	    <div style={{ display: 'inline-block', width: '100%', clear: 'both', marginTop: '5px', paddingTop: '5px' }}>
			    <Col span={24}>
			    	<FormItem style={{ float: 'right' }}>
        	          <Button
        	          	size="large"
        	            type="primary"
        	            htmlType="submit"
        	            disabled={hasErrors(getFieldsError())}
        	            style={{ float: 'right', width: '170px', margin: '0 10px' }}
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

class Edit extends Component {
	Data = null

	componentWillMount() {
		this.Data = this.props.location === undefined ? {} : this.props.location.state;
		// console.log('passed state is ' + JSON.stringify(this.props.location.state));
	}

	render() {
		var folders = window.location.pathname;
		// remove starting /
		if(folders[0] === '/') folders = folders.substring(1, folders.length);

		// remove ending / if any
		if(folders[folders.length-1] === '/') folders = folders.substring(0, folders.length-1);
		folders = folders.split('/');

		var fullPath = '/' + this.props.Root;

		return (
			<DashboardLayout title={this.props.Title}>
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
				<WrappedForm Table={this.props.Table} Fields={this.props.Fields} Data={this.Data}  />
			</DashboardLayout>
		)
	}
}

export default Edit;