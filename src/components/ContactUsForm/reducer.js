import { EMAIL_SENT, CLOSE_ALERT } from './constants';


// The initial state of the App
const initialState = {
  sendEmailAlert: {
    open: false,
    text: '',
  }
};

function ContactUsFormReducer(state = initialState, action) {
  switch (action.type) {
    case EMAIL_SENT:
      return Object.assign({}, state, {
        sendEmailAlert: Object.assign({}, state.sendEmailAlert, {
          open: true,
          text: action.response,
        }),
      });
    case CLOSE_ALERT:
      return Object.assign({}, state, {
        sendEmailAlert: Object.assign({}, state.sendEmailAlert, {
          open: false,
          text: '',
        }),
      });
    default:
      return state;
  }
}

export default ContactUsFormReducer;
