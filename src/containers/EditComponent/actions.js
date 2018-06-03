import {
    LOAD_RECORDS_SUCCESS,
    LOAD_RECORDS,
    LOAD_TOOLTIPS_SUCCESS,
    LOAD_TOOLTIPS,
    SET_TOOLTIP,
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


  export function loadTooltips(data) {
    return {
      type: LOAD_TOOLTIPS,
      data
    };
  }

  export function tooltipsLoaded(response) {
    console.log('TOOLTIPS Loaded');
    return {
        type:LOAD_TOOLTIPS_SUCCESS,
        response
    };
  }

  // export function updateTooltips(data) {
  //   return {
  //     type: LOAD_TOOLTIPS,
  //     data
  //   };
  // }
  export function setTooltip(data) {
    return {
      type: SET_TOOLTIP,
      data
    };
  }