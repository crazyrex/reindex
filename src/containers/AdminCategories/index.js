/*
 * ChildrenData
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import CategoriesTree from 'components/CategoriesTree';
// import Upload from 'components/Upload';
// import Download from 'components/Download';
import { closeActionResponseAlert } from './actions';

import './AdminCategories.scss'

export class AdminCategories extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.updateSelectedCategories = this.updateSelectedCategories.bind(this);
  }



  updateSelectedCategories(categories) {
  }

  render() {
    return (
      <div className="admin-categories full-height-container">
        {/* <div className='wrap-upload'>
          <Download />
          <Upload />
        </div> */}
        <CategoriesTree src="admin" onUpdate={this.updateSelectedCategories} />
        <Snackbar
          open={this.props.actionResponseAlert.open}
          message={this.props.actionResponseAlert.text}
          autoHideDuration={4000}
          onRequestClose={this.props.closeActionResponseAlert}
        />
      </div>
    );
  }
}


AdminCategories.propTypes = {
  actionResponseAlert: React.PropTypes.object,
  closeActionResponseAlert: React.PropTypes.func,
};

export function mapStateToProps(state) {
  return {
    actionResponseAlert: state.adminCategories.actionResponseAlert,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    closeActionResponseAlert: () => {
      dispatch(closeActionResponseAlert());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminCategories);
