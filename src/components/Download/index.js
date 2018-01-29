import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '402Config';
import FlatButton from 'material-ui/FlatButton';
import { downloadFile } from './actions';



class Download extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.downloadFile = this.downloadFile.bind(this);
		this.state = {
			input1: '',
			input2: ''
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	downloadFile() {
		this.props.downloadFile({'type':this.state.input1,'cat': this.state.input2 || '', 'city':this.state.input3});
	}


	render() {
		return (
			<div>
				<div>
					<input type="text" value={this.state.input1} placeholder="סוג" name="input1" onChange={this.handleChange} />
					<input type="text" value={this.state.input2} placeholder="קטגוריה" name="input2" onChange={this.handleChange} />
					<input type="text" value={this.state.input3} placeholder="עיר" name="input3" onChange={this.handleChange} />
					<FlatButton className="downloadBtn" onClick={this.downloadFile} labelStyle={{ paddingRight: 20, paddingLeft: 20, fontSize: 16 }} label="הורד קובץ" />
				</div>
			</div>
		);
	}
}


export function mapStateToProps(state) {
	return {

	};
}

export function mapDispatchToProps(dispatch) {
	return {
		downloadFile: (obj) => {
			dispatch(downloadFile({ obj }));
		},

	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Download);


