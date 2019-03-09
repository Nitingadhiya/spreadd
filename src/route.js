import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import Splash from './Screen/Splash'
import Welcome from './Screen/Welcome'
import Login from './Screen/Login'
import Signup from './Screen/Signup'
import ForgotPassoword from './Screen/ForgotPassword'
import Home from './Screen/Home/Home'
import CategoryDetails from './Screen/Home/CategoryDetails'
import RestaurantDetails from './Screen/Home/RestaurantDetails'
import FoodDetails from './Screen/Home/FoodDetails'
import SelectQuantity from './Screen/Home/SelectQuantity'
import SelectAddress from './Screen/Home/SelectAddress'
import SelectPayment from './Screen/Home/SelectPayment'
import Hot from './Screen/Hot/Hot'
import NearBy from './Screen/NearBy/NearBy'
import Notifications from './Screen/Notifications/Notifications'
import Profile from './Screen/Profile/Profile'
import EditProfile from './Screen/Profile/EditProfile'
import Payments from './Screen/Profile/Payments'
import ManageAddress from './Screen/Profile/ManageAddress'
import ChangePassword from './Screen/Profile/ChangePassword'
import Cart from './Screen/Cart'

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Images, Color, Fonts, Matrics, ApplicationStyles } from './Config'

const TabNavigation = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ screenProps }) => ({
      tabBarIcon: ({ tintColor }) => (
        <Image source={Images.home} style={{ tintColor }} />
      )
    })
  },
  Hot: {
    screen: Hot,
    navigationOptions: ({ screenProps }) => ({
      tabBarIcon: ({ tintColor }) => (
        <Image source={Images.hot} style={{ tintColor }} />
      )
    })
  },
  NearBy: {
    screen: NearBy,
    navigationOptions: ({ screenProps }) => ({
      // tabBarOnPress: ({ navigation }) => {
      //   if (navigation.isFocused()) {
      //   } else {
      //     navigation.navigate('NearBy')
      //   }
      // },
      tabBarIcon: ({ tintColor }) => (
        <Image source={Images.nearby} style={{ tintColor }} />
      )
    })
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: ({ screenProps }) => ({
      tabBarIcon: ({ tintColor }) => (
        <Image source={Images.notifications} style={{ tintColor }} />
      )
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ screenProps }) => ({
      tabBarIcon: ({ tintColor }) => (
        <Image source={Images.profile} style={{ tintColor }} />
      )
    })
  },
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      upperCaseLabel: false,
      labelStyle: {
        marginBottom: 5,
      },
      //tabStyle: { marginTop: Platform.OS === 'ios' ? 10 : 0 },
      style: { backgroundColor: Color.white },
      activeTintColor: Color.primary,
      //inactiveTintColor: Color.lightGray,
    },
    lazy: true,
  }
);

const AppNavigation = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null,
      }
    },
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null,
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    Signup: {
      screen: Signup,
    },
    ForgotPassoword: {
      screen: ForgotPassoword,
      navigationOptions: {
        header: null,
      }
    },
    TabHome: {
      screen: TabNavigation,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Survis',
        headerTitleStyle: { fontSize: 28, fontFamily: Fonts.type.Arista, flex: 1, textAlign: 'center', },
        headerStyle: {
          backgroundColor: Color.primary, borderBottomWidth: 0,
          elevation: 0
        },
        headerTintColor: Color.white,
        headerLeft:
          <TouchableOpacity onPress={() => { navigation.goBack() }} >
            <Image source={Images.qr_code} style={styles.headerLeftIconStyle} />
          </TouchableOpacity>,
        headerRight:
          <TouchableOpacity onPress={() => { navigation.navigate('Cart') }} >
            <Image source={Images.cart} style={styles.headerLeftIconStyle} />
          </TouchableOpacity>,
      })

    },
    RestaurantDetails: {
      screen: RestaurantDetails,
      navigationOptions: {
        header: null,
      }
    },
    CategoryDetails: {
      screen: CategoryDetails
    },
    FoodDetails: {
      screen: FoodDetails,
      navigationOptions: {
        header: null,
      }
    },
    SelectQuantity: {
      screen: SelectQuantity
    },
    SelectAddress: {
      screen: SelectAddress
    },
    SelectPayment: {
      screen: SelectPayment
    },
    Cart: {
      screen: Cart
    },
    Payments: {
      screen: Payments
    },
    ManageAddress: {
      screen: ManageAddress
    },
    ChangePassword: {
      screen: ChangePassword
    },
    EditProfile: {
      screen: EditProfile
    }
  }, {
    // initialRouteName: 'Signup'
  })

const styles = {
  ...ApplicationStyles
}


export default createAppContainer(AppNavigation);