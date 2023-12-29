import React, { Component } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Table, Icon, Divider, Input, InputNumber, AutoComplete } from 'antd';
import { products, barcodes } from './products'

class Complete extends React.Component {
  state = {
    dataSource: [],
  }

  onSelect = (value, e) => {
    console.log('onSelect', value);

    var product = products.filter(product => product.Barcode == value)[0];


    // alert('Got ' + value + ' => ' + JSON.stringify());

    this.props.onChange(product);
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: barcodes.filter(barcorde => barcorde.indexOf(value) !== -1),
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
		data: [{
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
		}]
	}

	columns = [{
	  title: 'Name',
	  dataIndex: 'name',
	  key: 'name',
	  render: text => text == '' ? <Complete onChange={this.handleCellClick.bind(this, 'name')} /> : <span>{text}</span>
	}, {
	  title: 'Age',
	  dataIndex: 'age',
	  key: 'age',
	  render: text => <InputNumber defaultValue={text} onChange={this.handleCellClick.bind(this, 'age')} />, // 
	}, {
	  title: 'Address',
	  dataIndex: 'address',
	  key: 'address',
	  render: text => <Input Value={text} onChange={this.handleCellClick.bind(this, 'address')} />, // 
	},
	{
	  title: 'Action',
	  key: 'action',
	  render: (text, record) => (
	      record.name == '' ? <span></span> : <a href="#" style={{color:'red'}} onClick={this.handleDelete.bind(this, record)}>Delete</a>
	  ),
	}];

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
		this.currentRecord[field] = e.target !== undefined ? e.target.value : e.Description; // cater for when string is passed

		var self = this,
			data = this.state.data;

		data = data.map(record => record.key == self.currentRecord.key ? self.currentRecord : record);
		
		this.setState({data: data});

		if(field == 'name') {
			data.push({
  	      		key: (self.currentRecord.key + 1),
  	      		name: '',
  	      		age: 0,
  	      		address: ''
  	      	});
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

export default DataTable;