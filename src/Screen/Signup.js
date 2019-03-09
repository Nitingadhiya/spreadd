import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PhoneInput from 'react-native-phone-input'

import { signupRequest } from '../Redux/actions'
import { Color, Images, Matrics, ApplicationStyles, Fonts } from '../Config'
import { Button, TextInputField, ImagePickerModal, ActionModal, LoadWheel } from '../Component'
import Global from '../Global/Global'

class Signup extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Sign Up',
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
    name: '',
    email: '',
    mobileNo: '',
    password: '',
    country_code: '',
    imagePickerModal: false,
    profileImage: {},
    profileImg: '',
    errorModal: false,
    errorMsg: '',
    successModal: false,
    successMsg: '',
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.response.signupSuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == '1') {
        this.setState({ loading: false, successModal: true, successMsg: `User has been registered successfully` })
        AsyncStorage.setItem('login', 'true')
        AsyncStorage.setItem('UserInfo', JSON.stringify(data.data))
        let userInfo = data.data
        global.userId = userInfo.users.id
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


    await this.setState({ name: this.state.name.trim(), email: this.state.email.trim(), mobileNo: this.state.mobileNo.trim(), password: this.state.password.trim() })
    if (this.state.name == '' || this.state.email == '' || this.state.mobileNo == '' || this.state.password == '') {
      this.setState({ errorModal: true, errorMsg: 'Please Enter value for all field' })
    }
    else if (this.state.mobileNo.length < 10) {
      this.setState({ errorModal: true, errorMsg: 'Please Enter valid Mobile no' })
    }
    else if (this.state.password.length < 6) {
      this.setState({ errorModal: true, errorMsg: 'Password should not be less than 6 character' })
    }
    else {
      let mo_no = this.state.mobileNo.replace(`${this.phone.getDialCode()}`, '')
      let cuntr_code = this.phone.getDialCode()
      await this.setState({ mobileNo: mo_no, country_code: cuntr_code })
      console.log(this.state.country_code, this.state.mobileNo)
      this.setState({ loading: true })


      let names = this.state.name.split(' ')
      let fname = ''
      let lname = ''
      if (names.length > 1) {
        fname = names[0]
        lname = this.state.name.replace(names[0], '')
      }
      else {
        fname = this.state.name
      }

      this.props.signupRequest({ email: this.state.email, password: this.state.password, country_code: this.state.country_code, phone: this.state.mobileNo, first_name: fname, last_name: lname.trim(), profile_pic: this.state.profileImage.data })
    }
    //this.props.navigation.navigate('TabHome')
  }

  openGallery() {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: Global.imageCompressionRatio
    }).then(image => {
      this.setState({ profileImage: { uri: image.path, type: image.mime, name: image.filename == null ? 'IMG1.jpg' : image.filename, data: image.data } })
    });
  }

  openCamera() {
    ImagePicker.openCamera({
      mediaType: "photo",
      includeBase64: true,
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: Global.imageCompressionRatio
    }).then(image => {
      this.setState({ profileImage: { uri: image.path, type: image.mime, name: image.filename == null ? 'IMG1.jpg' : image.filename, data: image.data } })
    });
  }

  onPressGallery() {
    this.setState({ imagePickerModal: false })
    setTimeout(() => { this.openGallery() }, 500)
  }

  onPressCamera() {
    this.setState({ imagePickerModal: false })
    setTimeout(() => { this.openCamera() }, 500)
  }

  render() {

    return (
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

          {Object.keys(this.state.profileImage).length == 0 ?
            <View style={styles.profileView}>
              <TouchableOpacity onPress={() => this.setState({ imagePickerModal: true })}>
                <Image source={Images.profile_icon_placeholder} style={styles.profileImgstyle} />
                <Image source={Images.plus} style={styles.plusIconStyle} />
              </TouchableOpacity>
            </View>
            :
            <View style={styles.profileView}>
              <TouchableOpacity onPress={() => this.setState({ imagePickerModal: true })}>
                <Image source={{ uri: this.state.profileImage.uri }} style={styles.profileImgstyle} />
              </TouchableOpacity>
            </View>
          }
          {/* <Image style={{bottom:0,right:0}} source={Images.editIcon}/> */}


          <Text style={[styles.fontStyle, { alignSelf: 'center' }]}>Upload Picture</Text>
          <TextInputField label='Name'
            value={this.state.name}
            returnKeyType={'next'}
            onSubmitEditing={(event) => this.Email.focus()}
            onChangeText={(name) => { this.setState({ name }) }}
          />
          <TextInputField label='Email'
            value={this.state.email}
            returnKeyType={'next'}
            Ref={(r) => { this.Email = r; }}
            onSubmitEditing={(event) => this.phone.focus()}
            onChangeText={(email) => { this.setState({ email }) }}
          />
          {/* <PhoneInput ref='phone' /> */}
          <Text style={styles.labelTextStyle}>Mobile Number</Text>
          <PhoneInput
            ref={ref => {
              this.phone = ref;
            }}
            style={{ borderBottomWidth: 1, paddingVertical: Matrics.ScaleValue(5), borderColor: 'rgba(0, 0, 0, .25)' }}
            onChangePhoneNumber={(text) => this.setState({ mobileNo: text })}

          />

          <TextInputField label='Password'
            value={this.state.password}
            returnKeyType={'done'}
            maxLength={16}
            secureTextEntry={true}
            Ref={(r) => { this.Password = r; }}
            onSubmitEditing={(event) => { }}
            onChangeText={(password) => { this.setState({ password }) }}
          />
          <Button label={'Sign Up'} customStyle={{ marginVertical: Matrics.ScaleValue(12) }} onPress={() => { this.onSubmit() }} />

          <Text style={styles.linkTextStyle} onPress={() => this.props.navigation.navigate('Login')}>Already have an Account? <Text style={{ color: Color.primary }}>SIGN IN</Text></Text>
        </KeyboardAwareScrollView>
        <ImagePickerModal visible={this.state.imagePickerModal}
          onPressCamera={() => this.onPressCamera()}
          onPressGallery={() => this.onPressGallery()}
          onPressCancel={() => this.setState({ imagePickerModal: false })}
        />
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
    backgroundColor: Color.white,
    marginHorizontal: Matrics.ScaleValue(20)
  },
  profileView: {
    alignSelf: 'center',
    margin: Matrics.ScaleValue(25)
  },
  profileImgstyle: {
    height: Matrics.profileImage,
    width: Matrics.profileImage,
    resizeMode: 'contain',
    borderRadius: Matrics.profileImage / 2
    //marginVertical: Matrics.baseSection
  },
  linkTextStyle: {
    fontFamily: Fonts.type.Arimo,
    fontSize: Matrics.ScaleValue(15),
    textAlign: 'center',
    margin: Matrics.ScaleValue(25),
  },
  plusIconStyle: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  labelTextStyle: {
    fontFamily: Fonts.type.Arimo,
    fontSize: Matrics.ScaleValue(15),
    marginTop: Matrics.ScaleValue(10),

    color: 'rgba(0, 0, 0, .38)'
  }
}

const mapStateToProps = (state) => {
  return {
    response: state.auth,
  };
}
export default connect(mapStateToProps, { signupRequest })(Signup);