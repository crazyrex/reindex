import React from 'react';
require('./Mapbox.scss');

class GovMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('ppppp',govmap)
    if (nextProps.location.latitude && nextProps.location.longitude)
       govmap.createMap('map', {  
                   token:'aaaaa',  
                   center: { x: 32.0923988, y: 34.839107399999996 } 
                });  
  }
  
 

  render() {

    return (
      <section className="sec">
       <div id="map"></div>
      </section>
    );
  }
}

GovMap.propTypes = {
  location: React.PropTypes.object,
};

export default GovMap;