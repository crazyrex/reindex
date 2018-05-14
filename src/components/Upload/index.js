import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadRequest } from './actions';
import UploadFile from 'rc-upload';
import config from 'ReindexConfig';
import FlatButton from 'material-ui/FlatButton';



class Upload extends Component {

  constructor(props) {
    super(props);
    this.change1 = this.change1.bind(this);
    this.change2 = this.change2.bind(this);
    this.change3 = this.change3.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      type: '',
      cat: '',
      city: '',
      uploaderProps: ''

    };


  }


  handleChange(e) {
    let uploaderProps = {
      action: `${config.apiRoot}uploadFile?type=` + this.state.type + `&cat=` + this.state.cat + `&city=` + this.state.city,
      beforeUpload(file) {
        console.log('beforeUpload', file.name);
      },
      onStart: (file) => {
        console.log('onStart', file.name);
        // this.refs.inner.abort(file);
      },
      onSuccess(file) {
        console.log('onSuccess', file);
      },
      onProgress(step, file) {
        console.log('onProgress', Math.round(step.percent), file.name);
      },
      onError(err) {
        console.log('onError', err);
      },
    };
    this.setState({
      uploaderProps: uploaderProps
    })

  }
  change1(e) {
    this.setState({ type: e.target.value }, function () {
      this.handleChange()
    });
  }
  change2(e) {
    this.setState({ cat: e.target.value }, function () {
      this.handleChange()
    });
  }
  change3(e) {
    this.setState({ city: e.target.value }, function () {
      this.handleChange()
    });

  }




  render() {
    return (
      <div>
<<<<<<< HEAD
        <input type="text" value={this.state.input1} placeholder="type" name="input1" onChange={this.change1} />
        <input type="text" value={this.state.input2} placeholder="category" name="input2" onChange={this.change2} />
        <input type="text" value={this.state.input2} placeholder="city" name="input3" onChange={this.change3} />
=======
        <input type="text" value={this.state.input1} placeholder="Type" name="input1" onChange={this.change1} />
        <input type="text" value={this.state.input2} placeholder="Category" name="input2" onChange={this.change2} />
        <input type="text" value={this.state.input2} placeholder="City" name="input3" onChange={this.change3} />
>>>>>>> a51e95b0694017d963d92c219c0ecb8df96a562d

        <UploadFile {...this.state.uploaderProps} >
          <a>
            <FlatButton label='Upload CSV File' />
          </a>
        </UploadFile>
      </div>
    );
  }
}


export default Upload;


