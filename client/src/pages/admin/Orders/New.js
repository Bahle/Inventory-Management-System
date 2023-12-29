import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Transfer, Button } from 'antd';
import axios from 'axios';

class NewOrder extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    //this.getMock();

    axios.get('/product')
      .then((response) => {
        //alert('response.data: ' + JSON.stringify(response.data))

        const targetKeys = [];
        const data = response.data.map(data => {
          //return data.name + '-' + data.pack_size;
          targetKeys.push(data.product_id);

          return {
            key: data.product_id,
            title: data.name,
            description: data.pack_size,
            //chosen: Math.random() * 2 > 1,
          }
        });

        console.clear()
        console.log('data', data)

        this.setState({
          tableLoading: false,
          mockData: data
        });
      }).catch((err) => {
        console.log(err);
      })
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  renderFooter = () => (
    <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getMock}>
      reload
    </Button>
  );

  render() {
    return (
      <DashboardLayout title="New Order">
        <Transfer
          dataSource={this.state.mockData}
          showSearch
          listStyle={{
            width: 300,
            height: 300,
          }}
          operations={['to right', 'to left']}
          targetKeys={this.state.targetKeys}
          onChange={this.handleChange}
          render={item => `${item.title}-${item.description}`}
          footer={this.renderFooter}
        />

        <div style={{float: 'right', marginTop: 20}}>
          <Button style={{marginLeft: 10}}>Close</Button>
          <Button type="primary" style={{marginLeft: 10}}>Save</Button>
          <a href="/samples/Husteds Order List.pdf" style={{marginLeft: 10}}>
            <Button type="primary">Save &amp; Print</Button>
          </a>
        </div>
      </DashboardLayout>
    );
  }
}

export default NewOrder;