import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  AsyncStorage
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Color, Images, Matrics, ApplicationStyles, Fonts } from '../../Config'
import { Button, TextInputField, ActionModal } from '../../Component'
import PaymentsForm from './PaymentsForm'
import PaymentsDetails from './PaymentsDetails'


export default class Payments extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Payments',
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.headerStyle,
    headerTintColor: Color.white,
    headerLeft:
      <TouchableOpacity onPress={() => { navigation.goBack() }} >
        <Image source={Images.back} style={styles.headerLeftIconStyle} />
      </TouchableOpacity>,
    headerRight:
      <View />,
  })

  state = {
    form: false
  }

  displayScreen(val) {
    this.setState({ form: val })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }} >
        {this.state.form ?
          <PaymentsForm onChange={(val) => this.displayScreen(val)} /> :
          <PaymentsDetails onChange={(val) => this.displayScreen(val)} />}
      </SafeAreaView>
    )
  }
}

const styles = {
  ...ApplicationStyles,
}