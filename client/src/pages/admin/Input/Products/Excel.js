import React, { Component } from 'react';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import { SERVER_URL } from '../../../../constants';
import { Upload, Icon, message } from 'antd';
import UserProfile from '../../../../UserProfile';

const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: false,
  action: SERVER_URL + '/product-list',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class Import extends Component {
	constructor() {
    super();
    if(UserProfile.isViewOnly()) {
      alert('You are not authorized to view this page.');
      window.location = '/';
    }
  }

  render() {
		return (
			!UserProfile.isViewOnly() && <DashboardLayout title='Excel Import'>
				<Dragger {...props}>
				  <p className="ant-upload-drag-icon">
				    <Icon type="inbox" />
				  </p>
				  <p className="ant-upload-text">Click or drag file to this area to upload</p>
				  <p className="ant-upload-hint">Support for a excel file formt. Other file types not permissible.</p>
				</Dragger>
			</DashboardLayout>
		)
	}
}

export default Import;