/*
 * ChildrenData
 *
 * List all the features
 */
import React from 'react';
import { browserHistory } from 'react-router';
import HeaderSite from 'components/HeaderSite';
import SearchBar from 'components/SearchBar';
import { Field, reduxForm } from 'redux-form';
import ContactUsForm from 'components/ContactUsForm'
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { detectmob } from 'utils/functions';
import Helmet from 'react-helmet';



const styles = require('./ContactUs.scss');

export class ContactUs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailOpen: false,
    };
    this.event = '';
    this.closeEmail = this.closeEmail.bind(this);
    this.mailTo = '5350500@gmail.com';
  }

  closeEmail() {
    this.setState({ emailOpen: false });
    browserHistory.push('/thanks');
  }

  openChat() {
      document.getElementById('popupVSChat').style.display = 'block';
  }






  render() {
    return (
      <div className={`${styles['contactus']} full-height-container us`}>
        <Helmet
          title="Contact Us Page"
          meta={[
            { name: 'description', content: 'Contact Us of 402' },
          ]}
        />
        <HeaderSite />
        <div className="wrapper-autocomplete">
          <SearchBar
            onNewRequest={this.props.handleNewRequest}
            handleSearchBtn={this.props.handleSearchBtn}
            data={this.props.searchBarData}
          />
        </div>
        <div className="contact">
          <div className="title">צור קשר</div>
          <div></div>
          <div className="details">
            <div> &nbsp;&nbsp;המדריך החרדי בע"מ  |</div>
            <div>&nbsp;יפו 169, ירושלים&nbsp;|</div>
            <div>&nbsp;402@402.co.il&nbsp;</div>
          </div>
        </div>

        <FlatButton onClick={this.openChat}
          labelStyle={{ paddingRight: 44, paddingLeft: 44, fontSize: 18 }}
          label="איך אנחנו יכולים לקדם את העסק שלך?"
        />
        <ContactUsForm src="CONTACT_US" closeEmailAlertInParent={this.closeEmail} to={this.mailTo} />
      </div>

    );
  }
}



ContactUs.propTypes = {
  send: React.PropTypes.func,
};
export function mapStateToProps(state) {
  return {
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    send: (values) => {
      dispatch(send(values));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
