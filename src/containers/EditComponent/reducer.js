import {
    LOAD_RECORDS_SUCCESS
  } from './constants';
  
    const initialState = {
    records: []
  };
  
  function RecordsReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_RECORDS_SUCCESS:{
        // if (state.records.length)
        console.log('LOAD_RECORDS_SUCCESSssss',action.response);
        //  return action.response;
        return Object.assign({}, state, {
          records: action.response
      });
      }
       
      default:
        return state;
    }
  }
  
  export default RecordsReducer;