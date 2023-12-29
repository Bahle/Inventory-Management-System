import React, { Component } from 'react';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import axios from 'axios';
import { SERVER_URL } from '../../../../constants';
import { Form, Input, Select, Col, Row, Button, Radio } from 'antd';
import { Redirect } from 'react-router-dom'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton  = Radio.Button;
const RadioGroup = Radio.Group;

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

	      axios.post(SERVER_URL + '/add-supplier', {
	      	name: values.supplier,
	      	account: values.account,
	      	city: values.city,
	      	tel_no: values.tel,
	      	vat: values.vat
	      }).then((response) => {
	      	alert('received: ' + response.data.results);

	      	if(response.data.results == 'success') {
	      		alert('Supplier added successfully!');
	      		window.history.back();
	      	}
	      }).catch((error) => {
	      	console.log(error);
	      })
	    });
	  }

	  render() {
	  	const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
	    return (
	      <Form layout="inline" onSubmit={this.handleSubmit} className="login-form">
	      	<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
		      	<Col span={24}>
			      	<FormItem
			          label="Product"
			          hasFeedback
			        >
			          {getFieldDecorator('product', {
			            rules: [
			              { required: true, message: 'Please select your country!' },
			            ],
			          })(
			          	<Input style={{ width: '360px' }} />
			          )}
			        </FormItem>
			    </Col>
		    </div>

		    <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
		      	<Col span={24}>
			      	<FormItem
			          label="Strength"
			          hasFeedback
			        >
			          {getFieldDecorator('strength', {
			            rules: [
			              { required: true, message: 'Please select your country!' },
			            ],
			          })(
			          	<Input style={{ width: '360px' }} />
			          )}
			        </FormItem>
			    </Col>
		    </div>

	        <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
	          	<Col span={24}>
	    	      	<FormItem
	    	          label="Misc Description"
	    	          hasFeedback
	    	        >
	    	          {getFieldDecorator('description', {
	    	            rules: [
	    	              { required: true, message: 'Please select your country!' },
	    	            ],
	    	          })(
		    	          <Input style={{ width: '360px' }} />
	    	          )}
	    	        </FormItem>
	    	    </Col>
	        </div>

            <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
              	<Col span={24}>
        	      	<FormItem
        	          label="Types"
        	          hasFeedback
        	        >
        	          {getFieldDecorator('types', {
        	            rules: [
        	              { required: true, message: 'Please select your country!' },
        	            ],
        	          })(
	        	          	<Select style={{ width: 240 }}>
	        	          	  <Option value="china">China</Option>
	        	          	  <Option value="use">U.S.A</Option>
	        	          	</Select>
        	          )}
        	        </FormItem>
        	    </Col>
            </div>

            <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
              	<Col span={24}>
        	      	<FormItem
        	          label="Pack Size"
        	          hasFeedback
        	        >
        	          {getFieldDecorator('pack-size', {
        	            rules: [
        	              { required: true, message: 'Please select your country!' },
        	            ],
        	          })(
	        	          <Input style={{ width: '360px' }} />
        	          )}
        	        </FormItem>
        	    </Col>
            </div>

            <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
              	<Col span={24}>
        	      	<FormItem
        	          label="Mark-Up"
        	          hasFeedback
        	        >
        	          {getFieldDecorator('mark-up', {
        	            rules: [
        	              { required: true, message: 'Please select your country!' },
        	            ],
        	          })(
	        	          <Input style={{ width: '360px' }} />
        	          )}
        	        </FormItem>
        	    </Col>
            </div>

            <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
              	<Col span={24}>
        	      	<FormItem
        	          label="Min. Stock Level"
        	          hasFeedback
        	        >
        	          {getFieldDecorator('min-stock-level', {
        	            rules: [
        	              { required: true, message: 'Please select your country!' },
        	            ],
        	          })(
	        	          <Input style={{ width: '360px' }} />
        	          )}
        	        </FormItem>
        	    </Col>
            </div>

            <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
              	<Col span={24}>
        	      	<FormItem
        	          label="Barcode"
        	          hasFeedback
        	        >
        	          {getFieldDecorator('barcode', {
        	            rules: [
        	              { required: true, message: 'Please select your country!' },
        	            ],
        	          })(
	        	          <Input style={{ width: '360px' }} />
        	          )}
        	        </FormItem>
        	    </Col>
            </div>

            <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
              	<Col span={24}>
        	      	<FormItem
        	          label="Product Code"
        	          hasFeedback
        	        >
        	          {getFieldDecorator('product-code', {
        	            rules: [
        	              { required: true, message: 'Please select your country!' },
        	            ],
        	          })(
	        	          <Input style={{ width: '360px' }} />
        	          )}
        	        </FormItem>
        	    </Col>
            </div>

    	    <div style={{ display: 'inline-block', width: '100%', clear: 'both', marginTop: '5px', paddingTop: '5px' }}>
			    <Col span={24}>
			    	<FormItem>
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
			    </Col>
			</div>
	      </Form>
	      )
	}
}

const WrappedForm = Form.create()(MyForm);

class Supplier extends Component {
	render() {
		return (
			<DashboardLayout>
				<div>
				  <h2>Supplier</h2>

				  <WrappedForm />
				</div>
			</DashboardLayout>
		)
	}
}

export default Supplier;