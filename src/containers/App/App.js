import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Explore } from 'components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CopyRightIcon from 'material-ui/svg-icons/action/copyright';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { getLocationData } from 'utils/functions';
import logo from 'assets/img/logo-footer.png';
import { detectmob } from '../../utils/functions';



const muiTheme = getMuiTheme({ isRtl: true, fontFamily: 'Heebo' });

import {
  navigate,
  updateRouterState,
  resetErrorMessage
} from '../../actions';

import { loadResults } from '../ResultsPage/actions';

import styles from './App.scss'; // eslint-disable-line
import 'assets/css/global-styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      detectmob: detectmob(),
    };
  }
  componentDidMount() {
    // if(!this.state.detectmob){
    const script = document.createElement("script");
    script.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MQ3JBZ4')`
    document.head.appendChild(script);
    // var iframe = document.createElement('iframe');
    // iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(`<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MQ3JBZ4"
    // height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`);
    // document.body.appendChild(iframe);
    // }
       const script1 = document.createElement("script");
  script1.text = ` var vsid = "sa28054";
(function() { 
 var vsjs = document.createElement('script'); vsjs.type = 'text/javascript'; vsjs.async = true; vsjs.setAttribute('defer', 'defer');
  vsjs.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'www.virtualspirits.com/vsa/chat-'+vsid+'.js';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(vsjs, s);
 })();`
    document.head.appendChild(script1);
  }


  componentWillMount() {
    this.props.updateRouterState({
      pathname: this.props.location.pathname,
      params: this.props.params,
      query: this.props.location.query,
    });
  }

  loadResults(location, locationData) {
    if (locationData.tab === 'businesses' || locationData.tab === 'people') {
      this.props.loadResults({ page: 1, location: location });
    }
  }

  componentWillReceiveProps(nextProps) {
    const locationData = getLocationData(nextProps.location);
    if (nextProps.errorMessage) {
      // handle error here
    }
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.updateRouterState({
        pathname: nextProps.location.pathname,
        params: nextProps.params,
        query: nextProps.location.query,
      });
      return this.loadResults(nextProps.location, locationData);
    }
    if (this.props.location.search !== nextProps.location.search) {
      this.loadResults(nextProps.location, locationData);
    }
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange(nextValue) {
    this.props.navigate(`/${nextValue}`);
  }

  render() {
    const { children, inputValue, location } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={`${styles.app} ${(location.pathname.split('/')[1]) ? location.pathname.split('/')[1] : 'home'}`}>
          <div className={styles.content}>
            {children}

          </div>
          {(location.pathname.split('/')[1] && location.pathname.split('/')[1] != 'landing-page' && location.pathname.split('/')[1] != 'thank' && location.pathname.split('/')[1] != 'biz' && location.pathname.split('/')[1] != 'campvideo' && location.pathname.split('/')[1] != 'campaign'&& location.pathname.split('/')[1] != 'campvideo' && location.pathname.split('/')[1] != 'campaign' && location.pathname.split('/')[1] != 'lottery' && location.pathname.split('/')[1].indexOf('update') < 0 ) ? (
            this.state.detectmob ? (
              <span className="footer"><a className="contact" href="/contact-us" target="_blank">  צור קשר&nbsp;&nbsp;&nbsp;  </a> | &nbsp;&nbsp;<a href="/terms" target="_blank">  תנאי שימוש&nbsp;&nbsp;&nbsp;  </a> </span>
            ) : (
                <span className="footer"><a className="contact" href="/contact-us" target="_blank">  צור קשר&nbsp;&nbsp;&nbsp;  </a> | &nbsp;&nbsp;<i><CopyRightIcon /></i>  כל הזכויות שמורות &nbsp; | &nbsp; פיתוח ועיצוב <a className="logo-footer" href="http://www.linnovate.net/" target="_blank" style={{ backgroundImage: `url(${logo})` }}></a> &nbsp;&nbsp; |  &nbsp;&nbsp; <a href="/terms" target="_blank">  תנאי שימוש&nbsp;&nbsp;&nbsp;  </a></span>
              )
          ) : (
              null
            )}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  errorMessage: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  updateRouterState: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  params: PropTypes.object
};

// function preload() {
//   return [
//     [sagaName]
//   ];
// }
// App.preload = preload;

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.pathname.substring(1)
  };
}

export default connect(mapStateToProps, {
  navigate,
  updateRouterState,
  resetErrorMessage,
  loadResults,
})(App);
