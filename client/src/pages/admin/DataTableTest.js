import React, { Component } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Table, Icon, Divider, Input, InputNumber, AutoComplete } from 'antd';
import InputMask from 'react-input-mask';

// import { products, barcodes } from './products';
import { SERVER_URL } from '../../constants';
import axios from 'axios';

let products = [], productList = [], barcodes = [], productNames = [];
var currentProduct = null;

function getProductList() {
    axios.get(SERVER_URL + '/product') //  this.props.columns.join()
        .then((response) => {
            productList = products = response.data;
            // console.log('products is ' + JSON.stringify(products));

            barcodes = products.map(p => p.barcode);
            productNames = products.map(p => p.name);
            // console.log('barcordes is ' + JSON.stringify(barcodes))

            /*console.clear();
            console.log('productList');
            console.log(productList);*/
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
    	var name = values[0],
    		description = values[1],
    		pack_size = values[2];

    	// alert('name ' + name + ', description: ' + description + 'pack_size: ' + pack_size);

    	product = products.filter(p => p.name == name && p.description == description && p.pack_size == pack_size)[0]; // Barcode
    }


    // alert('Got ' + value + ' => ' + JSON.stringify());

    this.props.onChange(product);
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
					.map(p => p.name + ' - ' + p.description + ' - ' + p.pack_size + ' - ' + p.barcode),
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
      	ref={input => this.control = input}
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
	state = {
		tableLoading: true,
		totals: { cost: 0, vat: 0, retail: 0 },
		data: [{ key: 1, name: '', price: 0, quantity: 0, vat: 0, retail: 0 }],
		VAT: 0
	}

	productCostDetails: {}
	inputs = [];

	columns = [{
	  title: 'Description',
	  dataIndex: 'name',
	  key: 'name',
	  render: (text, record) => text == '' ? <Complete ref={input => {
	  			
	  			/*if(this.inputs['blank'] === undefined) {
		  			this.inputs['blank'] = {};
		  		}*/
		  		
		  		this.inputs['blank'] = input;
		  	}} onChange={this.handleCellClick.bind(this, 'name')} /> : <span>{text}</span>
	}, {
	  title: 'Cost',
	  dataIndex: 'price',
	  key: 'price',
	  render: (text, record) => <InputNumber ref={input => {
	  			if(this.inputs[record.name] === undefined) {
	  				this.inputs[record.name] = {};
	  			}
		  		
		  		this.inputs[record.name]['price'] = input;

		  		console.dir(this.inputs);
		  	}} defaultValue={text} onChange={this.handleCellClick.bind(this, 'price')} onKeyDown={(e) => {
			  	if(e.keyCode == 13) {
			  		this.inputs[record.name]['quantity'].inputNumberRef.input.select();; //.focus()
			  	}
			  }} />, /* step={0.01} */
	}, {
	  title: 'Quantity',
	  dataIndex: 'quantity',
	  key: 'quantity',
	  render: (text, record) => <InputNumber ref={input => {
	  			
	  			if(this.inputs[record.name] === undefined) {
		  			this.inputs[record.name] = {};
		  		}
		  		
		  		this.inputs[record.name]['quantity'] = input;
		  	}} defaultValue={text} onChange={this.handleCellClick.bind(this, 'quantity')} onKeyDown={(e) => {
			  	if(e.keyCode == 13) {
			  		/*console.clear();
			  		console.log('what is blank: ');
			  		console.dir(this.inputs['blank'].control);*/
			  		this.inputs['blank'].control.focus()
			  		// this.inputs['blank'].control.getInputElement().onBlur = () => alert('a')
			  		// this.inputs['blank'].control.onBlur = () => alert('myBlur')
			  	}
			  }} />,
	},
	{
	  title: 'Vat',
	  dataIndex: 'vat',
	  key: 'vat'
	},
	{
	  title: 'Cost Price',
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
		}
	}

	specifyPrice(selectedRecord) {
		/*console.log('Stuffffff');
		alert('111');
		window.alert('222');*/
		// prompt('333');
		// window.prompt('333');
		var newPrice = window.prompt('Please enter the price');

		// alert('newPrice: ' + newPrice);
		if(newPrice !== undefined) {
			var data = this.state.data;
			data = data.map(record => {
				if(record.key == selectedRecord.key) {
					record.retail = Number(newPrice).toFixed(2);	
				}

				return record;
			});
			
			this.setState({data: data});

			var totals = {
				totalCost: 0,
				totalVAT: 0,
				totalRetail: 0
			};

			// alert(JSON.stringify(this.state.data));

			this.state.data.forEach(row => {
				totals.totalCost += parseFloat(row.price.toFixed(2));
				totals.totalVAT += parseFloat(row.vat); //parseFloat(vatCost);
				totals.totalRetail += parseFloat(row.retail); //parseFloat(retail);
			})

			totals.totalRetail = new Number(totals.totalRetail).toFixed(2);
			
			this.Footer.SetTotals(totals);
		}
	}

	handleCellClick(field, e) {
		// return;
		// alert("yo!")
		// prompt('sdfdsfdsf')
		// alert('field: ' + field)
		/*console.clear();
		console.log('field: ' + field)
		console.log('this.currentRecord: ' + JSON.stringify(this.currentRecord));
		console.log('e is ');
		console.dir(e);*/

		// alert(JSON.stringify(e));

		if( e !== undefined && e.name !== undefined ) {
			this.currentRecord['key'] = e.product_id;
			this.currentRecord['name'] = e.name;
			this.currentRecord['price'] = e.price; //new parseInt();

			//alert('currentRecord: ', this.currentRecord);
		} else {
			this.currentRecord[field] = e;

			//alert('currentRecord: ', this.currentRecord);
		}

		console.clear()
		console.dir('currentRecord: ', this.currentRecord);
		// this.currentRecord[field] = e.name !== undefined ? e.name : e; //e.target !== undefined ? e.target.value : e.name; // cater for when string is passed
		//var targetRecord = products.filter(p => p.name == e.name)[0];
		
		var self = this,
			data = this.state.data;

		// alert('currentRecord is ' + JSON.stringify(this.currentRecord));
		// update data with input current record values
		
		// do a duplicate record check
		let recordFound = 0;
		if(field == 'name') {
			console.clear();
			console.dir(data);
			data.forEach((record) => {
				if(record.name == this.currentRecord.name) {
					recordFound++;
					return;
				}
			});

			if(recordFound >= 2) {
				alert(`${this.currentRecord.name} has already been entered. Cannot enter duplicate records`);

				// must select text!!!
				// self.inputs[self.currentRecord.name]['price'].inputNumberRef.input.select();
				this.currentRecord['name'] = '';

				return;
			}
		}
		
		// return;
		data = data.map(record => record.key == self.currentRecord.key ? self.currentRecord : record);
		this.setState({data: data});
		// return;
		if(field == 'name') {
			//this.currentRecord['price'] = targetRecord['price'];

			//! CREATE A NEW EMPTY ROW AFTER THE PRODUCT NAME/BARCODE HAS BEEN SELECTED
			var fields = {vat: 0, retail: 0};
			
			this.props.columns.forEach(col => {
				fields[col] = '';
			})

			data.push({
  	      		key: (self.currentRecord.key + 1),
  	      		...fields
  	      	});

			// alert(self.currentRecord.name)
			setTimeout(() => {
				if(self.inputs[self.currentRecord.name] === undefined) {
	  				self.inputs[self.currentRecord.name] = {};
	  			}
	  	      	self.inputs[self.currentRecord.name]['price'].inputNumberRef.input.select();
	  	      	// self.inputs[self.currentRecord.name]['price'].focus();
	  	      }, 100);
		} else if(field == 'quantity' || field == 'price') {
			// alert(1);
			let vat  = this.state.VAT; //! DLT (DO LATER)

			// this.hasVAT = this.props.VAT; //vat;

			console.log('vat: ' + 1);
			console.log('price: ' + this.currentRecord.price);
			console.log('quantity: ' + this.currentRecord.quantity);

			let _vatCost = ((vat * 0.15 * parseFloat(this.currentRecord.price) * this.currentRecord.quantity * 10) / 10)
			let vatCost = _vatCost.toFixed(2);
			// console.log('quantity: ' + this.currentRecord.quantity);
			
			var retail = new Number((parseFloat(this.currentRecord.price) * this.currentRecord.quantity) + _vatCost).toFixed(2);

			this.currentRecord.vat = vatCost;
			this.currentRecord.retail = retail;

			this.inputs[this.currentRecord.name]['price'].inputNumberRef.input.value = new Number(this.currentRecord.name).toFixed(2)
			// alert('yebo')
		}

		var totals = {
			totalCost: 0,
			totalVAT: 0,
			totalRetail: 0
		};

		// alert(1);
		// alert(JSON.stringify(this.state.data));

		this.state.data.forEach(row => {
			if(row.price !== undefined) {
				if(row.price === '') row.price = 0;

				if(row.price[row.price.length-1] == '.') { console.log('happen?'); row.price = row.price.replace('.', ''); }
				// alert(row.price);
				totals.totalCost += parseFloat(new Number(row.price).toFixed(2));
			}
			totals.totalVAT += parseFloat(row.vat); //parseFloat(vatCost);
			totals.totalRetail += parseFloat(row.retail); //parseFloat(retail);
		})

		// alert(2);
		totals.totalRetail = new Number(totals.totalRetail).toFixed(2);

		this.Footer.SetTotals(totals);

		this.getProductCostDetails(this.currentRecord.key);
		// alert(3);
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
			
			//if(data.price == '') data.price = 0;

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

	getProductCostDetails(productId) {
		axios.get(SERVER_URL + '/receive/cost-history?productId=' + productId) //  this.props.columns.join()
	        .then((response) => {
	            //alert('response.data is ' + JSON.stringify(response.data));
	            //alert('Before: ' + this.state.productCostDetails);
	            response.data = response.data.map(data => ({key: productId, ...data}));
	            //response.data = response.data.concat(this.state.productCostDetails);

	            this.currentRecord.productCostDetails = response.data;
	            // this.setState({ productCostDetails: response.data }); //productCostDetails[productId] = response.data;
	            // alert(JSON.stringify(this.currentRecord));
	        }).catch((err) => {
	            console.log(err);
	        })
	}

	render() {
		return (
		  <Table
		  	onRow={(record) => {
		  	    return {
		  	      onClick: () => {
		  	      	this.currentRecord = record;
		  	      	/*console.clear();
		  	      	console.log('this.currentRecord is now ' + JSON.stringify(record));*/

		  	      	var count = this.state.data.length;
		  	      	var lastRow = this.state.data[count-1];

		  	      	if( lastRow.name !== '' && lastRow.age !== '' && lastRow.address !== '' ) {
		  	      		this.setState({
		  	      			data: [ ...this.state.data, { key: ++count, vat: 0, name: '', price: 0, quantity: 0, retail: 0} ]
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
		  	columns={this.columns} dataSource={this.state.data} expandedRowRender={record => <div><h2>Previous cost prices</h2> <Table columns={[
		      { title: 'Supplier', dataIndex: 'name', key: 'name' },
		      { title: 'Cost', dataIndex: 'amount_per_unit', key: 'amount_per_unit' },
		      { title: 'Date', dataIndex: 'date_issued', key: 'date_issued' },
		    ]} dataSource={record.productCostDetails.reverse()} expanded={true}  /></div>} /> /*{`${record.productCostDetails.name} | ${record.productCostDetails.amount_per_unit} | ${record.productCostDetails.date_issued} `} this.expandedRowRender.bind(this)*/
		)
	}
}

DataTable.defaultProps = { columns: ['name', 'price', 'quantity'] };

export default DataTable;