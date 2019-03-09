import {
  GET_PROMOTIONS
} from './types'
import Api from '../../Api/api'

export const getPromotionsRequest = () => {
  return {
    type: GET_PROMOTIONS.REQ,
    constant: GET_PROMOTIONS,
    api: Api.getPromotions
  };
}