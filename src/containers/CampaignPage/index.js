/*
 * ChildrenData
 *
 * List all the features
 */
import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';

import { detectmob } from 'utils/functions';

const styles = require('./CampaignPage.scss');

const campaignImgDesk = require('assets/img/campaign1-desktop.jpg');
const campaignImgMob = require('assets/img/campaign1-mobile.jpg');
const seoImage = require('assets/img/campaign1-seo.jpg');
 
export default class CampaignPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.detectmob = detectmob();
  }

  render() {
    return (
      <div className="campaign-page full-height-container">
        <Helmet
          title="אתם יכולים לטוס לאירופה!"
          meta={[
            { name: 'description', content: `מחפשים באתר או באפליקציה אדם פרטי או עסק הנותן שירות לציבור החרדי, לא מצאתם? עדכנו את הפרטים והכנסו להגרלה 402 .co.il או חפשו המדריך החרדי בחנות האפליקציות` },
            { property: 'og:image', content: seoImage },
          ]}
        />
        <div className="wrapper-img">
          <div className={!this.detectmob ? 'wrapper-div-desk': ''}>
            {this.detectmob ? <img  src={campaignImgMob} /> : <div className="img-desk" style={{backgroundImage: `url(${campaignImgDesk})`}}></div>}
            {!this.detectmob && <a className="link1" href="" onClick={() => { window.open('https://play.google.com/store/apps/details?id=com.app.thecharedidirectory', '_blank'); }}></a>}
            <a className="link2" href="" onClick={() => { browserHistory.push('/?comeFrom=campaign1'); }}></a>
            <a className="link3" href="" onClick={() => { browserHistory.push('/lottery-rules.pdf'); }}></a>
          </div>
      </div>
    </div>
    );
  }
}

CampaignPage.propTypes = {
  children: React.PropTypes.node,
};
