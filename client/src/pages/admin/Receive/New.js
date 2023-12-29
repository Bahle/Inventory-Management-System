import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Dialog from '../../../components/Dialog';
import MainDataTable from '../DataTableTest';
import { Form, Input, Select, DatePicker, Col, Row, Table, Button, InputNumber } from 'antd';
import axios from 'axios';
import { SERVER_URL } from '../../../constants';
import storeFactory from '../../../store'
import { addProduct, modifyProduct, enterInfo } from '../../../store/actions';
import uuid from 'uuid'

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

var supplierHasVAT = 0;

const store = storeFactory()

window.store = store;
window.addProduct = addProduct;
window.enterInfo = enterInfo;

class MyForm extends Component {
	state = {
		suppliersList: [],
		supplier: null,
		date: null,
		invoice: null
	}

	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', JSON.stringify(values));
	      }
	    });
	  }

	  setSupplier = (value) => {
	  	if( value == 'Add new supplier' ) {
	  		window.location = '/input/suppliers/new';
	  	} else {
	  		this.setState({supplier: value})
			
	  		this.props.SupplierChosen();

	  		axios
		  		.get(SERVER_URL + `/supplier?id=${value}&columns=vat`)
		  		.then(response => {
		  			supplierHasVAT = response.data[0].vat;

		  			this.props.VATUpdated(supplierHasVAT);
		  		})
		  		.catch(error => console.log('Error: ', error));

	  		setTimeout(() => this.update(value), 100);
	  	}
	  }

	  setDate = (value) => {
	  	value = value.format('YYYY-MM-DD');
	  	console.log('setDate', value);
	  	this.setState({date: value})
	  	setTimeout(() => this.update(value), 100);
	  }

	  setInvoice = () => {
	  	var value = document.querySelector('#Invoice').value;
	  	this.setState({invoice: value})
	  	setTimeout(() => this.update(value), 100);
	  }

	 update = () => {
	  	store.dispatch(enterInfo(this.state.supplier, this.state.date, this.state.invoice))
	  }

	  getData() {
		return Object.assign({}, this.state);
	  }

	  componentWillMount() {
	  	axios
	  		.get(SERVER_URL + '/supplier?columns=supplier_id,name')
	  		.then(response => {
	  			this.setState({ suppliersList: response.data })

	  			supplierHasVAT = response.data.vat;
	  		})
	  		.catch(error => console.log('Error: ', error));
	  }

	  render() {
	    const { getFieldDecorator } = this.props.form;

	    const { form: { validateFields } } = this.props;

	    return (
	      <Form layout="inline" onSubmit={this.handleSubmit}>
	      	<Col span={12}>
		      	<FormItem
		          label="Supplier"
		          hasFeedback
		        >
		          {getFieldDecorator('select', {
		            rules: [
		              { required: true, message: 'Please select a supplier' },
		            ],
		          })(
		            <Select placeholder="Please select a supplier" style={{ width: 240 }} onChange={this.setSupplier.bind(this)}>
		              {
		              	this.state.suppliersList.map(supplier => <Option value={supplier.supplier_id}>{supplier.name}</Option>)
		              }
		              <Option value="Add new supplier">Add new supplier</Option>
		            </Select>
		          )}
		        </FormItem>
		    </Col>

		    <Col span={12}>
		        <FormItem
		          label="Date"
		        >
		          {getFieldDecorator('Date', {
				      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
				  })(
		            <DatePicker style={{ width: 240 }} onChange={this.setDate.bind(this)} />
		          )}
		        </FormItem>
		    </Col>

		    <Col span={12}>
		      	<FormItem
		      		label="Invoice"
		      	>
		          {getFieldDecorator('Invoice', {
		            rules: [{ required: true, message: 'Please input the invoice number' }],
		          })(
		            <Input style={{ width: 240 }} placeholder="Please input the invoice number" onChange={this.setInvoice.bind(this)} />
		          )}
		        </FormItem>
		    </Col>
	      </Form>
	      )
	}
}

const WrappedForm = Form.create()(MyForm);

const dataSource = [{
  key: '1',
  description: 'Tocopherol',
  quantity: 32,
  cost: 300,
  vat: 42,
  retail: 342
}, {
  key: '2',
  description: 'Mybulen',
  quantity: 42,
  cost: 400,
  vat: 56,
  retail: 456
}];

class AddProductForm extends Component {
	constructor() {
		super();
	}

	state = {
		productsList: [],
		productId: null,
		name: null,
		quantity: 0,
		cost: 0
	}

