import { combineReducers } from 'redux';

function isError(state = false, action = {}) {
  switch (action.type) {
    case 'SET_IS_ERROR':
      return { error: action.error, message: action.message };
    default:
      return state;
  }
}

function isLoading(state = false, action = {}) {
  switch (action.type) {
    case 'SET_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

function user(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.user };
    case 'DELETE_USER':
      return {};
    default:
      return state;
  }
}

function isLog(state = false, action = {}) {
  switch (action.type) {
    case 'SET_LOG':
      return action.isLog;
    default:
      return state;
  }
}

const reducer = combineReducers({ isError, isLoading, user, isLog });

export default reducer;
