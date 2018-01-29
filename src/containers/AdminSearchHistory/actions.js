import {
  LOAD_HISTORY,
  LOAD_HISTORY_SUCCESS,
} from './constants';


export function loadHistory(data) {
  return {
    type: LOAD_HISTORY,
    data
  };
}

export function historyLoaded(response) {
  return {
    type: LOAD_HISTORY_SUCCESS,
    response,
  };
}
