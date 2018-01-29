/*
 * ChildrenData
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import RequestsTable from 'components/RequestsTable';
import { loadRequests, approveRequest, deleteRequest, updateRequest } from './actions';
import { cleanData } from 'components/DetailsForm/actions';

import './AdminRequests.scss';

export class AdminRequests extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.props.loadRequests();
  }

  render() {
    return (
      <div className="admin-requests full-height-container">
        <Helmet
          title="Admin Requests Page"
          meta={[
            { name: 'description', content: 'Admin requests page of 402' },
          ]}
        />
        {this.props.requests.length > 0 ? <div className="wrapper-requests">
          <RequestsTable
            data={this.props.requests}
            approveRequest={this.props.approveRequest}
            deleteRequest={this.props.deleteRequest}
            updateRequest={this.props.updateRequest}
            cleanSelectedRecordData={this.props.cleanSelectedRecordData} /></div> : ''}
      </div>
    );
  }
}


AdminRequests.propTypes = {
  loadRequests: React.PropTypes.func,
  requests: React.PropTypes.array,
  approveRequest: React.PropTypes.func,
  deleteRequest: React.PropTypes.func,
  updateRequest: React.PropTypes.func,
  cleanSelectedRecordData: React.PropTypes.func,
};

export function mapStateToProps(state) {
  return {
    requests: state.adminRequests.requests,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    loadRequests: () => {
      dispatch(loadRequests());
    },
    approveRequest: (requestId) => {
      const approve = confirm('Are you sure you want to approve request?');
      if (approve) dispatch(approveRequest(requestId));
    },
    deleteRequest: (requestId) => {
      const _delete = confirm('Are you sure you want to delete request?');
      if (_delete) dispatch(deleteRequest(requestId));
    },
    updateRequest: (values, categories) => {
      values.categories = categories;
      dispatch(updateRequest({values: values, categories}));
    },
    cleanSelectedRecordData: () => {
      dispatch(cleanData([]));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminRequests);
