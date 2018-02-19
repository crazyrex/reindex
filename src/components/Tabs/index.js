import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { setActiveTab } from 'components/SearchBar/actions';

import './Tabs.scss';

function TabsComp(props) {
  return (
    <Tabs
      tabItemContainerStyle={{ backgroundColor: 'black', width: '40%' }}
      value={props.search.activeTab}
      inkBarStyle={{ backgroundColor: '#ffd800', height: 3 }}
    >
      <Tab label="עסקים" value="businesses" className="tab" style={{ color: props.search.activeTab === 'businesses' ? '#ffd800' : '#ffffff' }} onActive={() => props.setActiveTab('businesses')}>
      </Tab>
      <Tab label="אנשים" value="people" className="tab" style={{ color: props.search.activeTab === 'people' ? '#ffd800' : '#ffffff' }} onActive={() => props.setActiveTab('people')}>
      </Tab>
    </Tabs>
  );
}

TabsComp.propTypes = {
  setActiveTab: React.PropTypes.func,
  search: React.PropTypes.object,
};

export function mapStateToProps(state) {
  return {
    search: state.search.search,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    setActiveTab: (activeTab) => {
      dispatch(setActiveTab(activeTab));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsComp);
