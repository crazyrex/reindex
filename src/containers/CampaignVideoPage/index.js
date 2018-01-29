/*
 * ChildrenData
 *
 * List all the features
 */
import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import config from '../../402Config';
import { detectmob } from 'utils/functions';
const styles = require('./CampaignVideoPage.scss');

const campaignImgDesk = require('assets/img/vid.png');
const campaignImgMob = require('assets/img/PIC.png');
const campaignImgMob2 = require('assets/img/TXT.png');
const imgVideo = require('assets/img/video.png');

const seoImage = require('assets/img/campaign1-seo.jpg');

export default class CampaignVideoPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.detectmob = detectmob();
  }

  render() {
    return (
      <div className="campaignVideo-page full-height-container">
        <Helmet
          title="לכל מי שמחפש את עצמו..."
          meta={[
            { name: 'description', content: `המדריך החרדי - 402 מזמין את כולם לחפש, לא למצוא, לעדכן ולהשתתף בהגרלה על טיסה לאירופה לא תנסו??` },
            { property: 'og:image', content: seoImage },
          ]}
        />
     {!this.detectmob ?
        
        <video controls="controls" className="video-ctrl" autoPlay>
            <source src="http://402.co.il/guide_flight.mp4" type="video/mp4" poster={imgVideo}/>
          <source src="http://402.co.il/guide_flight.webm" type="video/webm" controls poster={imgVideo}/>
       </video>
        :<video controls="controls" className="video-ctrl" playsinline autoplay >
          <source src="http://402.co.il/guide_flight.mp4" type="video/mp4" poster={imgVideo}/>
          <source src="http://402.co.il/guide_flight.webm" type="video/webm" controls poster={imgVideo}/>
        </video>}   
        {!this.detectmob ?         
        <div className="wrapper-img">
          <div className='wrapper-div-desk'>
            <div className="img-desk" style={{backgroundImage: `url(${campaignImgDesk})`}}>
            <a className="link1" href="" onClick={() => { browserHistory.push('/?comeFrom=campaign1'); }}></a>
            <a className="link2" href="" onClick={() => { browserHistory.push('/?comeFrom=campaign1'); }}></a>
            <a className="link3" href="" onClick={() => { browserHistory.push('/lottery-rules.pdf'); }}></a>
            </div>
          </div>
         </div>:
         <div className="wrapper-mobile"> 
          <div className='wrapper-div-mobile'>
            <div className="img-mobile" style={{backgroundImage: `url(${campaignImgMob})`}} onClick={() => { browserHistory.push('/?comeFrom=campaign1'); }}></div>
            <div className="img-text" style={{backgroundImage: `url(${campaignImgMob2})`}} onClick={() => { browserHistory.push('/lottery-rules.pdf'); }}></div>
          </div>
      </div>
      }

    </div>
    );
  }
}

CampaignVideoPage.propTypes = {
  children: React.PropTypes.node,
};



