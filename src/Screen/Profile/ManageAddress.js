import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Picker,
  Modal,
  Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Color, Images, Matrics, ApplicationStyles, Fonts } from '../../Config'
import { Button, TextInputField, ActionModal } from '../../Component'
import ManageAddressForm from './ManageAddressForm'
import ManageAddressDetails from './ManageAddressDetails'


export default class ManageAddress extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Manage Address',
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
    form: false,
    editAddrData: {}
  }

  displayScreen(val) {
    this.setState({ form: val })
  }

  reset() {
    this.setState({ editAddrData: {} })
  }

  setEditAddr(val) {
    this.setState({ editAddrData: val, form: true })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }} >
        {this.state.form ?
          <ManageAddressForm onChange={(val) => this.displayScreen(val)} editAddrData={this.state.editAddrData} /> :
          <ManageAddressDetails onChange={(val) => this.displayScreen(val)} setEditAddr={(val) => this.setEditAddr(val)} reset={() => this.reset()} />}
      </SafeAreaView>
    )
  }
}

const styles = {
  ...ApplicationStyles,
}
