import {
    LANDSPACES_SUCCESS,
    LOAD_LANDSPACES
  } from './constants';
  
  export function loadLandspaces(data) {
      console.log('action')
    return {
      type: LOAD_LANDSPACES,
      data
    };
  }

  export function landspacesLoaded(response) {
    console.log('landspacesLoaded')
    return {
        type: LANDSPACES_SUCCESS,
        response
    };
  }