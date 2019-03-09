import { Platform } from 'react-native';

import Color from './Color'
import Matrics from './Matrics'
import Fonts from './Fonts';

const ApplicationStyles = {
  headerStyle: {
    backgroundColor: Color.primary,
    borderBottomWidth: 0,
    elevation: 0
  },
  headerTitleStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    fontSize: Matrics.ScaleValue(20),
    fontFamily: Fonts.type.Arimo,
    color: Color.white
  },
  // headerTextStyle: {
  //   // fontSize: Fonts.size.regular,
  //   // fontFamily: Fonts.type.OpenSans,
  //   color: Color.white,
  //   //marginHorizontal: Matrics.smallMargin
  // },
  headerLeftIconStyle: {
    margin: Matrics.ScaleValue(16)
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Color.bgColor
  },
  formContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: Matrics.ScaleValue(25),
  },
  navBarMargin: {
    paddingTop: Platform.OS == 'ios' ? (Matrics.screenHeight == 812 ? 44 : 20) : 0,
  },
  // textStyle: {
  //   fontSize: Fonts.size.regular,
  //   fontFamily: Fonts.type.OpenSans,
  //   color: Color.lightGray,
  //   textAlign: 'center'
  // },
  modalViewContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  viewContainer: {
    backgroundColor: Color.white,
    borderRadius: 10,
    margin: Matrics.ScaleValue(20),
    padding: Matrics.ScaleValue(15),
    //width: '75%'
  },
  fontStyle: {
    fontSize: Matrics.ScaleValue(16),
    fontFamily: Fonts.type.Arimo,
  },
  searchContainer: {
    backgroundColor: Color.primary,
    paddingHorizontal: Matrics.ScaleValue(15),
    paddingTop: Matrics.ScaleValue(5),
    paddingBottom: Matrics.ScaleValue(15),
  },
  searchView: {
    backgroundColor: Color.white,
    borderRadius: Matrics.ScaleValue(5),
    padding: Matrics.ScaleValue(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    margin: Matrics.ScaleValue(10),
    alignSelf: 'center',
  },
  closeiconStyle: {
    height: 12,
    width: 12,
    margin: Matrics.ScaleValue(10),
    alignSelf: 'center',
    tintColor: Color.darkGray
  },
  searchInput: {
    fontSize: Matrics.ScaleValue(16),
    fontFamily: Fonts.type.Arimo,
    flex: 1,
    color: Color.darkGray
  },
  titleStyle: {
    fontSize: Matrics.ScaleValue(15),
    fontFamily: Fonts.type.ArimoBold,
    marginHorizontal: Matrics.ScaleValue(15),
    marginVertical: Matrics.ScaleValue(10),
  },
  textStyle: {
    fontFamily: Fonts.type.Arimo,
  },
  errorTextStyle: {
    fontSize: Matrics.ScaleValue(16),
    fontFamily: Fonts.type.ArimoBold,
    textAlign: 'center',
    color: Color.textGray
  }
  // titleStyle: {
  //   fontFamily: Fonts.type.OpenSansSemiBold,
  //   fontSize: Fonts.size.h6,
  //   color: Color.lightBlack
  // },
  // // itemTextStyle:{
  // //   fontSize: Fonts.size.h6,
  // //   fontFamily: Fonts.type.OpenSansSemiBold,
  // //   color:Color.lightBlack
  // // },
  // errorView: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // errorText: {
  //   color: Color.darkGray,
  //   fontSize: Fonts.size.h4,
  //   fontFamily: Fonts.type.OpenSans,
  //   textAlign: 'center'
  // },

}
export default ApplicationStyles;