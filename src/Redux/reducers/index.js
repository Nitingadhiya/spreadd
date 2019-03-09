import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import homeReducer from './homeReducer';
import hotReducer from './hotReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  home: homeReducer,
  hot: hotReducer
});