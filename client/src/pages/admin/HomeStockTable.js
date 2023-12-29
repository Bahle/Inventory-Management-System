import React, { Component, Fragment } from 'react';
import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <div size="middle">
        <a>Add</a>
      </div>
    ),
  },
];

const data = [
  {
    key: '2',
    name: 'Panado',
    total: 20,
  },
  {
    key: '2',
    name: 'Aspirin',
    total: 25,
  },
  {
    key: '3',
    name: 'Dichlotop',
    total: 18,
  },
  {
    key: '4',
    name: 'Mybulen',
    total: 54,
  },

];

const Widget = () => <Table columns={columns} dataSource={data} />;

export default Widget;