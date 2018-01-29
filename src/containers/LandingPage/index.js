/*
 * ChildrenData
 *
 * List all the features
 */
import React from 'react';
import { browserHistory } from 'react-router';
import SendEmailForm from 'components/SendEmailForm';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';

import { detectmob } from 'utils/functions';
import Helmet from 'react-helmet';

const landingImgDesk = require('../../assets/img/landing-page-desktop.jpg');
const landingImgMob = require('../../assets/img/landing-page-mobile.jpg');

const styles = require('./LandingPage.scss');

export default class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailOpen: false,
    };
    this.detectmob = detectmob();
    this.toggleEmail = this.toggleEmail.bind(this);
    this.closeEmail = this.closeEmail.bind(this);
    this.mailTo = '5350500@gmail.com';
  }

  componentWillMount() {
    // const script = document.createElement("script");
    // script.text = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    //   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    //   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    //   })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    //   ga('create', 'UA-57931506-3', 'auto');
    //   ga('send', 'pageview');`;
    // document.head.appendChild(script);
  }


  toggleEmail() {
    this.setState({ emailOpen: !this.state.emailOpen });
  }
  closeEmail() {
    this.setState({ emailOpen: false });
    browserHistory.push('/thanks');
  }

  render() {
    return (
      <div className={`${styles['landing-page']} full-height-container`}>
        <Helmet
          title="Landing Page"
          meta={[
            { name: 'description', content: 'LandingPage of 402' },
          ]}
        />
        {/*<div className={styles['wrapper-img']}>
          <div className={styles['img-desk']} style={{ backgroundImage: `url(${landingImgDesk})` }}></div>
          <div className={styles['wrapper-contact-link']}>
            <div className={styles.bottom}></div>
          </div>
        </div>*/}
        { /*<HeaderSite/>*/}
            <div className="wrapper-img">
                {this.detectmob ?
                <div className="img-mob" style={{backgroundImage: `url(${landingImgMob})`}}></div>:
                <div className="img-desk" style={{backgroundImage: `url(${landingImgDesk})`}}></div>}
                <div className="wrapper-contact-link">
                    <div className="bottom">
                    {!this.detectmob ? <SendEmailForm src="LANDING_PAGE" closeEmailAlertInParent={this.closeEmail} to={this.mailTo}/> : 
                    <div>
                      <div className="formHeader" onClick={this.toggleEmail}>
                        {this.state.emailOpen ? <NavigationExpandMore /> : <NavigationExpandLess />}
                        <div>שלח מייל</div>
                      </div>
                      <div className={`formContent ${this.state.emailOpen && 'active'}`}>
                        <SendEmailForm src="LANDING_PAGE" closeEmailAlertInParent={this.closeEmail} to={this.mailTo}/>
                      </div>
                    </div> }
                    </div>
                </div>
            </div>
      </div>
    );
  }
}


LandingPage.propTypes = {
  children: React.PropTypes.node,
};
