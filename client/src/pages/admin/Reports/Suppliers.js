import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Form, Input, Select, DatePicker, Col, Row, Table, Button } from 'antd';
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
		      	<Col span={12}>
			      	<FormItem
			          label="Supplier"
			          hasFeedback
			        >
			          {getFieldDecorator('select', {
			            rules: [
			              { required: true, message: 'Please select your country!' },
			            ],
			          })(
			            <Select placeholder="Please select a supplier" style={{ width: 240 }}>
			              <Option value="china">China</Option>
			              <Option value="use">U.S.A</Option>
			            </Select>
			          )}
			        </FormItem>
			    </Col>

			    <Col span={12}></Col>
		    </div>

		    <Col span={12}>
		        <FormItem
		          label="Start Date"
		        >
		          {getFieldDecorator('StartDate', {
				      rules: [{ type: 'object', required: true, message: 'Please select start date!' }],
				  })(
		            <DatePicker style={{ width: 240 }} />
		          )}
		        </FormItem>
		    </Col>

		    <Col span={12}>
		        <FormItem
		          label="End Date"
		        >
		          {getFieldDecorator('EndDate', {
				      rules: [{ type: 'object', required: true, message: 'Please select end date!' }],
				  })(
		            <DatePicker style={{ width: 240 }} />
		          )}
		        </FormItem>
		    </Col>

		    <Col span={12}>
		      	<FormItem
		      		label="Start Invoice"
		      	>
		          {getFieldDecorator('StartInvoice', {
		            rules: [{ required: true, message: 'Please input the invoice number' }],
		          })(
		            <Input style={{ width: 240 }} placeholder="Please input the invoice number" />
		          )}
		        </FormItem>
		    </Col>

		    <Col span={12}>
		      	<FormItem
		      		label="End Invoice"
		      	>
		          {getFieldDecorator('EndInvoice', {
		            rules: [{ required: true, message: 'Please input the invoice number' }],
		          })(
		            <Input style={{ width: 240 }} placeholder="Please input the invoice number" />
		          )}
		        </FormItem>
		    </Col>

		    <div style={{ display: 'inline-block', width: '100%', clear: 'both', marginTop: '25px', paddingTop: '15px', borderTop: 'solid thin #ddd' }}>
			    <Col span={24}>
			    	<FormItem>
	    	          <Button
	    	          	size="large"
	    	            type="primary"
	    	            htmlType="submit"
	    	            disabled={hasErrors(getFieldsError())}
	    	            style={{ float: 'right', width: '170px' }}
	    	          >
	    	            Generate Report
	    	          </Button>
	    	        </FormItem>
			    </Col>
			</div>
	      </Form>
	      )
	}
}

const WrappedForm = Form.create()(MyForm);

class Suppliers extends Component {
	render() {
		return (
			<DashboardLayout>
				<div>
				  <h2>Supplier Report</h2>

				  <WrappedForm />
				</div>
			</DashboardLayout>
		)
	}
}

export default Suppliers;