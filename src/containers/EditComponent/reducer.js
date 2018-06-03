import {
    LOAD_RECORDS_SUCCESS,
    LOAD_TOOLTIPS_SUCCESS,
    LOAD_TOOLTIPS,
    SET_TOOLTIP,
    UPDATE_TOOLTIP
  } from './constants';
  
    const initialState = {
    records: [],
    tooltips: []
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
      case LOAD_TOOLTIPS_SUCCESS:
      {
        // if (state.tooltips.length)
        console.log('LOAD_TOOLTIPS_SUCCESSsss', action.response);
        //  return action.response;
        return Object.assign({}, state, {
          tooltips: action.response
        });
      }
    // case SET_TOOLTIP:
    //   {
    //     console.log('SET_TOOLTIP _SUCCESSsss', action);
    //     break;
    //   }
       
      default:
        return state;
    }
  }
  
  export default RecordsReducer;