import {
  LOAD_HISTORY_SUCCESS,
} from './constants';



// The initial state of the App
const initialState = {
  history: [],
};

function adminSearchHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        history: action.response.data,
        totalResults: action.response.totalCount,
        limitResults: action.response.limit,
      });

    default:
      return state;
  }
}

export default adminSearchHistoryReducer;
