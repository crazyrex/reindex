import {
    LANDSCAPES_SUCCESS
  } from './constants';
  
  
  // The initial state of the App
  const initialState = {
    landscapes: []
  };
  
  function LandscapeReducer(state = initialState, action) {
    switch (action.type) {
      case LANDSCAPES_SUCCESS:
        if (state.landscapes.length) return state;
        return Object.assign({}, state, {
            landscapes: buildLandscapes(action.response.landscapes)
        });
      default:
        return state;
    }
  }

  function buildLandscapes(landscapes) {
    return(landscapes.map(function(l){
      return({
        shape: l.shape,
        coords: (l.coords || "544,544,597,568").split(','),
        id: l._id,
        business_name: l.record.business_name,
        business_description: l.record.business_description,
      });
    }))
  }
  
  export default LandscapeReducer;