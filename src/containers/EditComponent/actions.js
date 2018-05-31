import {
    LOAD_RECORDS_SUCCESS,
    LOAD_RECORDS
  } from './constants';
  
  export function loadRecords(data) {
    return {
      type: LOAD_RECORDS,
      data
    };
  }

  export function recordsLoaded(response) {
    return {
        type:LOAD_RECORDS_SUCCESS,
        response
    };
  }