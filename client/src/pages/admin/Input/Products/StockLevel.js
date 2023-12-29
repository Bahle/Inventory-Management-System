import React, { Component } from 'react';
import { Form, Input, Select, DatePicker, Col, Row, Table, Button, InputNumber } from 'antd';
import axios from 'axios';
import DashboardLayout from '../../../../layouts/DashboardLayout';

const FormItem = Form.Item;

class Widget extends Component {
	state = {
		name: '',
		description: '',
		pack_size: '',
		form: '',
		quantity: 0
	}

	id = window.location.pathname.split('/')[4];
	
	componentDidMount() {
		axios.get(`/product?id=${this.id}`)
			.then((response) => {
				const { name, description, pack_size, form, quantity } = response.data[0];

				this.setState({
					name, description, pack_size, form, quantity					
				});
			}).catch((err) => {
				console.log(err);
			})
	}

	handleSubmit = (e) => {
	    e.preventDefault();

	    // console.dir(this.props.form)
	    alert('the values: ' + JSON.stringify(this.props.form.getFieldsValue()));

	    this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
	    });

	    const newStock = this.props.form.getFieldsValue().new_stock;

	    axios.post(`/product/new-stock`, { id: this.id, newStock }).then((response) => {
        	if(response.data.results == 'success') {
        		alert('Record added successfully!');
        		window.history.back();
        	}
        }).catch((error) => {
        	console.log(error);
        })
	 }

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

		return (
			<DashboardLayout title="New stock">
				<div style={{ position: 'relative', zIndex: 10 }}>
			      	<Form layout="inlinez" onSubmit={this.handleSubmit}>
				  		<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
					      	<Col span={12}>
			          			<FormItem label="Product name" hasFeedback>{getFieldDecorator('name')(
			          				<div>{this.state.name}</div>
			          			)}
			        			</FormItem>
			        		</Col>

					      	<Col span={12}>
			        			<FormItem label="Description" hasFeedback>{getFieldDecorator('Description')(
			          				<div>{this.state.description}</div>
			          			)}
			        			</FormItem>
			        		</Col>

					      	{/*<Col span={12}>
			        			<FormItem label="Pack Size" hasFeedback>{getFieldDecorator('pack_size', {rules: []})(
			          				<div>{this.state.pack_size}</div>
			          			)}
			        			</FormItem>
			        		</Col>

					      	<Col span={12}>
			        			<FormItem label="Form" hasFeedback>{getFieldDecorator('form', {rules: []})(
			          				<div>{this.state.form}</div>
			          			)}
			        			</FormItem>
			        		</Col>*/}

					      	<Col span={24}>
			        			<FormItem label="Current stock level" hasFeedback>{getFieldDecorator('name')(
			          				<div>{this.state.quantity}</div>
			          			)}
			        			</FormItem>
			        		</Col>

					      	<Col span={24}>
			        			<FormItem label="Additional Stock" hasFeedback>{getFieldDecorator('new_stock', {initialValue: 0, rules: [{ required: true, message: 'Please enter a value' },]})(
			          				<InputNumber min={0} initialValue={0} placeholder="Please enter the new additional stock" style={{ width: '100%' }} />
			          			)}
			        			</FormItem>
			        		</Col>
						</div>
					</Form>

					<div>
						<Button type="primary" style={{ minWidth: 100, margin: '0 5px' }} onClick={this.handleSubmit.bind(this)}>Submit</Button>
						<Button type="primary" style={{ minWidth: 100, margin: '0 5px' }}>Print</Button>
					</div>
				</div>
			</DashboardLayout>
		)
	}
}

const WidgetForm = Form.create()(Widget);

export default WidgetForm; 
