import React from 'react';
import { connect } from 'react-redux';
import { detectmob, getPhone } from 'utils/functions';
import FlatButton from 'material-ui/FlatButton';
import { getVirtualNumber } from './actions';
import Popover from 'material-ui/Popover';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import PhoneIcon from 'material-ui/svg-icons/communication/call';
import CloseIcon from 'material-ui/svg-icons/navigation/close';




import './Phone.scss';

class PhoneView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openPopUpPhone: false,
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'left',
        vertical: 'top',
      },
    };
  }
  componentWillMount() {
    this.setState({ isVirtual: this.props.isVirtual });
  }
  showPopover = (event) => {
    // This prevents ghost click.
    // event.preventDefault();
    if (this.state.isVirtual && !this.props.detectmob) {
      window.dataLayer.push({
        'event': 'clickPhone',
        'cardname': this.props.cardName
      });
      this.setState({
        open: true,
        anchorEl: event.currentTarget,
      });
    }

  }



  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }
  openPopUpPhone = (val) => {
    if (this.state.isVirtual) {
      window.dataLayer.push({
        'event': 'clickPhone',
        'cardname': this.props.cardName
      });
      this.setState({
        openPopUpPhone: true,
        currentPhone: val,
      })
    }

  }
  handleModalClose = () => {
    this.setState({ openPopUpPhone: false });
  };
  handleMouseLeave = (event) => {
    this.setState({
      open: false,
    });
  }


  render() {
    return <div>
      <div>
        {!this.props.detectmob ?
          this.props.data.map((val, key) => {
            return <div onMouseEnter={this.showPopover} onClick={this.handleMouseLeave} key={key}  ><div className="phone" >{val}&nbsp;&nbsp;</div>  </div>
          }) : (!this.props.isVirtual && this.props.footer ? <div><a href={`tel:${this.props.data}`} style={{ "display": "block" }}></a></div> : this.props.data.map((val, key) => {
            return <span key={key} className="phone" onClick={() => this.openPopUpPhone(val)} >{val}&nbsp;&nbsp;</span>
          }))}
      </div>
      <Popover
        className="popover"
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ "horizontal": "middle", "vertical": "top" }}
        targetOrigin={{ "horizontal": "middle", "vertical": "bottom" }}
        onRequestClose={this.handleRequestClose}
      >
        <div className="popoverVirtual"> This is a link number: a digital system for directing calls from the site to the business, in accordance <a href='/terms' target="_blank"> to site policies.</a></div>
      </Popover>
      <Dialog
        title={<div><IconButton onClick={this.handleModalClose}><CloseIcon /></IconButton></div>}
        modal={false}
        autoScrollBodyContent
        open={this.state.openPopUpPhone}
        onRequestClose={this.handleModalClose}
        titleClassName="title"
        contentClassName="dialog-phone"
        bodyStyle={{ padding: '0', 'borderRadius': '20px' }}
      >
        <div className="number">{this.state.currentPhone}</div>
        <div className="text">This is a link number: a digital system for directing calls from the site to the business, in accordance <a href='/terms' target="_blank"> to site policies.</a></div>
        <a href={`tel:${this.state.currentPhone}`} className="wrapper-in-dialog">התקשר
            <IconButton className="icon-phone" ><PhoneIcon /></IconButton>
        </a>

      </Dialog>
    </div>
  }
}


