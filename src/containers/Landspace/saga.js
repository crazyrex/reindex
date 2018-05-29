import { take, put, call, cancel, select, takeLatest } from 'redux-saga/effects';
import request, { requestNoParse } from 'utils/request';
import config from '../../ReindexConfig';
import { LOAD_LANDSPACES } from './constants';
import { landspacesLoaded} from './actions';

export function* loadLandspaces(data) {
    const requestURL = `${config.apiRoot}landscape`;
    try {
      const options = {
        method: 'get'
      };
      const response = yield call(request, requestURL, options);
      yield put(landspacesLoaded(response));
    } catch (err) {
      console.log(err);
    }
}

// Bootstrap sagas
export default [
  takeLatest(LOAD_LANDSPACES, loadLandspaces)
];
