import React, { Component } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Table, Icon, Divider, Input, InputNumber, AutoComplete } from 'antd';
// import { products, barcodes } from './products';
import { SERVER_URL } from '../../constants';
import axios from 'axios';

let products = [], productList = [], barcodes = [], productNames = [];
var currentProduct = null;

function getProductList() {
    axios.get(SERVER_URL + '/product?diff_price=true') //  this.props.columns.join()
        .then((response) => {
            productList = products = response.data;

            console.clear();
            console.dir(products);

            barcodes = products.map(p => p.barcode);
            productNames = products.map(p => p.name);
            console.log('barcordes is ' + JSON.stringify(barcodes))
        }).catch((err) => {
            console.log(err);
        })
    }

class Complete extends React.Component {
  state = {
    dataSource: [],
  }

  onSelect = (value, e) => {
    console.log('onSelect', value);

    var product;

    // if not contains '-' is being searched by barcode, else name - description - pack_size
    if(value.indexOf('-') === -1) {
    	product = products.filter(product => product.barcode == value)[0]; // Barcode
    } else {
    	var values = value.split(' - ');
    	//alert('value: ' + value);
    	//alert('Dm values: ' + values);
    	var name = values[0],
    		pack_size = values[1];
    	
		var temp = values[2].split(' left, at R'),
    		quantity = temp[0],
    		price = temp[1].replace(' each', '');

    	//alert('name ' + name + ', quantity: ' + quantity + 'pack_size: ' + pack_size + ', price: ' + price);

    	product = products.filter(p => p.name == name && p.pack_size == pack_size && p.total_quantity == quantity && p.price == price)[0]; // Barcode
    }


    //alert('Got => ' + JSON.stringify(product));

    this.props.onChange(product); // <=== start from here, how pass info from here
    this.props.GetProduct(product);
  }

  handleSearch = (value) => {
  	// alert('CHecking: ' + productNames.filter(p => p.indexOf(value) !== -1));
  	/*var filteredByName = productNames.filter(p => p.indexOf(value) !== -1);
  	var filteredByBarcode = barcodes.filter(b => b.indexOf(value) !== -1);

  	filteredByBarcode.forEach(f => {
  		if( filteredByName.indexOf(f) === -1 ) {
  			filteredByName.push()
  		}
  	})*/

  	// alert('checkisto: ' + barcodes.filter(b => b.indexOf(value) !== -1));

    this.setState({
      dataSource: /*barcodes.filter(b => b.indexOf(value) !== -1)*/ products
					.filter(p => p.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || p.barcode.indexOf(value.toLowerCase()) !== -1 || p.product_code.indexOf(value.toLowerCase()) !== -1)
					.map(p => p.name + ' - ' + p.pack_size + ' - ' + p.total_quantity + ' left, at R' + p.price + ' each - ' + p.barcode),
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: '100%' }}
        dropdownStyle={{ width: 500 }}
        onSelect={this.onSelect.bind(this)}
        onSearch={this.handleSearch}
        placeholder="input here"
      />
    );
  }
}


class DataTable extends Component {
	product = null

	state = {
		tableLoading: true,
		totals: { cost: 0, vat: 0, retail: 0 },
		data: [
			{ key: 1, name: 'Panado', price: 20.00, quantity: 20, vat: 15, retail: 200 },
			{ key: 2, name: 'Mybulen', price: 30.00, quantity: 40, vat: 15, retail: 600 },
			{ key: 3, name: 'Aspirin', price: 14.00, quantity: 30, vat: 15, retail: 460 },
		],
		VAT: 0,
		productCostDetails: {}
	}

	columns = [{
	  title: 'Description',
	  dataIndex: 'name',
	  key: 'name',
	  render: text => text == '' ? <Complete GetProduct={(product) => this.product = product}  onChange={this.handleCellClick.bind(this, 'name')} /> : <span>{text}</span>
	}, {
	  title: 'Quantity',
	  dataIndex: 'quantity',
	  key: 'quantity',
	  render: (text, record) => <span><InputNumber defaultValue={ Math.round(Math.random() * 30) + 1 } max={this.state.data.filter((item) => item.key == record.key)[0].total_quantity} onChange={this.handleCellClick.bind(this, 'quantity')} style={{float:'left'}} /> <div className="form-input-label"> / {this.state.data.filter((item) => item.key == record.key)[0].total_quantity || (Math.round(Math.random() * 30) + 1)}</div> </span>, 
	}, {
	  title: 'Quantity Supplied',
	  dataIndex: 'quantity_supplied',
	  key: 'quantity_supplied',
	  render: (text, record) => <span>{ Math.round(Math.random() * 30) + 1 } </span>, 
	}, {
	  title: 'Price',
	  dataIndex: 'price',
	  key: 'price',
	  render: text => text == '' ? <span>0.00</span> : <span>{ new Number(text).toFixed(2) }</span>
	},
	{
	  title: 'Mark Up',
	  dataIndex: 'mark_up',
	  key: 'mark_up',
	  render: text => <div><InputNumber defaultValue={text} onChange={this.handleCellClick.bind(this, 'mark_up')} style={{float:'left',width:'80px'}} /> <div className="form-input-label">%</div> </div>,
	},
	{
	  title: 'Total Price',
	  dataIndex: 'retail',
	  key: 'retail',
	  render: (text, record) => (parseInt(text) != "0" ? <span>{text} <a href="#" style={{ marginLeft: "5px" }} onClick={this.specifyPrice.bind(this, record)}>Edit</a></span> : <span>{text}</span>)
	},
	{
	  title: 'Action',
	  key: 'action',
	  render: (text, record) => (
	      record.name == '' ? <span></span> : <a href="#" style={{color:'red'}} onClick={this.handleDelete.bind(this, record)}>Delete</a>
	  )
	}];

