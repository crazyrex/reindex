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

import './SendEmailForm.scss';

const renderField = ({ input, label, meta: { touched, error } , ...custom}) => (
    <TextField
      hintText={label}
      className={`wrapper-input ${custom.class}`}
      errorText={touched && error}
      {...input}
    />
);

renderField.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
};

let SendEmailForm = class SendEmailForm extends React.Component {
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
      <div className="wrapper-send-email-form">
          <form onSubmit={this.props.handleSubmit(this.sendEmail.bind(this))}>
            <Field name="name" type="text" component={renderField} label="שם:" props={{ class: 'sm' }} />
            <Field name="phone" type="text" component={renderField} label="טלפון:" props={{ class: 'sm' }} />
            <Field name="email" type="email" component={renderField} label='דוא"ל:' props={{ class: 'med' }} />
            {this.props.src !== 'LANDING_PAGE' ? 
            <Field name="search_text" type="text" component={renderField} label="חיפשתי:" props={{ class: 'lg' }} /> : '' }
            <FlatButton label="שלח" className="send-btn no-icon" style={{ display: 'none' }} type="submit" disabled={this.state.disableBtn}/>
            <FloatingActionButton mini className="send-btn" type="submit" disabled={this.state.disableBtn}>
              <SendIcon />
            </FloatingActionButton>
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

SendEmailForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  sendEmailAlert: React.PropTypes.object,
  closeEmailAlertInParent: React.PropTypes.func,
  closeSendEmailAlert: React.PropTypes.func,
  src: React.PropTypes.string,
};

export function mapStateToProps(state) {
  return {
    sendEmailAlert: state.sendEmailForm.sendEmailAlert,
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

SendEmailForm = reduxForm({
  form: 'sendEmail',
  validate,
})(SendEmailForm);

SendEmailForm = connect(
  mapStateToProps, mapDispatchToProps
)(SendEmailForm);

export default { SendEmailForm }.SendEmailForm;


