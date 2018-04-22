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
    if (nextProps.location && nextProps.location.location)
      this.renderMap(nextProps.location.location);
      else if (nextProps.data.length){
          var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
            mapboxgl.accessToken = 'pk.eyJ1IjoibGlubm92YXRlIiwiYSI6ImNqZnM4MGd2ZTJjYTEzM3BlangxeWhhYjMifQ.ddurPpVQ9EQ-QnBptCn8zA';
            var map = new mapboxgl.Map({
              container: 'mapbox',
              style: 'mapbox://styles/linnovate/cjfv4njlu1k4k2rn20qb4y5ii',   
              // center:[-73.9688684937,40.6395247248],
              center:[34.8485193, 32.0331037],
              zoom: 9,
            });
        let data = nextProps.data;
        for(let i = 0; i< data.length; i++) {
          var marker = new mapboxgl.Marker()
          .setLngLat([data[i]._source.location[0], data[i]._source.location[1]])
          .addTo(map);
          var markerHeight = 30, markerRadius = 10, linearOffset = 25;
          var popupOffsets = {
          'top': [0, 0],
          'top-left': [0,0],
          'top-right': [0,0],
          'bottom': [0, -markerHeight],
          'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
          'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
          'left': [markerRadius, (markerHeight - markerRadius) * -1],
          'right': [-markerRadius, (markerHeight - markerRadius) * -1]
          };
        var popup = new mapboxgl.Popup({offset:popupOffsets})
        .setLngLat([data[i]._source.location[0], data[i]._source.location[1]])
        .setHTML("<h5>"+data[i]._source.business_name+"</h5>")
          .addTo(map);
        }
          
     }
  }

  renderMap(pos) {
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoieWVodWRpdGciLCJhIjoiY2pkc3Eza2k1MHBneDMzcDcxbm9wY3h5cSJ9.QqvDmAmAvsRZdx3VUzb-eg';
    var map = new mapboxgl.Map({
      container: 'mapbox1',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [pos[0], pos[1]],
      zoom: 15,
   });
   var marker = new mapboxgl.Marker()
   .setLngLat([pos[0], pos[1]])
   .addTo(map);
  }
  render() {

    return (
      <section className="sec">
      {this.props.location?
        <div id="mapbox1"></div>:
        <div
          id="mapbox"
          style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          }}
      />  }
    </section>
    );
  }
}

Mapbox.propTypes = {
  location: React.PropTypes.object,
};

export default Mapbox;