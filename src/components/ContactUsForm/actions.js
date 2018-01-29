import { SEND, EMAIL_SENT, CLOSE_ALERT } from './constants';

export function sendEmail(data) {
  return {
    type: SEND,
    data,
  };
}

export function emailSent(response) {
  return {
    type: EMAIL_SENT,
    response,
  }
}

export function closeSendEmailAlert() {
  return {
    type: CLOSE_ALERT,
  }
}

