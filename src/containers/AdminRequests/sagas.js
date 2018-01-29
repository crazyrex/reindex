import { take, put, call, cancel, select, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request, { requestNoParse } from 'utils/request';
import config from '402Config';
import { LOAD_REQUESTS, APPROVE_REQUEST, DELETE_REQUEST, UPDATE_REQUEST } from './constants';
import { requestsLoaded, requestUpdated } from './actions';

export function* loadRequests() {
  const requestURL = `${config.apiRoot}requests`;
  try {
    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    };
    const requests = yield call(request, requestURL, options);
    yield put(requestsLoaded(requests));
  } catch (err) {
    console.log(err);
  }
}

export function* approveRequest(data) {
  const requestURL = `${config.apiRoot}approveRequest/${data.requestId}`;
  try {
    const options = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    };
    const response = yield call(requestNoParse, requestURL, options);
    if (typeof response === 'string') alert(response);
    yield loadRequests();
  } catch (err) {
    err.then((data) => alert(data)); 
  }
}

export function* deleteRequest(data) {
  const requestURL = `${config.apiRoot}requests/${data.requestId}`;
  try {
    const options = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    };
    const response = yield call(requestNoParse, requestURL, options);
    if (typeof response === 'string') alert(response);
    yield loadRequests();
  } catch (err) {
    err.then((data) => alert(data));
  }
}

export function* updateRequest(data) {
  const requestURL = `${config.apiRoot}requests/${data.request.values._id}`;
  data.request.values.categories = data.request.categories;
  try {
    const options = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(data.request.values),
    };
    const response = yield call(requestNoParse, requestURL, options);
    if (typeof response === 'string') alert(response);
    yield loadRequests(response);
  } catch (err) {
    err.then((data) => alert(data)); 
  }
}

// export function* adminRequestsData() {
//   const loadRequestsWatcher = yield takeLatest(LOAD_REQUESTS, loadRequests);
//   const approveWatcher = yield takeLatest(APPROVE_REQUEST, approveRequest);
//   const deleteWatcher = yield takeLatest(DELETE_REQUEST, deleteRequest);
//   const updateWatcher = yield takeLatest(UPDATE_REQUEST, updateRequest);
//   // Suspend execution until location changes
//   yield take(LOCATION_CHANGE);
//   yield cancel(loadRequestsWatcher);
//   yield cancel(approveWatcher);
//   yield cancel(deleteWatcher);
//   yield cancel(updateWatcher);
// }

// Bootstrap sagas
export default [
  takeLatest(LOAD_REQUESTS, loadRequests),
  takeLatest(APPROVE_REQUEST, approveRequest),
  takeLatest(DELETE_REQUEST, deleteRequest),
  takeLatest(UPDATE_REQUEST, updateRequest),
];
