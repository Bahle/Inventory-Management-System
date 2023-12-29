import React, { Component } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Table, Icon, Divider, Input, InputNumber, AutoComplete } from 'antd';
// import { products, barcodes } from './products';
import { SERVER_URL } from '../../constants';
import axios from 'axios';

let products = [], barcodes = [];

function getProductList() {
    axios.get('http://localhost:5000/product') //  this.props.columns.join()
        .then((response) => {
            products = response.data;

            console.log('products is ' + JSON.stringify(products));

            barcodes = products.map(p => p.barcode);
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

    var product = products.filter(product => product.barcode == value)[0]; // Barcode


    // alert('Got ' + value + ' => ' + JSON.stringify());

    this.props.onChange(product);
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: barcodes.filter(barcode => barcode.indexOf(value) !== -1),
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
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
		data: [/*{
		  key: '1',
		  name: 'John Brown',
		  age: 32,
		  address: 'New York No. 1 Lake Park',
		}, {
		  key: '2',
		  name: 'Jim Green',
		  age: 42,
		  address: 'London No. 1 Lake Park',
		}, {
		  key: '3',
		  name: 'Joe Black',
		  age: 32,
		  address: 'Sidney No. 1 Lake Park',
		},
		{
			key: '4',
			name: '',
			age: 0,
			address: '',
		}*/]
	}

	columns = [{
	  title: 'Description',
	  dataIndex: 'name',
	  key: 'name',
	  render: text => text == '' ? <Complete onChange={this.handleCellClick.bind(this, 'name')} /> : <span>{text}</span>
	}, {
	  title: 'Cost',
	  dataIndex: 'price',
	  key: 'price', // 
	}, {
	  title: 'Quantity',
	  dataIndex: 'quantity',
	  key: 'quantity',
	  render: text => <InputNumber defaultValue={text} onChange={this.handleCellClick.bind(this, 'quantity')} />,
	},
	{
	  title: 'Vat',
	  dataIndex: 'vat',
	  key: 'vat'
	},
	{
	  title: 'Retail',
	  dataIndex: 'retail',
	  key: 'retail'
	},
	{
	  title: 'Action',
	  key: 'action',
	  render: (text, record) => (
	      record.name == '' ? <span></span> : <a href="#" style={{color:'red'}} onClick={this.handleDelete.bind(this, record)}>Delete</a>
	  )
	}/*,
	{
	  title: 'Action',
	  key: 'action',
	  render: (text, record) => (
	      record.name == '' ? <span></span> : <a href="#" style={{color:'red'}} onClick={this.handleDelete.bind(this, record)}>Delete</a>
	  )
	}*/];

	// columns = [];

	componentWillMount() {
		getProductList();

		let data = this.state.data;
		data[0] = { key: 1, vat: 0, retail: 0 };

		this.props.columns.forEach(column => {
			data[0][column] = '';

			/*if( column == 'name' ) {
				return {
					title: 'description', // column
					dataIndex: column,
					key: column,
					render: text => text == '' ? <Complete onChange={this.handleCellClick.bind(this, column)} /> : <span>{text}</span>
				}
			} else {
				return {
					title: column == 'price' ? 'cost' : column,
					dataIndex: column,
					key: column,
					render: text => column == 'price' ? <span>{text}</span> : <Input Value={text} onChange={this.handleCellClick.bind(this, column)} />
				}
			}*/
		});

		/*{
		  title: 'VAT',
		  dataIndex: 'vat',
		  key: 'vat',
		}, {
		  title: 'Retail',
		  dataIndex: 'retail',
		  key: 'retail',
		}*/

		/*this.columns.push({
		  title: 'vat',
		  key: 'vat'
		});

		this.columns.push({
		  title: 'retail',
		  key: 'retail'
		});

		this.columns.push({
		  title: 'Action',
		  key: 'action',
		  render: (text, record) => (
		      record.name == '' ? <span></span> : <a href="#" style={{color:'red'}} onClick={this.handleDelete.bind(this, record)}>Delete</a>
		  )
		});*/

		this.setState({data});
	}

	/*componentDidMount() {
		console.log('Running ', SERVER_URL + '/' + this.props.Table);

		axios.get(SERVER_URL + '/' + this.props.Table)
			.then((response) => {
				this.setState({
					tableLoading: false,
					data: response.data
				});
			}).catch((err) => {
				console.log(err);
			})
	}*/

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

	handleCellClick(field, e) {
		// alert('field: ' + field)
		console.clear();
		console.log('e is ');
		console.dir(e);



		this.currentRecord[field] = e.name !== undefined ? e.name : e; //e.target !== undefined ? e.target.value : e.name; // cater for when string is passed
		var targetRecord = products.filter(p => p.name == e.name)[0];
		
		var self = this,
			data = this.state.data;

		data = data.map(record => record.key == self.currentRecord.key ? self.currentRecord : record);
		
		this.setState({data: data});

		if(field == 'name') {
			this.currentRecord['price'] = targetRecord['price'];

			// initialize new row
			var fields = {vat: 0, retail: 0};
			
			this.props.columns.forEach(col => {
				fields[col] = '';
			})

			data.push({
  	      		key: (self.currentRecord.key + 1),
  	      		...fields
  	      	});
		} else if(field == 'quantity') {
			// alert(1);
			var totals = {
				totalCost: 0,
				totalVAT: 0,
				totalRetail: 0
			};

			let vat  = 1; //! DLT (DO LATER)

			this.hasVAT = vat;

			console.log('vat: ' + 1);
			console.log('price: ' + this.currentRecord.price);
			console.log('quantity: ' + this.currentRecord.quantity);

			let _vatCost = ((vat * 0.15 * this.currentRecord.price * this.currentRecord.quantity * 10) / 10)
			let vatCost = _vatCost.toFixed(2);
			// console.log('quantity: ' + this.currentRecord.quantity);
			
			var retail = new Number((this.currentRecord.price * this.currentRecord.quantity) + _vatCost).toFixed(2);

			/*totals.totalCost += parseFloat(data.cost.toFixed(2));
			totals.totalVAT += parseFloat(vatCost);
			totals.totalRetail += parseFloat(retail);*/

			this.currentRecord.vat = vatCost;
			this.currentRecord.retail = retail;
		}
	}

	render() {
		return (
			<DashboardLayout>
				<div>
				  <h2>DataTable</h2>

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
				  	      			data: [ ...this.state.data, { key: ++count, name: '', age: '', address: ''} ]
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
				</div>
			</DashboardLayout>
		)
	}
}

DataTable.defaultProps = { columns: ['name', 'price', 'quantity'] };

export default DataTable;