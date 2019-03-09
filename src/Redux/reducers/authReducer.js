import {
  SIGNUP,
  LOGIN,
  FORGET_PASSWORD,
  CHANGE_PASSWORD
} from '../actions/types';
const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SIGNUP.SUCCESS:
      return { signupSuccess: true, data: action.payload }

    case LOGIN.SUCCESS:
      return { loginSuccess: true, data: action.payload }

    case FORGET_PASSWORD.SUCCESS:
      return { forgotPasswordSuccess: true, data: action.payload }

    case CHANGE_PASSWORD.SUCCESS:
      return { changePasswordSuccess: true, data: action.payload }

    case CHANGE_PASSWORD.ERROR:
    case SIGNUP.ERROR:
    case LOGIN.ERROR:
    case FORGET_PASSWORD.ERROR:
      return { isRequestFailed: true, data: action.payload }

    default:
      return state;
  }
}