import React, { Component, Fragment } from 'react';
import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'Branch',
    dataIndex: 'branch',
    key: 'branch',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <div size="middle">
        <a>View</a>
      </div>
    ),
  },
];

const data = [
  {
    key: '2',
    branch: 'Kingsway',
    total: 32,
    status: 'complete',
    date: '21 Sep 12:10',
  },
  {
    key: '2',
    branch: 'LNDC',
    total: 64,
    status: 'pending',
    date: '24 Sep 13:07',
  },
  {
    key: '3',
    branch: 'Kingsway',
    total: 32,
    status: 'pending',
    date: '25 Sep 14:40',
  },
];

const Widget = () => <Table columns={columns} dataSource={data} />;

export default Widget;