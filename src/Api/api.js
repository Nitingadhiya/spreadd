import { Platform, AsyncStorage } from 'react-native';
import { apiRequest, apiGetRequest } from '../Redux/utils'

//const base_url = 'http://clientapp.narola.online/pg/SurvisApp/API/'
const base_url = 'http://clientapp.narola.online/hde/survis/'

const url = `${base_url}API/SurvisApp.php?Service=`
const profile_image_url = `${base_url}uploads/profiles/`
const product_image_url = `${base_url}uploads/products/`
const promotion_image_url = `${base_url}uploads/promotion_picture/`
const category_image_url = `${base_url}/uploads/category/`

const user_agent = Platform.OS == 'ios' ? 'iOS' : 'Android'
const device_type = Platform.OS == 'ios' ? 1 : 2

const device_token = global.device_token
const is_testdata = '1'
let fcmToken = '123456'

module.exports = {

  profile_image_url: profile_image_url,
  product_image_url: product_image_url,
  promotion_image_url: promotion_image_url,
  category_image_url: category_image_url,

  /*-----------------------Auth Module-----------------------*/

  signup(params) {
    return apiRequest(params, `${url}Register`)
  },

  login(params) {
    return apiRequest(params, `${url}Login`)
  },

  forgetPassword(params) {
    return apiRequest(params, `${url}ForgotPassword`)
  },

  changePassword(params) {
    return apiRequest(params, `${url}ChangePassword`)
  },

  /*-----------------------Profile Module-----------------------*/

  getUserDetails(params) {
    return apiRequest(params, `${url}GetUserDetails`)
  },

  addCardsDetails(params) {
    return apiRequest(params, `${url}AddCardDetails`)
  },

  getCardDetails(params) {
    return apiRequest(params, `${url}ListCardDetails`)
  },

  deleteCardDetails(params) {
    return apiRequest(params, `${url}DeteleCardDetails`)
  },

  addAddressDetails(params) {
    return apiRequest(params, `${url}AddUserAddress`)
  },

  editAddressDetails(params) {
    return apiRequest(params, `${url}UpdateUserAddress`)
  },

  deleteAddressDetails(params) {
    return apiRequest(params, `${url}DeteleUserAddress`)
  },

  getAddressDetails(params) {
    return apiRequest(params, `${url}GetUserAddress`)
  },

  /*-----------------------Home Module-----------------------*/

  getCategory() {
    return apiGetRequest(`${url}GetHomeScreenCategory`)
  },

  addReview(params) {
    return apiRequest(params, `${url}RateReview`)
  },

  getNewShop(params) {
    return apiRequest(params, `${url}GetAllActiveShop`)
  },

  getAllShop(params) {
    return apiRequest(params, `${url}GetAllActiveShop`)
  },

  getShopProducts(params) {
    return apiRequest(params, `${url}GetProduct`)
  },


  /*-----------------------Hot Module-----------------------*/

  getPromotions() {
    return apiGetRequest(`${url}GetPromotionalRequest`)
  }
}