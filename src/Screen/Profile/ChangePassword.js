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
import { connect } from 'react-redux'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Color, Images, Matrics, ApplicationStyles, Fonts } from '../../Config'
import { Button, TextInputField, ActionModal, LoadWheel } from '../../Component'
import { changePasswordRequest } from '../../Redux/actions'
import Global from '../../Global/Global'

class ChangePassword extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Change Password',
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
    currPassword: '',
    newPassword: '',
    confirmPassword: '',
    loading: false,
    errorModal: false,
    errorMsg: '',
    successModal: false,
    successMsg: '',
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.response.changePasswordSuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == 1) {
        this.setState({ successModal: true, successMsg: 'Password has been changed successfully...' })
      }
      else {
        this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed && this.state.loading) {
      this.setState({ loading: false, errorModal: true, errorMsg: Global.requestFailedMsg })
    }
  }

  async onSubmit() {
    Keyboard.dismiss();
    await this.setState({ currPassword: this.state.currPassword.trim(), newPassword: this.state.newPassword.trim(), confirmPassword: this.state.confirmPassword.trim() })
    if (this.state.currPassword == '' || this.state.newPassword == '' || this.state.confirmPassword == '') {
      this.setState({ errorModal: true, errorMsg: 'Please Enter value for all field' })
    }
    else if (this.state.newPassword.length < 6) {
      this.setState({ errorModal: true, errorMsg: 'Password should not be less than 6 character' })
    }
    else if (this.state.newPassword != this.state.confirmPassword) {
      this.setState({ errorModal: true, errorMsg: 'Password is mismatched' })
    }
    else {
      this.setState({ loading: true })
      this.props.changePasswordRequest({ user_id: global.userId, newpassword: this.state.newPassword, oldpassword: this.state.currPassword })
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }} >
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Matrics.keyboardVerticalOffset}
          style={styles.formContainer}>

          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

            <TextInputField label='Current Password'
              style={styles.textStyle}
              value={this.state.currPassword}
              secureTextEntry={true}
              returnKeyType={'next'}
              onSubmitEditing={(event) => this.newPassword.focus()}
              onChangeText={(val) => { this.setState({ currPassword: val }) }}
            />

            <TextInputField label='New Password'
              style={styles.textStyle}
              value={this.state.newPassword}
              secureTextEntry={true}
              Ref={(r) => { this.newPassword = r; }}
              onChangeText={(val) => { this.setState({ newPassword: val }) }}
              returnKeyType={'next'}
              onSubmitEditing={(event) => this.confirmPassword.focus()}
            />

            <TextInputField label='Confirm Password'
              style={styles.textStyle}
              value={this.state.confirmPassword}
              secureTextEntry={true}
              Ref={(r) => { this.confirmPassword = r; }}
              onChangeText={(val) => { this.setState({ confirmPassword: val }) }}
              returnKeyType={'done'}
              onSubmitEditing={(event) => { }}
            />

          </KeyboardAwareScrollView>
          <Button label={'Change'}
            onPress={() => this.onSubmit()}
            customStyle={{ marginBottom: Matrics.ScaleValue(25) }} />

        </KeyboardAvoidingView>
        <LoadWheel visible={this.state.loading} />
        <ActionModal visible={this.state.errorModal}
          message={this.state.errorMsg}
          onPress={() => { this.setState({ errorModal: false }) }}
        />
        <ActionModal visible={this.state.successModal}
          imageSrc={Images.success}
          message={this.state.successMsg}
          onPress={async () => { await this.setState({ successModal: false }); this.props.navigation.goBack() }}
        />
      </SafeAreaView>
    )
  }
}

const styles = {
  ...ApplicationStyles,
}

const mapStateToProps = (state) => {
  return {
    response: state.auth,
  };
}
export default connect(mapStateToProps, { changePasswordRequest })(ChangePassword);