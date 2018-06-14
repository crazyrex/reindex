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
    case LOAD_RECORDS_SUCCESS:
      {
        // if (state.records.length)
        console.log('LOAD_RECORDS_SUCCESSssss', action.response);
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
        debugger;
        console.log('SET_TOOLTIP_SUCCESSsss', action);
        //delete the last one without id
        state.tooltips.splice(state.tooltips.length-1, 1);
        state.tooltips.push(action.response.tooltips);
           return Object.assign({}, state, {
          tooltips: state.tooltips
        });
      }
    case DELETE_TOOLTIP_SUCCESS:
      {
        console.log('tooltipsssss',action.response);//addddddd if dellete by num>0
        const index = state.tooltips.map(function (x) {
          return x._id;
        }).indexOf(action.id);
        state.tooltips.splice(index, 1);
        console.log('tooltipsssss',state.tooltips);

        return Object.assign({}, state, {
          tooltips:state.tooltips
        });
      }
    default:
      return state;
  }
}

export default RecordsReducer;