import {
    LOAD_TOOLTIPS_SUCCESS,
    LOAD_TOOLTIPS,
    SET_TOOLTIP,
    UPDATE_TOOLTIP
  } from './constants';
  
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

  export function updateTooltips(data) {
    return {
      type: LOAD_TOOLTIPS,
      data
    };
  }
  export function setTooltips(data) {
    return {
      type: LOAD_TOOLTIPS,
      data
    };
  }