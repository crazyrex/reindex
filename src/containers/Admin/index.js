/*
 * ChildrenData
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import HeaderSite from 'components/HeaderSite';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link, browserHistory } from 'react-router'
import { push } from 'react-router-redux';
import FlatButton from 'material-ui/FlatButton';

import './Admin.scss';

class Admin extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.goToHomePage = this.goToHomePage.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      browserHistory.push('/auth/login');
    }
  }

  goToHomePage() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="admin full-height-container">
        <Helmet
          title="Admin Page"
          meta={[
            { name: 'description', content: 'Admin page of reindex' },
          ]}
        />
        <HeaderSite logoClicked={this.goToHomePage} />
        <Drawer className="drawer" open={this.state.open}>
          <MenuItem><Link to="/admin/search">search</Link></MenuItem>
          <MenuItem><Link to="/admin/history">history</Link></MenuItem>
          <MenuItem><Link to="/admin/categories">categories</Link></MenuItem>
        </Drawer>
        {this.state.open ?
          <FlatButton className="show-menu" onClick={() => this.setState({ open: false })}>הסתר תפריט</FlatButton>
          : <FlatButton className="hide-menu" onClick={() => this.setState({ open: true })}>הצג תפריט</FlatButton>
        }
        <div className={`children ${!this.state.open ? `close` : ""}`}>{this.props.children}</div>
      </div>
    );
  }
}


Admin.propTypes = {
  children: React.PropTypes.node,
};

export function mapStateToProps(state) {
  return {
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    redirect: (location) => {
      dispatch(push(location));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin);
