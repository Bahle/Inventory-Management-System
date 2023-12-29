import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { SERVER_URL } from '../../../constants';
import { Upload, Icon, message, Select } from 'antd';
import UserProfile from '../../../UserProfile';

const Dragger = Upload.Dragger;
const { Option } = Select;

const props = {
  name: 'file',
  multiple: false,
  // action: SERVER_URL + '/daily-sales/shit' + branch,
  onChange(info) {
    console.clear();
    console.log(info)

    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
}

class Import extends Component {
	constructor() {
    super();
    if(UserProfile.isViewOnly()) {
      alert('You are not authorized to view this page.');
      window.location = '/';
    }

    this.state = {
      branch: null
    }
  }

  render() {
		return (
			!UserProfile.isViewOnly() && <DashboardLayout title='Excel Import'>
				<div>
          <h2 style={{float:'left'}}>Please select the branch: </h2>
          &nbsp;&nbsp;
          <Select onChange={value => this.setState({branch: value}) } style={{width: 120}} defaultValue="">
            <Option value="">-- Select --</Option>
            <Option value="LNDC">LNDC</Option>
            <Option value="Kingsway">Kingsway</Option>
          </Select>   
        </div>

        <br/>

        {
          this.state.branch && <Dragger {...props} action={SERVER_URL + '/daily-sales/' + this.state.branch}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a excel file formt. Other file types not permissible.</p>
            </Dragger>
        }
			</DashboardLayout>
		)
	}
}

export default Import;