/*
 * ChildrenData
 *
 * List all the features
 */
'use strict';
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Filters from 'components/Filters';
import logo from 'assets/img/Hamadruch-Hachredi-logo.png';
import beta from 'assets/img/beta-large.png';
import HeaderSite from 'components/HeaderSite';
import SearchIcons from 'components/SearchIcons';
import NoResults from 'components/NoResults';
import Results from 'components/Results';
import SearchBar from 'components/SearchBar';
import Snackbar from 'material-ui/Snackbar';
import DrawerFilter from 'components/DrawerFilter';
import { detectmob } from '../../utils/functions';
import config from '../../402Config';
// import Tabs from 'components/Tabs';
import { loadResults, changeState, updateRecord, displayIcons, closeUpdateRecordModal } from './actions';
import { spacing } from 'material-ui/styles';
const seoImage = require('assets/img/hp.png');
import IconButton from 'material-ui/IconButton';
import PlaceIcon from 'material-ui/svg-icons/navigation/cancel';


const styles = require('./MainSearch.scss');
let ifApp = true;

export class MainSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    if (typeof window === 'object' && window.test === undefined) {
      window.test = window.innerHeight;
    }
    this.state = {
      modalOpen: false,
      detectmob: detectmob(),
      is_keyboard: false,
      initial_screen_size: '',
      displayIcons: true,
      goToApp: true,
      ifApp :true
    };

    this.handleModalClose = this.handleModalClose.bind(this);
    this.changeState = this.changeState.bind(this);
    this.toggleIcons = this.toggleIcons.bind(this);
    this.onResize = this.onResize.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    // this.domain = window.location.origin;
    const that = this;
    that.setState({ initial_screen_size: window.innerHeight });
    that.setState({ is_keyboard: (window.innerHeight < window.test) });
    that.toggleIcons();
    if (window.innerHeight < 450) {
      this.setState({ displayIcons: false });
    }
    if (!this.props.displayIcons) {
      this.setState({ displayIcons: this.props.displayIcons })
    }
    window.addEventListener('resize', this.onResize, false);
    ifApp = window.navigator.appVersion.indexOf('AppName/1') == -1 ? false: true;
    this.setState({ifApp:ifApp});
  }


  onResize() {
    const that = this;
    that.setState({ is_keyboard: (window.innerHeight < window.test) });
    if (!this.props.isDisplayIcons)
      if (window.innerHeight < window.test) {
        this.props.displayIcons(false);
      }
      else this.props.displayIcons(true);
    that.toggleIcons();
  }

  componentWillUnmount() {
    // you need to unbind the same listener that was binded.
    window.removeEventListener('resize', this.onResize, false);
   
  }

  toggleIcons() {
    if (this.state.is_keyboard) {
      this.setState({ displayIcons: false });
    } else {
      this.setState({ displayIcons: true });
    }
  }
  handleModalClose() {
    this.setState({ modalOpen: false });
  }

  changeState() {
    this.forceUpdate();
    this.props.changeState();
  }

  handleClose() {
    ifApp = true;    
    this.setState({ goToApp: false ,ifApp: true});
  }

  render() {
    return (
      <div className={`main-search full-height-container main ${this.props.state === 'main' ? 'main' : 'search'} ${!this.state.ifApp  ? 'gotoapp' : ''}`}>
        <Helmet
          title="המדריך החרדי 402 - אינדקס עסקים ואנשים של המגזר החרדי"
          meta={[
            { name: 'description', content: 'אתר 402 - המדריך החרדי און ליין, האתר היחיד לחיפוש מידע על אנשים, עסקים וארגונים במגזר החרדי' },
            { property: 'og:image', content: `https://402.co.il${seoImage}` },
          ]}
        />
        <HeaderSite logoClicked={this.changeState} />
        <div className={'wrapper-autocomplete'}>
         <div className={styles["header"]}>
            <img src={logo} role="presentation" /> &nbsp;
            {config.beta ?
              <img src={beta} role="presentation" /> : ''}
          </div>
          <SearchBar
            onNewRequest={this.props.handleNewRequest}
            handleSearchBtn={this.props.handleSearchBtn}
            data={this.props.searchBarData}
          />
        </div>
        {this.state.goToApp && this.state.goToApp === true && this.state.detectmob && !this.state.ifApp && ifApp === false ?
          <div className="goToApp">
            <div className="close" onClick={this.handleClose}>
              <IconButton ><PlaceIcon /></IconButton>
            </div>
            <div>
              <img src={seoImage} />
            </div>
            <div className="txt">
              <span>אפליקציית המדריך החרדי</span>
            </div>
            <a className="linkToGP" href="https://play.google.com/store/apps/details?id=com.app.thecharedidirectory">הורד</a>
          </div>
          : ''}

        {!this.state.detectmob ?
          <div className={styles["wrapper-filters"]}>
            <Filters onNewRequest={this.props.handleNewRequest} pageState={this.props.state} />
          </div> : ''}
        {this.props.isDisplayIcons && this.state.displayIcons && <div className={styles["bottom-icons"]}><SearchIcons /></div>}
        {this.state.detectmob && this.props.results.length > 0 ?
          <DrawerFilter onNewRequest={this.props.handleNewRequest} pageState={this.props.state} /> : ''}
        {this.props.results.length > 0 ? <div className={styles["wrapper-results"]}>
          <div className={styles["results-count"]}>נמצאו {this.props.totalResults} תוצאות </div>
          <Results
            data={this.props.results}
            total={this.props.totalResults}
            limit={this.props.limitResults}
            offset={this.props.offsetResults}
            updateRecord={this.props.updateRecord}
            handlePageClick={this.props.handleResultsPageClick}
          /></div> : <NoResults />}
        <Snackbar
          open={this.props.updateRecordAlert.open}
          message={this.props.updateRecordAlert.text}
          autoHideDuration={4000}
          onRequestClose={this.props.closeUpdateRecordModal}
        />
      </div>
    );
  }
}


