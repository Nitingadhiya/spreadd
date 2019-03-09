import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  AsyncStorage
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackActions, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { Button, TextInputField, ActionModal, LoadWheel } from '../Component'
import { Color, Images, Matrics, Fonts, ApplicationStyles } from '../Config'
import { loginRequest } from '../Redux/actions'
import Global from '../Global/Global'

class Login extends Component {

  state = {
    email: '',
    password: '',
    errorModal: false,
    errorMsg: '',
    successModal: false,
    successMsg: '',
    loading: false
  }

  navigateToScreen(route) {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })]
    });
    this.props.navigation.dispatch(navigateAction);
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.response.loginSuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == '1') {
        await this.setState({ loading: false })
        await AsyncStorage.setItem('login', 'true')
        await AsyncStorage.setItem('UserInfo', JSON.stringify(data.data))
        let userInfo = data.data
        global.userId = userInfo.users.id
        this.navigateToScreen('TabHome')
      }
      else {
        this.setState({ loading: false, errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed && this.state.loading) {
      this.setState({ loading: false, errorModal: true, errorMsg: Global.requestFailedMsg })
    }
  }

  async onSubmit() {
    await this.setState({ email: this.state.email.trim(), password: this.state.password.trim() })
    if (this.state.email == '' || this.state.password == '') {
      this.setState({ errorModal: true, errorMsg: 'Please Enter value for all field' })
    }

    else {
      this.setState({ loading: true })
      this.props.loginRequest({ email: this.state.email, password: this.state.password })
    }
    //this.props.navigation.navigate('TabHome')
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={Matrics.keyboardShouldPersistTaps} contentContainerStyle={{ flex: 1 }}>

          <View style={{
            height: '60%', position: Platform.OS == 'android' ? 'absolute' : 'relative',
            zIndex: -1,
          }}>
            <ImageBackground style={styles.topViewStyle} resizeMode='cover' source={Images.bg_img} >

              <Image source={Images.logo} />
              <Text style={styles.logoTextStyle}>Survis</Text>
              <Text style={styles.descTextStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            </ImageBackground>
          </View>


          <View style={styles.textViewStyle}>
            <View style={styles.contentViewStyle}>

              <TextInputField label='E-mail'
                style={{ zIndex: 4 }}
                value={this.state.email}
                returnKeyType={'next'}
                onSubmitEditing={(event) => this.Password.focus()}
                onChangeText={(email) => { this.setState({ email }) }}
              />
              <TextInputField label='Password'
                secureTextEntry={true}
                value={this.state.password}
                returnKeyType={'done'}
                Ref={(r) => { this.Password = r; }}
                onSubmitEditing={(event) => { }}
                onChangeText={(password) => { this.setState({ password }) }}
              />
              <Text style={styles.forgotPswdTxtStyle} onPress={() => { this.props.navigation.navigate('ForgotPassoword') }}>Forgot password?</Text>
              <Button label={'Sign In'} customStyle={{ marginVertical: Matrics.ScaleValue(12) }} onPress={() => { this.onSubmit() }} />
            </View>
            <Text style={styles.textStyle} onPress={() => this.props.navigation.navigate('Signup')}>Don't Have an Account? <Text style={{ color: Color.primary }}>SIGN UP</Text></Text>
          </View>
          <TouchableOpacity style={styles.backArrowStyle} onPress={() => { this.props.navigation.goBack() }}>
            <Image source={Images.back} style={styles.headerLeftIconStyle} />
          </TouchableOpacity>
        </KeyboardAwareScrollView>

        <ActionModal visible={this.state.errorModal}
          message={this.state.errorMsg}
          onPress={() => { this.setState({ errorModal: false }) }}
        />
        <ActionModal visible={this.state.successModal}
          imageSrc={Images.success}
          message={this.state.successMsg}
          onPress={async () => { await this.setState({ successModal: false }); this.props.navigation.navigate('TabHome') }}
        />
        <LoadWheel visible={this.state.loading} />
      </SafeAreaView >
    )
  }
}

const styles = {
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: Color.bgColor
  },
  // topViewStyle: {
  //   resizeMode: 'cover',
  //   // width: Matrics.screenWidth,
  //   // height: Matrics.screenHeight * 60 / 100,
  //   width: '100%',
  //   height: '60%',
  //   position: Platform.OS == 'android' ? 'absolute' : 'relative',
  //   zIndex: -1
  // },
  backArrowStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 5
  },
  topViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoTextStyle: {
    fontSize: Matrics.ScaleValue(65),
    fontFamily: Fonts.type.Arista,
    color: Color.white
  },
  descTextStyle: {
    fontSize: Matrics.ScaleValue(17),
    color: Color.white,
    fontFamily: Fonts.type.Arimo,
    marginTop: Matrics.ScaleValue(20),
    textAlign: 'center',
    marginHorizontal: Matrics.ScaleValue(25),
  },
  contentViewStyle: {
    //margin: Matrics.ScaleValue(20),
    padding: Matrics.ScaleValue(20),
    borderRadius: Matrics.ScaleValue(10),
    backgroundColor: Color.white,
    //flex: 1,
    //bottom: 0,
    top: 0,
    zIndex: 3,
    // shadowOpacity: 0.8,
    // shadowOffset: { height: 5 },
    // elevation: 1,
    //borderWidth: 1
  },
  textStyle: {
    fontFamily: Fonts.type.Arimo,
    fontSize: Matrics.ScaleValue(15),
    textAlign: 'center',
    margin: Matrics.ScaleValue(25),
  },
  textViewStyle: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    marginHorizontal: Matrics.ScaleValue(20),
  },
  forgotPswdTxtStyle: {
    textAlign: 'right',
    fontFamily: Fonts.type.Arimo,
    fontSize: Matrics.ScaleValue(15),
    marginBottom: Matrics.ScaleValue(10)
  }

}

const mapStateToProps = (state) => {
  return {
    response: state.auth,
  };
}
export default connect(mapStateToProps, { loginRequest })(Login);