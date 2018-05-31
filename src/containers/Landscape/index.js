import React, { Component } from 'react';
import ImageMapper from 'react-image-mapper';
import { loadLandscapes, landscapesLoaded } from './actions';
import { getSetting } from './../../components/Settings/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Landscape extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this); 
        this.onClick = this.onClick.bind(this); 
        this.state = {
            display: 'none',
            width: 0,
            height: 0 
        };
        this.props.loadLandscape(); 
    
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    onClick(area, index, event) {
        location.href = 'biz/' + area.id + '/' + area.business_name;
    }

    onMouseEnter(area, index, event) {
        this.setState({top: (parseInt(area.coords[1])+30)+'px',
         left: area.coords[0]+'px',
         display:'block',
         description: area.business_description
        });
    }

    onMouseLeave(area, index, event) {
        this.setState({display:'none'});
    }

    componentDidMount() {
        this.props.loadImage();
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    
    render() {
        return (
            <div>
                <div style={{backgroundColor:'red', display: this.state.display,'zIndex': 10, position:'absolute', top:this.state.top, left:this.state.left}}>{this.state.description}</div>
                {this.props.settings.landscapeImage ? 
                    <ImageMapper src={this.props.settings.landscapeImage} onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        onClick={this.onClick} map={{"name": "my-map",
                        "areas": this.props.data.landscapes}}
                        width={this.state.width}/> :
                    <div>loading...</div> 
                }
                
            </div>
        )
    }
}

Landscape.propTypes = {
    loadLandscapes: React.PropTypes.func,
    loadImage: React.PropTypes.func
};

export function mapStateToProps(state) {
    return {
        data: state.landscapes,
        settings: state.settings.setting 
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        loadLandscape: () => {
            dispatch(loadLandscapes());
        },
        loadImage: () => {
            dispatch(getSetting('landscapeImage'));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Landscape);