class Phone extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detectmob: detectmob(),
      open: false,
      openPopUpPhone: false
    }
    this.getVirtualNumber1 = this.getVirtualNumber1.bind(this);

  }

  openPopUpPhone = () => {
    window.dataLayer.push({
      'event': 'clickPhone',
      'cardname': this.props.cardName
    });
    this.setState({
      openPopUpPhone: true,
    })
  }



  handleModalClose = () => {
    this.setState({ openPopUpPhone: false });
  };


  showPopover = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    if (this.props.isVirtual && this.state.detectmob && !this.getVirtualNumber1(this.props.data.virtual_number) && getPhone(this.props.data.phone_2 || this.props.data.phone) && !this.props.newVirtualNumbers[this.props.recordId]) {
      this.props.getVirtualNumber(this.props.recordId);
      this.openPopUpPhone();

    }
    else if (!this.state.detectmob && this.props.isVirtual && !this.getVirtualNumber1(this.props.data.virtual_number) && getPhone(this.props.data.phone_2 || this.props.data.phone) && !this.props.newVirtualNumbers[this.props.recordId]) {
      window.dataLayer.push({
        'event': 'clickPhone',
        'cardname': this.props.cardName
      });
      this.setState({
        disabled: true,
        open: true,
        anchorEl: event.currentTarget,
      });
      this.props.getVirtualNumber(this.props.recordId);
      setTimeout(function () {
        this.setState({ open: false });
      }.bind(this), 4000)
    }


  }


  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  getVirtualNumber1(virtualNumberObj) {
    return (virtualNumberObj) ? virtualNumberObj.value : ''
  }

  render() {
    return (
      <div className="phone-container" onClick={this.showPopover}>
        {!this.props.isVirtual ?
          <PhoneView detectmob={this.state.detectmob} footer={this.props.footer} cardName={this.props.data.business_name} isVirtual={false} data={getPhone([this.props.data.phone, this.props.data.phone_2], this.props.data.virtual_number)} />
          :
          <div>
            {(this.props.newVirtualNumbers[this.props.recordId] || this.getVirtualNumber1(this.props.data.virtual_number)) ?
              <PhoneView detectmob={this.state.detectmob} cardName={this.props.data.business_name} isVirtual={true} data={getPhone([this.getVirtualNumber1(this.props.data.virtual_number) || this.props.newVirtualNumbers[this.props.recordId]])} showPopover={true} />
              : ''}
            {!this.getVirtualNumber1(this.props.data.virtual_number) && getPhone(this.props.data.phone_2 || this.props.data.phone) && !this.props.newVirtualNumbers[this.props.recordId] ?
              <div>
                <FlatButton className="show-phone-btn" disabled={this.state.disabled} labelStyle={{ paddingRight: 20, paddingLeft: 20, fontSize: 16 }} label="Display phone number" /></div> : ''}
          </div>}
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ "horizontal": "middle", "vertical": "top" }}
          targetOrigin={{ "horizontal": "middle", "vertical": "bottom" }}
        >
          <div className="popoverVirtual">This is a link number: a digital system for directing calls from the site to the business, in accordance <a href='/terms' target="_blank"> to site policies.</a></div>
        </Popover>
        <Dialog
          title={<div><IconButton onClick={this.handleModalClose}><CloseIcon /></IconButton></div>}
          modal={false}
          autoScrollBodyContent
          open={this.state.openPopUpPhone}
          onRequestClose={this.handleModalClose}
          titleClassName="title"
          contentClassName="dialog-phone"
          bodyStyle={{ padding: '0', 'borderRadius': '20px' }}
        >
          <div className="number">{getPhone([this.getVirtualNumber1(this.props.data.virtual_number) || this.props.newVirtualNumbers[this.props.recordId]])}</div>
          <div className="text"> This is a link number: a digital system for directing calls from the site to the business, in accordance <a href='/terms' target="_blank"> to site policies.</a></div>
          <a href={`tel:${getPhone([this.getVirtualNumber1(this.props.data.virtual_number) || this.props.newVirtualNumbers[this.props.recordId]])}`} className="wrapper-in-dialog">התקשר
            <IconButton className="icon-phone" ><PhoneIcon /></IconButton>
          </a>
        </Dialog>
      </div>
    );
  }
}

Phone.propTypes = {
  data: React.PropTypes.object,
  newVirtualNumbers: React.PropTypes.object,
  isVirtual: React.PropTypes.bool,
};

export function mapStateToProps(state) {
  return {
    newVirtualNumbers: state.phone.newVirtualNumbers,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    getVirtualNumber: (recordId) => {
      dispatch(getVirtualNumber(recordId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Phone);
