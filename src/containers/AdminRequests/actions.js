import {
  LOAD_REQUESTS,
  LOAD_REQUESTS_SUCCESS,
  APPROVE_REQUEST,
  DELETE_REQUEST,
  UPDATE_REQUEST,
} from './constants';


export function loadRequests(searchText) {
  return {
    type: LOAD_REQUESTS,
    searchText,
  };
}

export function requestsLoaded(requests) {
  return {
    type: LOAD_REQUESTS_SUCCESS,
    requests,
  };
}

export function approveRequest(requestId) {
  return {
    type: APPROVE_REQUEST,
    requestId,
  };
}

export function deleteRequest(requestId) {
  return {
    type: DELETE_REQUEST,
    requestId,
  };
}

export function updateRequest(request) {
  return {
    type: UPDATE_REQUEST,
    request,
  }
}