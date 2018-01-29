/*
 * ChildrenData
 *
 * List all the features
 */
import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';

import { detectmob } from 'utils/functions';

const styles = require('./LotteryPage.scss');

const lotteryImgDesk = require('assets/img/lottery-desktop.jpg');
const lotteryImgMob = require('assets/img/lottery-mobile.jpg');
const seoImage = require('assets/img/campaign1-seo.jpg');
 
export default class LotteryPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.detectmob = detectmob();
  }

  render() {
    return (
      <div className="lottery-page full-height-container">
        <Helmet
          title="תודה שהשתתפתם בהגרלה"
          meta={[
            { name: 'description', content: 'צוות המדריך עמל בכדי להביא אליך את המידע המקיף ביותר, כך שתמצא תמיד את מה שחיפשת. לא מצאת? כל עדכון נוסף מקנה לך זכות השתתפות נוספת בהגרלה הגדולה.בהצלחה!' },
            { property: 'og:image', content: seoImage },
          ]}
        />
        <div className="wrapper-img" onClick={() => { browserHistory.push('/'); }}>
          {this.detectmob ?
          <div className="img-mob" style={{backgroundImage: `url(${lotteryImgMob})`}}></div>:
          <div className="img-desk" style={{backgroundImage: `url(${lotteryImgDesk})`}}></div>}
        </div>
      </div>
    );
  }
}

LotteryPage.propTypes = {
  children: React.PropTypes.node,
};
