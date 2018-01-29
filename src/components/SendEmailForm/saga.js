import { take, put, call, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request, { requestNoParse } from 'utils/request';
import config from '402Config';
import { SEND } from './constants';
import { sendEmail, emailSent } from './actions';

export function* send(data) {
  const requestURL = `${config.apiRoot}email/send`;
  try {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.data),
    };
    const response = yield call(requestNoParse, requestURL, options);
    yield put(emailSent(response));
  } catch (err) {
    console.log(err);
  }
}

export default [
  takeLatest(SEND, send),

];