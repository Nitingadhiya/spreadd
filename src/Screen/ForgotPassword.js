import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform
} from 'react-native';
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, TextInputField, ActionModal, LoadWheel } from '../Component'
import { Color, Images, Matrics, Fonts, ApplicationStyles } from '../Config'
import { forgotPasswordRequest } from '../Redux/actions'
import Global from '../Global/Global'

class ForgotPassoword extends Component {

  state = {
    email: '',
    errorModal: false,
    errorMsg: '',
    successModal: false,
    successMsg: '',
    loading: false
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.response.forgotPasswordSuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == '1') {
        await this.setState({ loading: false, successModal: true, successMsg: 'New password has been sent to your email' })
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
    await this.setState({ email: this.state.email.trim() })
    if (this.state.email == '') {
      this.setState({ errorModal: true, errorMsg: 'Please Enter value for email' })
    }

    else {
      this.setState({ loading: true })
      this.props.forgotPasswordRequest({ email: this.state.email })
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={Matrics.keyboardShouldPersistTaps} contentContainerStyle={{ flex: 1 }}>

          <View style={{
            height: '60%',
            //position: Platform.OS == 'android' ? 'absolute' : 'relative',
            zIndex: -1,
          }}>
            <ImageBackground style={styles.topViewStyle} resizeMode='cover' source={Images.bg_img} >

              <Image source={Images.key} style={{ marginTop: Matrics.ScaleValue(30), marginBottom: Matrics.ScaleValue(20) }} />
              <Text style={styles.titleStyle}>Forgot Password?</Text>
              <Text style={styles.descTextStyle}>No problem! Submit your registered e-mail below and you will receive a link to reset your password</Text>
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

              <Button label={'Send'} customStyle={{ marginVertical: Matrics.ScaleValue(12) }} onPress={() => { this.onSubmit() }} />
            </View>

          </View>
          <TouchableOpacity style={styles.backArrowStyle} onPress={() => { this.props.navigation.goBack() }}>
            <Image source={Images.back} style={styles.headerLeftIconStyle} />
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        {/* <ActionModal visible={this.state.errorModal}
          message={this.state.errorMsg}
          onPress={() => { this.setState({ errorModal: false }) }}
        />
        <ActionModal visible={this.state.successModal}
          imageSrc={Images.success}
          message={this.state.successMsg}
          onPress={async () => { await this.setState({ successModal: false }); this.props.navigation.navigate('Login') }}
        />
        <LoadWheel visible={this.state.loading} /> */}
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

  backArrowStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 5
  },
  topViewStyle: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center'
  },
  titleStyle: {
    fontSize: 25,
    fontFamily: Fonts.type.Arimo,
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
    top: -80,
    //zIndex: 3,
    // shadowOpacity: 0.8,
    // shadowOffset: { height: 5 },
    // elevation: 1,
    //borderWidth: 1
  },

  textViewStyle: {
    //flex: 1,
    //zIndex: 2,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    marginHorizontal: Matrics.ScaleValue(20),
  },
}

const mapStateToProps = (state) => {
  return {
    response: state.auth,
  };
}
export default connect(mapStateToProps, { forgotPasswordRequest })(ForgotPassoword);