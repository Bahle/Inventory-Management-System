import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class Dialog extends Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });

    // alert('this.props.triggerCallback: ' + JSON.stringify(this.props.triggerCallback));

    if( this.props.triggerCallback !== undefined ) this.props.triggerCallback();
  }
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });

    if( this.props.OkCallback !== undefined ) this.props.OkCallback();
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });

    if( this.props.cancelCallback !== undefined ) this.props.cancelCallback();
  }
  render() {
    return (
      <div>
        <Button type="primary" style={{ float: 'right' }} onClick={this.showModal.bind(this)}>{this.props.triggerButtonText}</Button>
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={this.props.width || '1030px'}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default Dialog;