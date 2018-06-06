import { take, put, call, cancel, select, takeLatest } from 'redux-saga/effects';
import request, { requestNoParse } from 'utils/request';
import config from '../../ReindexConfig';
import { LOAD_RECORDS,LOAD_TOOLTIPS,SET_TOOLTIP,UPDATE_TOOLTIP,LOAD_TOOLTIPS_SUCCESS, DELETE_TOOLTIP } from './constants';
import { recordsLoaded,tooltipsLoaded } from './actions';

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
///TOOLTIPS
export function* loadtooltips(data) {
  const requestURL = `${config.apiRoot}landscape/tooltip`;
  try {
    const options = {
      method: 'get'
    };
    const response = yield call(request, requestURL, options);
    yield put(tooltipsLoaded(response));
  } catch (err) {
    console.log(err);
  }

}

export function* setTooltip(data) {
  console.log('SAGA function* setTooltip ',data)
  const requestURL = `${config.apiRoot}landscape/tooltip`;
  try {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
         Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(data.data),
    };
    const response = yield call(requestNoParse, requestURL, options);
    if (typeof response === 'string') console.log(response);
    // yield put(tooltipUpdated(response));
  } catch (err) {
    console.log(err);
  }
}
 export function* updateTooltip(data) {
    const requestURL = `${config.apiRoot}landscape/tooltip/${data.data._id}`;
    try {
      const options = {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
           Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(data.data),
      };
      const response = yield call(requestNoParse, requestURL, options);
      if (typeof response === 'string') console.log(response);
      // yield put(tooltipUpdated(response));
    } catch (err) {
      console.log(err);
    }
  }
export function* deleteTooltip(data) {
  console.log('ssssagggaa deleteTooltip data ', data);
    const requestURL = `${config.apiRoot}landscape/tooltip/${data.data}`;
    try {  
      const options = {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      };
      const response = yield call(requestNoParse, requestURL, options);
    } catch (err) {
      console.log(err);
    }
  }

// Bootstrap sagas
export default [
  takeLatest(LOAD_RECORDS, loadRecords),
  takeLatest(LOAD_TOOLTIPS, loadtooltips),
  takeLatest(SET_TOOLTIP, setTooltip),
  takeLatest(UPDATE_TOOLTIP, updateTooltip),
  takeLatest(DELETE_TOOLTIP, deleteTooltip)
];
