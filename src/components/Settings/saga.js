import { take, put, call, cancel, takeLatest } from 'redux-saga/effects';
import { requestNoParse } from 'utils/request';
import config from 'config';
import { CREATE_SETTING ,GET_SETTING } from './constants';
import { settingCreated, settingsFailed } from './actions';


export function* createSetting(data) {
  const requestURL = `${config.apiRoot}settings`;
  try {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = yield call(requestNoParse, requestURL, options);
    yield put(settingCreated(response));
  } catch (err) {
    console.log(err);
    yield put(settingsFailed(err));
  }
}

export default [
  takeLatest(CREATE_SETTING, createSetting),
];

  // takeLatest(GET_SETTING, getSetting)
