/*
 * ChildrenData
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import HistoryTable from 'components/HistoryTable';
import { loadHistory } from './actions';

// import './AdminSearch.scss';

export class AdminSearchHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.loadHistory();
  }

  render() {
    return (
      <div className="admin-search-history full-height-container">
      {this.props.history.length > 0 ? <div className="wrapper-history">
      <HistoryTable 
        data={this.props.history}
        total={this.props.totalResults}
        limit={this.props.limitResults}
        handlePageClick={this.props.handleResultsPageClick}/>
          </div>: ''}
      </div>
    );
  }
}


AdminSearchHistory.propTypes = {
  history: React.PropTypes.array,
  ttotalResults: React.PropTypes.number,
  limitResults: React.PropTypes.number,
  handleResultsPageClick: React.PropTypes.func,
};

export function mapStateToProps(state) {
  return {
    history: state.adminSearchHistory.history,
    totalResults: state.adminSearchHistory.totalResults,
    limitResults: state.adminSearchHistory.limitResults,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    loadHistory: () => {
      dispatch(loadHistory({page: 1}));
    },
    handleResultsPageClick: (data) => {
     dispatch(loadHistory({ page: data.selected + 1}));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminSearchHistory);
