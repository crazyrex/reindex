import {
    LOAD_RECORDS_SUCCESS,
    LOAD_TOOLTIPS_SUCCESS,
    LOAD_TOOLTIPS,
    SET_TOOLTIP,
    SET_TOOLTIP_SUCCESS,
    DELETE_TOOLTIP_SUCCESS,
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
          tooltips: action.response.tooltips
        });
      }
     case SET_TOOLTIP_SUCCESS:
      {
         console.log('SET_TOOLTIP_SUCCESSsss', action);
             return null;
     //    return Object.assign({}, state, {
       //   tooltips: action.response.tooltips
        //});
     }
     case DELETE_TOOLTIP_SUCCESS:
     {
        const index=state.tooltips.map(function(x){ return x._id; }).indexOf(action.id);
        state.tooltips.splice(index,1);
             return Object.assign({}, state, {
             tooltips
       });

      return state;
    }
      default:
        return state;
    }
  }
  
  export default RecordsReducer;