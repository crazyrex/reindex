import { CREATE_SETTING, CREATE_SETTING_SUCCESS, CREATE_SETTING_FAILED, GET_SETTING} from './constants';

export function createSetting(record) {
  return {
    type: CREATE_SETTING,
    record,
  };
}

export function getSetting(response) {
  return {
    type: GET_SETTING,
    response,
  };
}

export function settingCreated(response) {
  return {
    type: CREATE_RECORD_SUCCESS,
    response,
  };
}

export function settingsFailed(response) {
  return {
    type: CREATE_RECORD_FAILED,
    response,
  };
}