	init() {
		this.setState({data: [{ key: 1, name: '', price: 0, quantity: 0, vat: 0, retail: 0 }]});
	}

	componentWillMount() {
		getProductList();

		let data = this.state.data;
		
		this.props.columns.forEach(column => {
			data[0][column] = '';
		});

		
		this.setState({data});
	}

	currentRecord = null;

	handleDelete(selectedRecord) {
		if( window.confirm('Are you sure you want to delete this record?') ) {
			var data = this.state.data;
			data = data.filter(record => {
				if(record.key != selectedRecord.key) return record;
			});
			
			this.setState({data: data});

			var totals = {
				totalRetail: 0
			};

			data.forEach(row => {
				totals.totalRetail += parseFloat(row.retail); //parseFloat(retail);
			})

			totals.totalRetail = new Number(totals.totalRetail).toFixed(2);

			this.Footer.SetTotals(totals);
		}
	}

	specifyPrice(selectedRecord) {
		/*console.log('Stuffffff');
		alert('111');
		window.alert('222');*/
		// prompt('333');
		// window.prompt('333');
		var newPrice = window.prompt('Please enter the price');

		//alert('newPrice: ' + newPrice);
		if(newPrice !== undefined && newPrice !== null) {
			var data = this.state.data;
			data = data.map(record => {
				if(record.key == selectedRecord.key) {
					record.retail = Number(newPrice).toFixed(2);
					record.mark_up = new Number(newPrice / (record.quantity * record.price)).toFixed(2); //! don't know why this is not working [not editing mark_up]
				}

				return record;
			});
			
			this.setState({data: data});

			var totals = {
				totalRetail: 0
			};

			this.state.data.forEach(row => {
				totals.totalRetail += parseFloat(row.retail); //parseFloat(retail);
			})

			totals.totalRetail = new Number(totals.totalRetail).toFixed(2);

			this.Footer.SetTotals(totals);
		}
	}

	handleCellClick(field, e) {
		// alert("yo!")
		// prompt('sdfdsfdsf')
		// alert('field: ' + field)
		//console.clear();
		console.log('field: ' + field)
		console.log('this.currentRecord: ' + JSON.stringify(this.currentRecord));
		console.log('e is ');
		console.dir(e);

		//alert('field: ' + field);
		//alert(e);
		//alert(JSON.stringify(e));
		//alert('product: ' + JSON.stringify(this.product));

		// alert(JSON.stringify(e));

		////console.clear();
		////alert('this.currentRecord')
		if( e !== undefined && e.name !== undefined ) {
			////console.log(this.currentRecord);
			this.currentRecord['key'] = e.product_id;
			this.currentRecord['name'] = e.name;
			this.currentRecord['price'] = parseFloat(e.price);
			this.currentRecord['quantity'] = 0; //parseInt(e.quantity);
			this.currentRecord['total_quantity'] = parseInt(e.total_quantity);
			//alert('e.mark_up: ' + e.mark_up);
			this.currentRecord['mark_up'] = parseFloat(e.mark_up);
			//this.currentRecord['retail'] = new Number((this.currentRecord.price * this.currentRecord.quantity * (1 + (this.currentRecord.mark_up * 0.01)))).toFixed(2);
			//alert('Hello 1');
			/* alert('this.currentRecord.price: ' + this.currentRecord.price);
			alert('this.currentRecord.quantity: ' + this.currentRecord.quantity);
			alert('this.currentRecord.quantity: ' + this.currentRecord.mark_up);
			alert('(1 + this.currentRecord.mark_up): ' + (1 + this.currentRecord.mark_up)); */
		} else {
			this.currentRecord[field] = e;
			////console.log(this.currentRecord);
			//alert('Hello 2: ' + JSON.stringify(e));

			///this.currentRecord = e;
			///this.currentRecord.total_quantity = e.total_quantity;

		}

		// this.currentRecord[field] = e.name !== undefined ? e.name : e; //e.target !== undefined ? e.target.value : e.name; // cater for when string is passed
		//var targetRecord = products.filter(p => p.name == e.name)[0];
		
		var self = this,
			data = this.state.data;

		// alert('currentRecord is ' + JSON.stringify(this.currentRecord));
		// update data with input current record values
		data = data.map(record => record.key == self.currentRecord.key ? self.currentRecord : record);
		
		// WHERE THE MAGIC HAPPENS
		this.setState({data: data});

		if(field == 'name') {
			//this.currentRecord['price'] = targetRecord['price'];

			// initialize new row
			/* var fields = {vat: 0, retail: 0};
			
			this.props.columns.forEach(col => {
				fields[col] = '';
			})

			data.push({
  	      		key: (self.currentRecord.key + 1),
  	      		...fields
  	      	}); */
		} else if(field == 'quantity' || field == 'mark_up') {
			// alert(1);
			// let vat  = this.state.VAT; //! DLT (DO LATER)

			// this.hasVAT = this.props.VAT; //vat;

			/* console.log('vat: ' + 1);
			console.log('price: ' + this.currentRecord.price);
			console.log('quantity: ' + this.currentRecord.quantity); */

			//let _vatCost = ((vat * 0.15 * this.currentRecord.price * this.currentRecord.quantity * 10) / 10)
			//let vatCost = _vatCost.toFixed(2);
			// console.log('quantity: ' + this.currentRecord.quantity);
			
			var retail = new Number((this.currentRecord.price * this.currentRecord.quantity * (1 + (this.currentRecord.mark_up * 0.01)))).toFixed(2);

			//this.currentRecord.vat = vatCost;
			this.currentRecord.retail = retail;
		}

		var totals = {
			totalCost: 0,
			totalVAT: 0,
			totalRetail: 0
		};

		// alert(JSON.stringify(this.state.data));

		this.state.data.forEach(row => {
			// totals.totalCost += parseFloat(row.price.toFixed(2));
			// totals.totalVAT += parseFloat(row.vat); //parseFloat(vatCost);
			totals.totalRetail += parseFloat(row.retail); //parseFloat(retail);
		})

		totals.totalRetail = new Number(totals.totalRetail).toFixed(2);

		this.Footer.SetTotals(totals);

		//this.getProductCostDetails(this.currentRecord.key);
	}

