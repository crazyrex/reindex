import {
    LANDSPACES_SUCCESS
  } from './constants';
  
  
  // The initial state of the App
  const initialState = {
    landspaces: []
  };
  
  function LandspaceReducer(state = initialState, action) {
    switch (action.type) {
      case LANDSPACES_SUCCESS:
        if (state.landspaces.length) return state;
        return Object.assign({}, state, {
            landspaces: buildLandspaces(action.response.landscapes),//action.response.landspaces,
        });
      default:
        return state;
    }
  }

  function buildLandspaces(landscapes) {
    return(landscapes.map(function(l){
      return({
        shape: l.shape,
        coords: (l.coords || "544,544,597,568").split(','),
        id: l._id,
        business_name: l.record.business_name,
        business_description: l.record.business_description,
      });
    }))
    // return [
    //   { "shape": "rect", "coords": [80,203,139,220], href:"https://www.npmjs.com/package/react-image-mapper"},
    //   { "shape": "rect", "coords": [544,544,597,568], name: '777777' },
    //   { "shape": "rect", "coords": [533,519,612,536] },
    //   { "shape": "poly", "coords": [245,285,290,285,274,239,249,238] },
    // ]
  }
  
  export default LandspaceReducer;