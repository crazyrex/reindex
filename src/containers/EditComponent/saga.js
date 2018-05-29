import { take, put, call, cancel, select, takeLatest } from 'redux-saga/effects';
import request, { requestNoParse } from 'utils/request';
import config from '../../ReindexConfig';
import { LOAD_RECORDS } from './constants';
import { recordsLoaded} from './actions';

export function* loadRecords(data) {
  
    const requestURL = `${config.apiRoot}records`;
    try {
      const options = {
        method: 'get'
      };
      const response = yield call(request, requestURL, options);
      yield put(recordsLoaded(response));
    } catch (err) {
      console.log(err);
    }
}

// Bootstrap sagas
export default [
  takeLatest(LOAD_RECORDS, loadRecords)
];