	setVAT(vat) {
		this.init();
		// this.VAT = vat;
		this.setState({VAT: vat})

		var totals = {
			totalCost: 0,
			totalVAT: 0,
			totalRetail: 0
		}

		this._tableData = this.state.data.map((data) => {
			// console.dir(data);
			
			// decimal multiplication in js leads to floating point numbers, multiply by 10 then divide to get proper answer
			let vatCost = ((vat * 0.15 * data.price * data.quantity * 10) / 10).toFixed(2);
			
			var retail = new Number((data.price * data.quantity) + parseInt(vatCost)).toFixed(2);

			totals.totalCost += parseFloat(data.price.toFixed(2));
			totals.totalVAT += parseFloat(vatCost);
			totals.totalRetail += parseFloat(retail);

			return {
				...data,
				vat: vatCost,
				retail
			}
		});

		this.setState({ data: this._tableData });
		this.Footer.SetTotals(totals);
	}

	setFooter(footer) {
		this.Footer = footer;
	}

	getData() {
		return Object.assign({}, this.state);
	}

	/*getProductCostDetails(productId) {
		axios.get(SERVER_URL + '/receive/cost-history?productId=' + productId) //  this.props.columns.join()
	        .then((response) => {
	            alert('response.data is ' + JSON.stringify(response.data));

	            this.setState({ productCostDetails: {productId: response.data}, ...this.state.productCostDetails }); //productCostDetails[productId] = response.data;
	        }).catch((err) => {
	            console.log(err);
	        })
	}*/

	render() {
		return (
		  <Table
		  	onRow={(record) => {
		  	    return {
		  	      onClick: () => {
		  	      	this.currentRecord = record;
		  	      	/*console.clear();
		  	      	console.log('this.currentRecord is now ' + JSON.stringify(record));*/
		  	      	//alert('this.currentRecord: ' + JSON.stringify(this.currentRecord));

		  	      	var count = this.state.data.length;
		  	      	var lastRow = this.state.data[count-1];

		  	      	if( lastRow.name !== '' && lastRow.age !== '' && lastRow.address !== '' ) {
		  	      		this.setState({
		  	      			data: [ ...this.state.data, { key: (++count) + 'abc', vat: 0, name: '', price: 0, quantity: 0, retail: 0} ]
		  	      		});
		  	      	}

		  	      	// console.dir(record);
		  	      	/*data.push({
		  	      		key: 4,
		  	      		name: '',
		  	      		age: '',
		  	      		address: ''
		  	      	});*/
		  	      },
		  	      // onChange: (target, param) => {
		  	      // 	console.clear();
		  	      // 	console.log('Change!');
		  	      // 	console.dir(record);
		  	      // 	console.log('Target:');
		  	      // 	console.dir(target);
		  	      // 	console.log('Param:');
		  	      // 	console.dir(param);
		  	      // }
		  	    };
		  	  }
		  	}
		  	columns={this.columns} dataSource={this.state.data} />
		)
	}
}

DataTable.defaultProps = { columns: ['name', 'price', 'quantity'] };

export default DataTable;