	setProduct(id) {
		this.storeId = id;
	}

	componentWillMount() {
		axios
	  		.get(SERVER_URL + '/product?columns=product_id,name')
	  		.then(response => this.setState({ productsList: response.data }))
	  		.catch(error => console.log('Error: ', error));
	}

	setName = (value, option) => {
		if( value == 'Add new product' ) {
	  		window.location = '/input/products/new';
	  	} else {
	  		console.log('name', value);
	  		this.setState({
	  			productId: value,
	  			name: option.props.children
	  		});
	  		
	  		setTimeout(this.update, 100);
	  	}
	}

	setQuantity = (value) => {
		console.log('quantity', value);
		this.setState({quantity: value});
		setTimeout(this.update, 100);
	}

	setCost = (value) => {
		console.log('cost', value);
		this.setState({cost: value});

		setTimeout(this.update, 100);
	}

	update = () => {
		store.dispatch(modifyProduct(this.storeId, this.state.productId, this.state.name, this.state.quantity, this.state.cost));
		console.clear();
		console.log(this.storeId + ') products is now ' + JSON.stringify(store.getState().products));
	}

	init = () => {
		const { setFields } = this.props.form;

		setFields({
			description: '',
			quantity: 0,
			cost: 0
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return(
			<Form layout="vertical">
	            <FormItem label="Description">
	              {getFieldDecorator('description', {
	                rules: [{ required: true, message: 'Please choose a product' }],
	              })(
	                <Select placeholder="Please select a product" onChange={this.setName}>
	                  {
		              	this.state.productsList.map(product => <Option value={product.product_id}>{product.name}</Option>)
		              }
		                <Option value="Add new product">Add new product</Option>
	                </Select>
	              )}
	            </FormItem>

	            <FormItem label="Quantity">
	              {getFieldDecorator('quantity', {
	              	initialValue: 0,
	              	rules: [{ required: true, message: 'Please choose a product' }]
	              })(<InputNumber min={0} style={{ width: '100%' }} onChange={this.setQuantity.bind(this)} />)}
	            </FormItem>

	            <FormItem label="Cost">
	              {getFieldDecorator('cost', {
	                initialValue: 0,
	                rules: [{ required: true, message: 'Please enter product cost' }],
	              })(
	                <InputNumber min={0} style={{ width: '100%' }} onChange={this.setCost.bind(this)} />
	              )}
	            </FormItem>
	        </Form>
	    )
    }
}

const WrappedAddProductForm = Form.create()(AddProductForm);

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
	                <InputNumber step="0.01" value="0" disabled={true} className='input-readonly' style={{ width: '80px' }} />
	              )}
	            </FormItem>

	            <FormItem label="Total VAT">
	              {getFieldDecorator('vat', { initialValue: '0' })(
	                <InputNumber step="0.01" defaultValue="0" disabled={true} className='input-readonly' style={{ width: '80px' }} />
	              )}
	            </FormItem>

	            <FormItem label="Total" style={{ padding: 0 }}>
	              {getFieldDecorator('retail', { initialValue: '0' })(
	                <InputNumber step="0.01" defaultValue="0" disabled={true} className='input-readonly' style={{ width: '80px' }} />
	              )}
	            </FormItem>
	        </Form>
	    )
	}
}

const WrappedBottomForm = Form.create()(BottomForm);

class New extends Component {
	constructor() {
		super();
		
		this.hasVAT = 0;
		this.supplierChosen = false;
		this._tableData = null;
		this.updateCosts = this.updateCosts.bind(this);
		this.chooseSupplier = this.chooseSupplier.bind(this);
	}

	state = {
		products: [],
		name: null,
		quantity: null,
		cost: null,
		tableData: [],
		totals: { cost: 0, vat: 0, retail: 0 },
		supplierChosen: false
	}

	dialogTrigger = () => {
		var self = this;

		setTimeout(() => {
			var newProduct = uuid.v4();
			self.ProductForm.setProduct(newProduct);

			store.dispatch(addProduct(newProduct, null, null, null, null));
		}, 500);
	}

	dialogOk = () => {
		this._tableData = store.getState().products;
		this.updateCosts(this.hasVAT)
		
		this.ProductForm.init();
	}

	chooseSupplier = () => {
		this.setState({supplierChosen: true});
		// this.MainTable.initzzz();
	}

