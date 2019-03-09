import {
  GET_USER_DETAILS, ADD_CARD_DETAILS, GET_CARD_DETAILS, DELETE_CARD_DETAILS,
  ADD_ADDRESS_DETAILS, EDIT_ADDRESS_DETAILS, DELETE_ADDRESS_DETAILS, GET_ADDRESS_DETAILS
} from '../actions/types';
const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
  //console.log(action, 'action');
  switch (action.type) {

    case GET_USER_DETAILS.SUCCESS:
      return { getProfileDetailsSuccess: true, data: action.payload }

    case ADD_CARD_DETAILS.SUCCESS:
      return { addCardDetailsSuccess: true, data: action.payload }

    case GET_CARD_DETAILS.SUCCESS:
      return { getCardDetailSuccess: true, data: action.payload }

    case DELETE_CARD_DETAILS.SUCCESS:
      return { deleteCardDetailSuccess: true, data: action.payload }

    case ADD_ADDRESS_DETAILS.SUCCESS:
      return { addAddressDetailSuccess: true, data: action.payload }

    case EDIT_ADDRESS_DETAILS.SUCCESS:
      return { editAddressDetailSuccess: true, data: action.payload }

    case DELETE_ADDRESS_DETAILS.SUCCESS:
      return { deleteAddressDetailSuccess: true, data: action.payload }

    case GET_ADDRESS_DETAILS.SUCCESS:
      return { getAddressDetailSuccess: true, data: action.payload }

    case ADD_ADDRESS_DETAILS.ERROR:
    case EDIT_ADDRESS_DETAILS.ERROR:
    case DELETE_ADDRESS_DETAILS.ERROR:
    case GET_ADDRESS_DETAILS.ERROR:
    case DELETE_CARD_DETAILS.ERROR:
    case GET_CARD_DETAILS.ERROR:
    case ADD_CARD_DETAILS.ERROR:
    case GET_USER_DETAILS.ERROR:
      return { isRequestFailed: true, data: action.payload }

    default:
      return state;
  }
}