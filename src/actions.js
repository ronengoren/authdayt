import { ADD_FRIEND } from './types';
import { combineReducers } from 'redux';

export const addFriend = friendIndex => (
  {
    type: ADD_FRIEND,
    payload: friendIndex,
  }
);