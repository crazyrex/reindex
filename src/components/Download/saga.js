import { take, put, call, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import request from 'utils/request';
import config from '402Config';
import { DOWNLOAD_FILE } from './constants';
// import { downloadFile } from './actions';


export function* downloadFile(data) {
  console.log('data',data)
  const requestURL = `${config.apiRoot}downloadFile`;
  try {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.data.obj),
    };
    const response = yield call(request, requestURL, options);
    if (response.succsess)
       browserHistory.push('/download');
     else alert('not found');
  } catch (err) {
    console.log(err);
    //  browserHistory.push('/download');
  }
}


export default [
  takeLatest(DOWNLOAD_FILE, downloadFile),
];

