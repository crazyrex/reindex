import React from 'react';
import { connect } from 'react-redux';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import { browserHistory } from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import config from 'ReindexConfig';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import logo from 'assets/img/logo.jpg';
import beta from 'assets/img/logo.jpg';
import { detectmob } from 'utils/functions';
import { initSearch } from 'components/SearchBar/actions';


const styles = require('./HeaderSite.scss');

class HeaderSite extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });
    handleClose = () => this.setState({ open: false });
    render() {
        return (
            <div className={styles["header-site"]}>
                <div className={styles["header-content"]}>
                    <div className={styles["logo-wrapper"]}>
                        <div className={styles["logo"]} style={{ backgroundImage: `url(${logo})` }} onClick={() => { browserHistory.push('/'); this.props.initSearch(); }}></div>
                        {config.beta ?
                            <div className={styles["beta"]} style={{ backgroundImage: `url(${beta})`, width: "50px" }}></div> : ''}
                    </div>
                    <div className={styles["header-searchIcon"]} onClick={() => browserHistory.push('/')}>
                    </div>
                </div>
            </div>
        );
    }
}

HeaderSite.propTypes = {
    logoClicked: React.PropTypes.func,
    initSearch: React.PropTypes.func,
};

export function mapStateToProps() {
    return {
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        initSearch: () => {
            dispatch(initSearch());
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderSite);