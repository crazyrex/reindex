import {
  LOAD_TOOLTIPS_SUCCESS,
  LOAD_TOOLTIPS,
  SET_TOOLTIP,
  UPDATE_TOOLTIP
  } from './constants';
  
    const initialState = {
    tooltips: []
  };
  
  function TooltipsReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_TOOLTIPS_SUCCESS:{
        // if (state.tooltips.length)
        console.log('LOAD_TOOLTIPS_SUCCESSsss',action.response);
        //  return action.response;
        return Object.assign({}, state, {
          tooltips: action.response
      });
      }
      case SET_TOOLTIP:{
      
      }
      // case LOAD_TOOLTIPS:{
      //   // if (state.tooltips.length)
      //   console.log('LOAD_TOOLTIPS_SUCCESSsss',action.response);
      //   //  return action.response;
      //   return Object.assign({}, state, {
      //     tooltips: action.response
      // });
      // }
      case UPDATE_TOOLTIP:{
      
      }
      default:
        return state;
    }
  }
  
  export default TooltipsReducer;