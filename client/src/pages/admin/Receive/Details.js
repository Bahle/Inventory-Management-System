import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Dialog from '../../../components/Dialog';
import { Form, Input, Select, DatePicker, Col, Row, Table, Button, InputNumber, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../../constants';
import axios from 'axios';
import moment from 'moment';
import './index.css';

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

class MyForm extends Component {
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	      }
	    });
	  }

	  dateFormat = 'YYYY/MM/DD'

	  SetFields(fields) {
	  	const { setFields } = this.props.form;

		setFields({
			name: {value: fields.name},
			date_issued: {value: moment(fields.date_issued, this.dateFormat)},
			invoice_no: {value: fields.invoice_no}
		});
	  }

	  render() {
	    const { getFieldDecorator } = this.props.form;
	    return (
	      <Form layout="inline" onSubmit={this.handleSubmit}>
	      	<Col span={12}>
		      	<FormItem
		          label="Supplier"
		          hasFeedback
		        >
		          {getFieldDecorator('name')(
		            <Input disabled="true" style={{ width: 240 }} placeholder="Please input the invoice number" />
		          )}
		        </FormItem>
		    </Col>

		    <Col span={12}>
		        <FormItem
		          label="Date"
		        >
		          {getFieldDecorator('date_issued')(
		            <DatePicker disabled="true" style={{ width: 240 }} format={this.dateFormat} />
		          )}
		        </FormItem>
		    </Col>

		    <Col span={12}>
		      	<FormItem
		      		label="Invoice"
		      	>
		          {getFieldDecorator('invoice_no')(
		            <Input disabled="true" style={{ width: 240 }} placeholder="Please input the invoice number" />
		          )}
		        </FormItem>
		    </Col>
	      </Form>
	      )
	}
}

const WrappedForm = Form.create()(MyForm);

class MyTable extends Component {
	state = {
		Rows: []
	}

	columns = [{
	  title: 'Description',
	  dataIndex: 'description',
	  key: 'description',
	}, {
	  title: 'Quantity',
	  dataIndex: 'quantity',
	  key: 'quantity',
	}, {
	  title: 'Cost',
	  dataIndex: 'cost',
	  key: 'cost',
	}, {
	  title: 'VAT',
	  dataIndex: 'vat',
	  key: 'vat',
	}, {
	  title: 'Retail',
	  dataIndex: 'retail',
	  key: 'retail',
	}];

	SetRows(rows) {
		this.state({Rows: rows});
	}

	render() {
		return (
			<Table dataSource={this.state.Rows} columns={this.columns} />			
		)
	}
}

class BottomForm extends Component {
	state = {
		totals: {
			cost: 0,
			vat: 0,
			total: 0
		}
	}

	SetTotals = (totals) => {
		const { setFields } = this.props.form;

		setFields({
			cost: {value: totals.totalCost},
			vat: {value: totals.totalVAT},
			retail: {value: totals.totalRetail}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return(
			<Form layout="inline" style={{ padding: 0 }}>
				<FormItem label="Total Cost">
	              {getFieldDecorator('cost', { initialValue: '0' })(
	                <Input value="0" disabled={true} className='input-readonly' style={{ width: '80px' }} />
	              )}
	            </FormItem>

	            <FormItem label="Total VAT">
	              {getFieldDecorator('vat', { initialValue: '0' })(
	                <Input defaultValue="0" disabled={true} className='input-readonly' style={{ width: '80px' }} />
	              )}
	            </FormItem>

	            <FormItem label="Total" style={{ padding: 0 }}>
	              {getFieldDecorator('retail', { initialValue: '0' })(
	                <Input defaultValue="0" disabled={true} className='input-readonly' style={{ width: '80px' }} />
	              )}
	            </FormItem>
	        </Form>
	    )
	}
}

const WrappedBottomForm = Form.create()(BottomForm);

class New extends Component {
	id = window.location.pathname.split('/')[3];

	columns = [{
	  title: 'Description',
	  dataIndex: 'name',
	  key: 'name',
	}, {
	  title: 'Quantity',
	  dataIndex: 'quantity',
	  key: 'quantity',
	}, {
	  title: 'Cost',
	  dataIndex: 'amount_per_unit',
	  key: 'amount_per_unit',
	}, {
	  title: 'VAT',
	  dataIndex: 'vat',
	  key: 'vat',
	}, {
	  title: 'Retail',
	  dataIndex: 'retail',
	  key: 'retail',
	}];

	state = {
		tableData: []
	}

	componentDidMount() {
			axios.get(SERVER_URL + `/receive?id=${this.id}`)
				.then(response => {
					var data = response.data[0];

					console.log('got', response);

					var infoFields = {
						name: data.name,
						date_issued: data.date_issued,
						invoice_no: data.invoice_no
					}

					this.InfoForm.SetFields(infoFields);

					var totals = {
						totalCost: 0,
						totalVAT: 0,
						totalRetail: 0
					}

					data.products = data.products.map(p => {
						let vatCost = ((data.vat * 0.15 * p.amount_per_unit * p.quantity * 10) / 10).toFixed(2);
						console.log('type of vat ', typeof data.vat);
						console.log('type of amount_per_unit ', typeof p.amount_per_unit);
						console.log('type of quantity ', typeof p.quantity);

						var retail = new Number((p.amount_per_unit * p.quantity) + parseInt(vatCost)).toFixed(2);

						totals.totalCost += parseFloat(p.amount_per_unit.toFixed(2));
						totals.totalVAT += parseFloat(vatCost);
						totals.totalRetail += parseFloat(retail);

						return {
							...p,
							vat: vatCost,
							retail
						}
					});

					// this.Table.setRows(data.products)
					this.setState({ tableData: data.products });
					this.BottomForm.SetTotals(totals);

				})
				.catch(error => console.log(error))
		}

	render() {
		return (
			<DashboardLayout title="Receive Details">
				<WrappedForm wrappedComponentRef={(form) => this.InfoForm = form} style={{ clear: 'both' }} />

				<div style={{ clear: 'both', height: 20 }}><br/></div>

				<Table dataSource={this.state.tableData} columns={this.columns} style={{ marginTop: 20, clear: 'both' }} />

				<div>
					<div style={{ float: 'left' }}>
						<Button type="primary" style={{ minWidth: 100, margin: '0 5px' }}>Print</Button>
					</div>
					
					<div style={{ float: 'right' }}>
			        	<WrappedBottomForm wrappedComponentRef={(form) => this.BottomForm = form} style={{ float: 'right' }} />
			        </div>
				</div>
			</DashboardLayout>
		)
	}
}

export default New;