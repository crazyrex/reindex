import {
    LOAD_RECORDS_SUCCESS,
    LOAD_RECORDS
  } from './constants';
  
  export function loadRecords(data) {
      console.log('action');
    return {
      type: LOAD_RECORDS,
      data
    };
  }

  export function recordsLoaded(response) {
    console.log('rrrecordsLoaded');
    return {
        type:LOAD_RECORDS_SUCCESS,
        response
    };
  }