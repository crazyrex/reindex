import {
  UPDATE_SCORE,
  SCORE_UPDATE_SUCCESS,
  CLOSE_ALERT,
} from './constants';

export function updateScore(data) {
  return {
    type: UPDATE_SCORE,
    data,
  };
}

export function scoreUpdateSuccess(data) {
  return {
    type: SCORE_UPDATE_SUCCESS,
    data,
  };
}

export function closeRecordSettingsAlert() {
  return {
    type: CLOSE_ALERT,
  };
}
