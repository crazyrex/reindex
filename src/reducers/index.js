import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import paginate from './paginate';
import {
  combineReducers
} from 'redux';

import recordReducer from '../containers/RecordPage/reducer';
import mainSearchReducer from '../containers/MainSearch/reducer';
import authPageReducer from '../containers/AuthPage/reducer';
import adminSearchReducer from '../containers/AdminSearch/reducer';
import adminRequestsReducer from '../containers/AdminRequests/reducer';
import adminSearchHistoryReducer from '../containers/AdminSearchHistory/reducer';
import adminCategoriesReducer from '../containers/AdminCategories/reducer';
import recordSettingsReducer from '../components/RecordSettings/reducer';

import createFormReducer from '../components/CreateForm/reducer';
import adminSearchBarReducer from '../components/AdminSearchBar/reducer';
import searchReducer from '../components/SearchBar/reducer';
import sendEmailFormReducer from '../components/SendEmailForm/reducer';
import categoriesTreeReducer from '../components/CategoriesTree/reducer';
import detailsFormReducer from '../components/DetailsForm/reducer';
import phoneReducer from '../components/Phone/reducer';
import contactUsFormReducer from '../components/ContactUsForm/reducer';

import resultsPageReducer from '../containers/ResultsPage/reducer';
import { reducer as form } from 'redux-form';


// Updates an entity cache in response to any action with response.entities.
function entities(state = {
  users: {},
  repos: {}
}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const {
    type,
    error
  } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}


// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED.REQUEST,
      ActionTypes.STARRED.SUCCESS,
      ActionTypes.STARRED.FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS.REQUEST,
      ActionTypes.STARGAZERS.SUCCESS,
      ActionTypes.STARGAZERS.FAILURE
    ]
  })
});

function router(state = {
  pathname: '/'
}, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ROUTER_STATE:
        // state.path name;
        // state.params

      return action.state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  recordReducer,
  mainSearch: mainSearchReducer,
  adminRequests: adminRequestsReducer,
  adminSearch: adminSearchReducer,
  adminSearchHistory: adminSearchHistoryReducer,
  adminCategories: adminCategoriesReducer,
  authPage: authPageReducer,
  createForm: createFormReducer,
  search: searchReducer,
  adminSearchBar: adminSearchBarReducer,
  sendEmailForm: sendEmailFormReducer,
  categoriesTree: categoriesTreeReducer,
  detailsForm: detailsFormReducer,
  phone: phoneReducer,
  results: resultsPageReducer,
  recordSettings: recordSettingsReducer,
  contactUsForm: contactUsFormReducer,
  form,
  router
});

export default rootReducer;
