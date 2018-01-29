import {
  LOAD_REQUESTS_SUCCESS,
} from './constants';


// The initial state of the App
const initialState = {
  requests: [],
};

function adminRequestsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        requests: action.requests,
      });
    default:
      return state;
  }
}

export default adminRequestsReducer;
