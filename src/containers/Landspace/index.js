import React, { Component } from 'react';
import ImageMapper from 'react-image-mapper';
import { loadLandspaces, landspacesLoaded } from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Landspace extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this); 
        this.onClick = this.onClick.bind(this); 
        this.state = {
            display: 'none'
        }
        this.props.loadLandspace(this.state.categories);   
    }

    onClick(area, index, event) {
        console.log(area, index, event);
        location.href = 'biz/' + area.id + '/' + area.business_name;
    }

    onMouseEnter(area, index, event) {
        console.log(area)
        this.setState({top: (parseInt(area.coords[1])+30)+'px',
         left: area.coords[0]+'px',
         display:'block',
         description: area.business_description
        });
    }

    onMouseLeave(area, index, event) {
        this.setState({display:'none'});
    }
    
    render() {
        return (
            <div>
                <div style={{backgroundColor:'red', display: this.state.display,'zIndex': 10, position:'absolute', top:this.state.top, left:this.state.left}}>{this.state.description}</div>
                <ImageMapper src={"https://gitlab.linnovate.net/startuphub/reindex/uploads/4b1205c933934f64b884edae59651157/Capture1.PNG"} onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={this.onClick} map={{"name": "my-map",
                "areas": this.props.data.landspaces}}/>
                
            </div>
        )
    }
}

Landspace.propTypes = {
    loadLandspaces: React.PropTypes.func
};

export function mapStateToProps(state) {
    console.log(state)
    return {
        data: state.landspaces, 
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        loadLandspace: () => {
            dispatch(loadLandspaces());
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Landspace);