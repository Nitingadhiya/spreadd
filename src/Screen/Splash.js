import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  AsyncStorage
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import { Images } from '../Config'
import SplashScreen from 'react-native-splash-screen'

export default class Splash extends Component {

  navigateToScreen(route) {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })]
    });
    this.props.navigation.dispatch(navigateAction);
  }

  async componentDidMount() {
    let login = await AsyncStorage.getItem('login')
    if (login == 'true') {
      let userdata = await AsyncStorage.getItem('UserInfo')
      let userInfo = JSON.parse(userdata)
      global.userId = userInfo.users.id
      this.navigateToScreen('TabHome')
    }
    else {
      this.navigateToScreen('Welcome')
    }
    //this.navigateToScreen('Welcome')
    setTimeout(() => { SplashScreen.hide() }, 1000)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image source={Images.splash} style={{ resizeMode: 'cover', height: '100%', width: '100%' }} />
      </View>
    )
  }
}