import {
  GET_PROMOTIONS
} from '../actions/types';
const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case GET_PROMOTIONS.SUCCESS:
      return { getPromotionsSuccess: true, data: action.payload }

    case GET_PROMOTIONS.ERROR:
      return { isRequestFailed: true, data: action.payload }

    default:
      return state;
  }
}
