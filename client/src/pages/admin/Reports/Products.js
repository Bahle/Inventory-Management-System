import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';

import { Form, Select, Col, Row, Button } from 'antd';
import './index.css';

const FormItem = Form.Item;
const Option = Select.Option;

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
			          {getFieldDecorator('select', {
			            rules: [
			              { required: true, message: 'Please select your country!' },
			            ],
			          })(
			            <Select placeholder="Please select a customer" style={{ width: 240 }}>
			              <Option value="china">Kingsway</Option>
			              <Option value="use">LNDC</Option>
			            </Select>
			          )}
			        </FormItem>
			    </Col>

			    <Col span={12}></Col>
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
		        	            Current Stock
		        	          </Button>
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
	    	            Stock Usage
	    	          </Button>
	    	        </FormItem>
			    </Col>
			</div>
	      </Form>
	      )
	}
}

const WrappedForm = Form.create()(MyForm);

class Products extends Component {
	render() {
		return (
			<DashboardLayout>
				<div>
				  <h2>Product Report</h2>

				  <WrappedForm />
				</div>
			</DashboardLayout>
		)
	}
}

export default Products;