	updateCosts = (vat) => {
		// alert('hello')
		/*this.hasVAT = vat;
		
		var totals = {
			totalCost: 0,
			totalVAT: 0,
			totalRetail: 0
		}

		this._tableData = this._tableData.map((data) => {
			// console.dir(data);
			
			// decimal multiplication in js leads to floating point numbers, multiply by 10 then divide to get proper answer
			let vatCost = ((vat * 0.15 * data.cost * data.quantity * 10) / 10).toFixed(2);
			
			var retail = new Number((data.cost * data.quantity) + parseInt(vatCost)).toFixed(2);

			totals.totalCost += parseFloat(data.cost.toFixed(2));
			totals.totalVAT += parseFloat(vatCost);
			totals.totalRetail += parseFloat(retail);

			return {
				...data,
				vat: vatCost,
				retail
			}
		});

		this.setState({ tableData: this._tableData });
		this.BottomForm.SetTotals(totals);*/
		// alert('vat: ' + vat);

		this.MainTable.setVAT(vat);

		// alert('settomg fppter ' + this.BottomForm)
		this.MainTable.setFooter(this.BottomForm);
	}

	handleSubmit() {
		/*var formData = store.getState();

		*/

		var topData = this.TopForm.getData(), topFormHasErrors = true;
		this.TopForm.props.form.validateFields({force: true}, (errors, values) => {
		  if(errors === null) {
		  	topFormHasErrors = false;

		  }
		});

		if(topFormHasErrors) {
			alert('Please make sure that the \'Supplier\', \'Invoice date\' and \'Invoice number\'  all been entered.');
			return;
		}

		var tableData = this.MainTable.getData(), mainTableHasErrors = false;

		//alert('The tableData is ' + JSON.stringify(tableData.data));
		//return;
		if(tableData.data.length == 1) {
			alert('Please enter at least 1 record.');
			return;
		}

		tableData.data.forEach(record => {
			if(record.name != "") { // skip the blank 'new record' row
				if(record.price == 0 || record.quantity == 0) {
					mainTableHasErrors = true;
				}
			}
		});

		if(mainTableHasErrors) {
			alert('Please make sure that All Products \'Prices\' and \'Quantities\' entered correctly and are not zero.');

			return;
		}
			
		
		var params = {
			supplier: topData.supplier,
			date: topData.date,
			invoiceNo: topData.invoice,
			products: tableData.data
		}

		axios.post(SERVER_URL + `/receive`, params).then((response) => {
        	if(response.data.results == 'success') {
        		alert('Record added successfully!');
        		window.history.back();
        	}
        }).catch((error) => {
        	console.log(error);
        })
	}

	componentDidMount() {
		// VAT={this.hasVAT} Footer={this.BottomForm}
		if( this.MainTable !== undefined ) { //? this.MainTable !== undefined lol; throws undefined error from signIn page
			// this.MainTable.setVAT(this.hasVAT);
			this.MainTable.setFooter(this.BottomForm);
		}			
	}

	render() {
		return (
			<DashboardLayout title="New Replenishment">
				<WrappedForm products={this.state.products} wrappedComponentRef={(form) => this.TopForm = form} SupplierChosen={() => this.chooseSupplier()} VATUpdated={(vat) => this.updateCosts(vat)} style={{ clear: 'both' }} />

				<div style={{ clear: 'both', height: 20 }}><br/></div>

				{/*<div style={{ position: 'relative', zIndex: '10' }}>
					<Dialog title="Add Product" triggerButtonText="Add Product" triggerCallback={this.dialogTrigger} OkCallback={this.dialogOk}>
						<WrappedAddProductForm wrappedComponentRef={(form) => this.ProductForm = form} />
					</Dialog>
				</div>*/}

				{/*<Table dataSource={this.state.tableData} columns={this.columns} style={{ marginTop: 20, clear: 'both' }} />*/}
				<div  style={{display: this.state.supplierChosen ? 'block' : 'none' }}>
					<MainDataTable ref={(table) => this.MainTable = table} />
				</div>

				<div>
					<div style={{ float: 'left' }}>
						<Button type="primary" style={{ minWidth: 100, margin: '0 5px' }} onClick={this.handleSubmit.bind(this)}>Submit</Button>
						<Button type="primary" style={{ minWidth: 100, margin: '0 5px' }}>Print</Button>
					</div>
					
					<div style={{ float: 'right' }}>
			        	<WrappedBottomForm style={{ float: 'right' }} wrappedComponentRef={(form) => this.BottomForm = form} />
			        </div>
				</div>
			</DashboardLayout>
		)
	}
}

export default New;