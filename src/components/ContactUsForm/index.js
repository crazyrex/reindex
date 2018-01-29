import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import SendIcon from 'material-ui/svg-icons/hardware/keyboard-backspace';
import validate from './validate';
import config from '../../402Config';
import { sendEmail, closeSendEmailAlert } from './actions';
import RaisedButton from 'material-ui/RaisedButton';




const renderField = ({ input, label,rows,multiLine, meta: { touched, error } , ...custom}) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      className={`wrapper-input ${custom.class}`}
      errorText={touched && error}
      rows={rows}
      multiLine={multiLine}
      {...input}
    />
);

renderField.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
};

let ContactUsForm = class ContactUsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableBtn: false,
    };
    this.closeSendEmailAlert = this.closeSendEmailAlert.bind(this);
  }

  sendEmail(values) {
    this.setState({
      disableBtn: true,
    });
    this.props.sendEmail(values, this.props.to, this.props.src);
  }
  closeSendEmailAlert() {
    this.props.closeEmailAlertInParent();
    this.props.closeSendEmailAlert();
  }

  render() {
    return (
      <div>
          <form onSubmit={this.props.handleSubmit(this.sendEmail.bind(this))}>
             <div className="fields">
    <Field name="name"  type="text" rows={1} component={renderField} label=" שם מלא"  />
    <Field name="phone" type="text" rows={1} component={renderField} label="טלפון"  />
    <Field name="email" type="email" rows={1} component={renderField} label="דוא”ל"/>
    <Field name="message" type="text" rows={5} component={renderField} multiLine={true} label="הודעה"  />
   </div>
   <RaisedButton className="submitBtn" type="submit" label="שלח"  />
          </form>
        <Snackbar
          open={this.props.sendEmailAlert.open}
          message={this.props.sendEmailAlert.text}
          autoHideDuration={4000}
          onRequestClose={this.closeSendEmailAlert}
        />
      </div>
    );
  }
};

ContactUsForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  sendEmailAlert: React.PropTypes.object,
  closeEmailAlertInParent: React.PropTypes.func,
  closeSendEmailAlert: React.PropTypes.func,
  src: React.PropTypes.string,
};

export function mapStateToProps(state) {
  return {
    sendEmailAlert: state.contactUsForm.sendEmailAlert,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    sendEmail: (values, to, subject) => {
      values.to = to;
      values.subject = subject;
      dispatch(sendEmail(values));
    },
    closeSendEmailAlert: () => {
      dispatch(closeSendEmailAlert());
    }
  };
}

function getErrorFieldNames(obj, name = '') {
  const errorArr = [];
  errorArr.push(Object.keys(obj).map((key) => {
    const next = obj[key];
    if (next) {
      if (typeof next === 'string') {
        return name + key;
      }
      // Keep looking
      if (next.map) {
        errorArr.push(next.map((item, index) => getErrorFieldNames(item, `${name}${key}[${index}].`)).filter(o => o));
      }
    }
    return null;
  }).filter(o => o));
  return flatten(errorArr);
}

function flatten(arr) {
  return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);
}

  export function scrollToFirstError (errors) {
  let errorFields = getErrorFieldNames(errors);
  let flag = false;
  if(!errorFields.length){
      errorFields = getErrorFieldNames(errors.sender);
       flag = true;
  }
  // Using breakable for loop
  for (let i = 0; i < errorFields.length; i++) {
    let fieldName;
    fieldName =`${errorFields[i]}`;
    if (document.querySelectorAll(`[name="${fieldName}"]`).length) {
       document.getElementsByName(`${fieldName}`)[0].focus()
      break;
    }
  }
}


ContactUsForm = reduxForm({
  form: 'contactUs',
  onSubmitFail: (errors) => scrollToFirstError(errors),
  validate,
})(ContactUsForm);

ContactUsForm = connect(
  mapStateToProps, mapDispatchToProps
)(ContactUsForm);

export default { ContactUsForm }.ContactUsForm;