MainSearch.propTypes = {
  state: React.PropTypes.string,
  results: React.PropTypes.array,
  changeState: React.PropTypes.func,
  updateRecord: React.PropTypes.func,
  handleNewRequest: React.PropTypes.func,
  handleSearchBtn: React.PropTypes.func,
  updateRecordAlert: React.PropTypes.object,
  closeUpdateRecordModal: React.PropTypes.func,
  totalResults: React.PropTypes.number,
  limitResults: React.PropTypes.number,
  handleResultsPageClick: React.PropTypes.func,
  searchBarData: React.PropTypes.object,
  offsetResults: React.PropTypes.number,
  height: React.PropTypes.number,
  isDisplayIcons: React.PropTypes.bool,
};

export function mapStateToProps(state) {
  return {
    state: state.mainSearch.state,
    results: state.mainSearch.results,
    totalResults: state.mainSearch.totalResults,
    limitResults: state.mainSearch.limitResults,
    offsetResults: state.mainSearch.offsetResults,
    updateRecordAlert: state.mainSearch.updateRecordAlert,
    searchBarData: state.mainSearch.searchBarData,
    search: state.search.search,
    isDisplayIcons: state.mainSearch.displayIcons,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    changeState: () => {
      dispatch(changeState());
    },
    updateRecord: (values, categories) => {
      values.categories = categories;
      dispatch(updateRecord({ values: values, categories }));
    },
    handleNewRequest: () => {
      // dispatch(loadResults({ page: 1 }));
    },
    handleSearchBtn: () => {
      // dispatch(loadResults({ page: 1 }));
    },
    closeUpdateRecordModal: () => {
      dispatch(closeUpdateRecordModal());
    },
    handleResultsPageClick: (offset, captcha) => {
      // dispatch(loadResults({ page: offset, captcha }));
    },
    displayIcons: (isDisplay) => {
      dispatch(displayIcons({ displayIcons: isDisplay }))
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MainSearch);
