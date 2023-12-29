import React, { Component } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../constants';
import { fieldLabel } from '../utils';
import { Form, Input, InputNumber, Select, Col, Row, Button, Radio } from 'antd';
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
	state = {
		toDetails: false,
		...this.props.Data
	}

	id = window.location.pathname.split('/')[4];

	componentWillMount() {
		
	}

	componentDidMount() {
		if( this.props.Type == 'Edit' ) {
			if( this.state[`${this.props.Table}_id`] === undefined ) { // .supplier_id
				console.log(SERVER_URL + `/${this.props.Table}?id=${this.id}`);

				axios.get(SERVER_URL + `/${this.props.Table}?id=${this.id}`)
					.then(response => {
						this.props.form.setFieldsValue(response.data[0]);
					})
					.catch(error => console.log(error));
			} else {
				this.props.form.setFieldsValue(this.state);
			}
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

        /* *** duplication? *** */
        for(let item in this.props.Fields) {
        	params[item.name] = values[item.name];
        }

        this.props.Fields.forEach(item => params[item.name] = values[item.name]);

        if( this.props.Type == 'New' ) {
	        axios.post(SERVER_URL + `/${this.props.Table}`, params).then((response) => {
	        	if(response.data.results == 'success') {
	        		alert('Record added successfully!');
	        		window.history.back();
	        	}
	        }).catch((error) => {
	        	console.log(error);
	        })
	    } else if( this.props.Type == 'Edit' ) {
	    	axios.put(SERVER_URL + `/${this.props.Table}`, params).then((response) => {
	        	if(response.data.results == 'success') {
	        		alert('Record updated successfully!');
	      		
	      		this.setState({toDetails: true});
	        	}
	        }).catch((error) => {
	        	console.log(error);
	        })
	    }
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
				          			<FormItem label={ item.label || fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<Input style={{ width: '360px' }} placeholder={`Please input the ${fieldLabel(item.name)}`} />
				          			)}
				        			</FormItem>
				        		</Col>
	    					</div> )
		          	} else if( item.type == 'integer' ) {
		          		return (
          			  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
          				      	<Col span={24}>
				          			<FormItem label={ item.label || fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<InputNumber min={0} style={{ width: '360px' }} placeholder={`Please input the ${fieldLabel(item.name)}`} />
				          			)}
				        			</FormItem>
				        		</Col>
	    					</div> )
		          	} else if( item.type == 'boolean' ) {
		          		return (
          			  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
          				      	<Col span={24}>
				          			<FormItem label={ item.label || fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
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
				          			<FormItem label={ item.label || fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<Input addonBefore={prefixSelector} style={{ width: '360px' }} placeholder={`Please enter the ${fieldLabel(item.name)}`} />
				          			)}
				        			</FormItem>
				        		</Col>
	    					</div> )
		          	} else if( item.type == 'text' || item.type == 'longstring' ) {
		          		return (
          			  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
          				      	<Col span={24}>
				          			<FormItem label={ item.label || fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<TextArea style={{ width: '360px' }} rows={4} placeholder={`Please enter the ${fieldLabel(item.name)}`} />
				          			)}
				        			</FormItem>
				        		</Col>
	    					</div> )
		          	} else if( item.type == 'select' ) {
		          		return (
          			  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
          				      	<Col span={24}>
				          			<FormItem label={ item.label || fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<Select style={{ width: '360px' }} placeholder={`Please enter the ${fieldLabel(item.name)}`}>
				          					{ item.values && item.values.map(value => <Option value={value}>{value}</Option>) }
				          				</Select>
				          			)}
				        			</FormItem>
				        		</Col>
	    					</div> )
		          	}  else if( item.type == 'password' ) {
		          		return (
          			  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
          				      	<Col span={24}>
				          			<FormItem label={ item.label || fieldLabel(item.name) } hasFeedback>{getFieldDecorator(item.name, {rules: [item.rules]})(
				          				<Input type="password" style={{ width: '360px' }} placeholder={`Please input the ${fieldLabel(item.name)}`} />
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

const InputForm = Form.create()(MyForm);

export default InputForm;