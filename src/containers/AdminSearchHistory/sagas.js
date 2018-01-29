import { take, put, call, cancel, select, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import config from '402Config';
import { LOAD_HISTORY } from './constants';
import { historyLoaded } from './actions';


export function* loadHistory(data) {
  const requestURL = `${config.apiRoot}history?offset=${data.data.page}`;
  try {
    const options = {
      method: 'get',
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    };
    const response = yield call(request, requestURL, options);
    yield put(historyLoaded(response));
  } catch (err) {
    console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
// export function* adminSearchHistoryData() {
//   const loadHistoryWatcher = yield takeLatest(LOAD_HISTORY, loadHistory);

//   // Suspend execution until location changes
//   yield take(LOCATION_CHANGE);
//   yield cancel(loadHistoryWatcher);
// }

// Bootstrap sagas
export default [
  takeLatest(LOAD_HISTORY, loadHistory),
];
