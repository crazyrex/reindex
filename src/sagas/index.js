/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects';
import { api, history } from '../services';
import * as actions from '../actions';

import { getUser, getStarredByUser } from '../reducers/selectors';

// each entity defines 3 creators { request, success, failure }
const { user, repo, starred, stargazers } = actions;

// url for first page
// urls for next pages will be extracted from the successive loadMore* requests
const firstPageStarredUrl = login => `users/${login}/starred`;
// const firstPageStargazersUrl = fullName => `repos/${fullName}/stargazers`;


/**
 **** Subroutines ****
 */

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
function* fetchEntity(entity, apiFn, id, url) {
  yield put(entity.request(id));
  const { response, error } = yield call(apiFn, url || id);
  if (response) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
  }
}

// yeah! we can also bind Generators
export const fetchUser = fetchEntity.bind(null, user, api.fetchUser);
export const fetchRepo = fetchEntity.bind(null, repo, api.fetchRepo);
export const fetchStarred = fetchEntity.bind(null, starred, api.fetchStarred);
export const fetchStargazers = fetchEntity.bind(null, stargazers, api.fetchStargazers);

// load user unless it is cached
export function* loadUser(login, requiredFields) {
  const userObj = yield select(getUser, login);
  if (!userObj || requiredFields.some(key => !userObj.hasOwnProperty(key))) {
    yield call(fetchUser, login);
  }
}

// load repo unless it is cached
// function* loadRepo(fullName, requiredFields) {
//   const repoObj = yield select(getRepo, fullName);
//   if (!repoObj || requiredFields.some(key => !repoObj.hasOwnProperty(key))) {
//     yield call(fetchRepo, fullName);
//   }
// }

// load next page of repos starred by this user unless it is cached
export function* loadStarred(login, loadMore) {
  const starredByUser = yield select(getStarredByUser, login);
  if (!starredByUser || !starredByUser.pageCount || loadMore) {
    yield call(
      fetchStarred,
      login,
      starredByUser.nextPageUrl || firstPageStarredUrl(login)
    );
  }
}

// load next page of users who starred this repo unless it is cached
// function* loadStargazers(fullName, loadMore) {
//   const stargazersByRepo = yield select(getStargazersByRepo, fullName);
//   if (!stargazersByRepo || !stargazersByRepo.pageCount || loadMore) {
//     yield call(
//       fetchStargazers,
//       fullName,
//       stargazersByRepo.nextPageUrl || firstPageStargazersUrl(fullName)
//       );
//   }
// }

/**
 ****************************** WATCHERS ***********************************
 **/

// trigger router navigation via history
function* watchNavigate() {
  while (true) {
    const { pathname } = yield take(actions.NAVIGATE);
    yield history.push(pathname);
  }
}

import recordSaga from '../containers/RecordPage/sagas';
import createFormSaga from '../components/CreateForm/saga';
import searchSaga from '../components/SearchBar/saga';
import adminSearchSaga from '../components/AdminSearchBar/saga';
import categoriesTreeSaga from '../components/CategoriesTree/saga';
import MainSearchSaga from '../containers/MainSearch/sagas';
import PhoneSaga from '../components/Phone/saga';
import ResultsSaga from '../containers/ResultsPage/sagas';
import uploadSaga from '../components/Upload/sagas';
import AdminRequestsSaga from '../containers/AdminRequests/sagas';
import AdminSearch from '../containers/AdminSearch/sagas';
import AdminSearchHistorySaga from '../containers/AdminSearchHistory/sagas';
import AuthPage from '../containers/AuthPage/sagas';
import SendEmailFormSaga from '../components/SendEmailForm/saga';
import ContactUsFormSaga from '../components/ContactUsForm/saga';
import RecordSettingsSaga from '../components/RecordSettings/saga';
import DownloadSaga from '../components/Download/saga';

export default function* root() {
  yield [
    ...fork(watchNavigate),
    ...recordSaga,
    ...createFormSaga,
    ...searchSaga,
    ...adminSearchSaga,
    ...categoriesTreeSaga,
    ...MainSearchSaga,
    ...ResultsSaga,
    ...AdminRequestsSaga,
    ...AdminSearch,
    ...AdminSearchHistorySaga,
    ...AuthPage,
    ...PhoneSaga,
    ...SendEmailFormSaga,
    ...ContactUsFormSaga,
    ...RecordSettingsSaga,
    ...uploadSaga,
    ...DownloadSaga
  ];
}
