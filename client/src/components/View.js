import React, { Component } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import axios from 'axios';
import { SERVER_URL } from '../constants';
import { fieldLabel } from '../utils';
import { Form, Input, Select, Col, Row, Button, Radio, Icon } from 'antd';
import { Redirect, Link } from 'react-router-dom'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton  = Radio.Button;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class MyForm extends Component {
	state = { data: {} }

	/* constructor(props) {
		super(props);
		if(props.SpecialFields === undefined) props.SpecialFields = {};
	} */

	id = window.location.pathname.split('/')[4];

	componentDidMount() {
			axios.get(SERVER_URL + `/${this.props.Table}?id=${this.id}`)
				.then(response => {
					console.log('Got from server: ' + JSON.stringify(response.data[0]));

					this.setState({data: response.data[0]})
				})
				.catch(error => console.log(error));
	}

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

	  	var fields = [];

	  	for(let item in this.state.data) {
	      	fields.push(<div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
		      	<Col span={24}>
		      		{ /* cater for special fields else display text */ }
			      	<FormItem
			          label={ this.props.SpecialFields[item] === undefined ? fieldLabel(item) : this.props.SpecialFields[item].label }>
			          	{ this.props.SpecialFields[item] === undefined ?
				          	<h4>{this.state.data[item]}</h4>
				          : (this.props.SpecialFields[item].type == 'boolean' ?
				          	<h4>{this.state.data[item] ? "Yes" : "No"}</h4> : <h4>{this.state.data[item]}</h4>
				          )
				        }
			        </FormItem>
			    </Col>
		    </div>)
	    }

	    return (
	      <Form layout="inline" onSubmit={this.handleSubmit}>
	      	{ fields }

		    <div style={{ display: 'inline-block', width: '100%' }}>
            	<Link to={{ pathname: `../e/${this.id}`, state: this.state.data }} >
            		<Button type="primary" size="large" style={{ float: 'right', width: '120px', margin: '0 5px' }}>Edit</Button>
            	</Link>
            	<Link to="../"><Button type="default" size="large" style={{ float: 'right', width: '120px', margin: '0 5px' }}>Cancel</Button></Link>
            </div>
	      </Form>
	      )
	}
}

MyForm.defaultProps = {
	SpecialFields: {}
}

const WrappedForm = Form.create()(MyForm);

class View extends Component {
	render() {
		return (
			<DashboardLayout title={ this.props.Title }>
				<WrappedForm Title={ this.props.Title } Table={ this.props.Table } SpecialFields={ this.props.SpecialFields } />
			</DashboardLayout>
		)
	}
}

export default View;