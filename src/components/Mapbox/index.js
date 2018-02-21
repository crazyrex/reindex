import React from 'react';
require('./Mapbox.scss');

class Mapbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
    this.renderMap = this.renderMap.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.renderMap(nextProps.location);
  }

  renderMap(address) {
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoieWVodWRpdGciLCJhIjoiY2pkc3Eza2k1MHBneDMzcDcxbm9wY3h5cSJ9.QqvDmAmAvsRZdx3VUzb-eg';
    var map = new mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [address.location[0], address.location[1]],
      zoom: 15,
          

    });
  }
  render() {

    return (
      <section className="sec">
        <div id="mapbox"></div>
      </section>
    );
  }
}

Mapbox.propTypes = {
  location: React.PropTypes.object,
};

export default Mapbox;