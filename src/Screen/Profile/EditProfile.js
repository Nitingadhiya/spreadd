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
  Keyboard,
  ImageBackground
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PhoneInput from 'react-native-phone-input'

import { Color, Images, Matrics, ApplicationStyles, Fonts } from '../../Config'
import { Button, TextInputField, ImagePickerModal, ActionModal } from '../../Component'
import { profile_image_url } from '../../Api/api'

import Global from '../../Global/Global'


export default class Payments extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Edit Profile',
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
    imagePickerModal: false,
    profileImage: {},
    profileImg: '',
    country_code: '',
    errorModal: false,
    errorMsg: '',
    successModal: false,
    successMsg: '',
    loading: false
  }

  componentWillMount() {
    const { first_name, last_name, email, phone, country_code, profile_pic } = this.props.navigation.state.params.userInfo
    this.setState({ name: first_name + ' ' + last_name, email, mobileNo: country_code + phone, profileImg: profile_pic })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response.editProfilesuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == 1) {
        this.setState({ successModal: true, successMsg: 'Profile has been edit successfully...' })
      }
      else {
        this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed && this.state.loading) {
      this.setState({ loading: false, errorModal: true, errorMsg: Global.requestFailedMsg })
    }
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

  async onSuccess() {
    await this.setState({ successModal: false });
    this.props.navigation.state.params.refreshData()
    this.props.navigation.goBack()
  }

  async onSubmit() {
    Keyboard.dismiss();
    await this.setState({ name: this.state.name.trim(), email: this.state.email.trim(), mobileNo: this.state.mobileNo.trim() })
    if (this.state.name == '' || this.state.email == '' || this.state.mobileNo == '') {
      this.setState({ errorModal: true, errorMsg: 'Please Enter value for all field' })
    }
    else if (this.state.mobileNo.length < 10) {
      this.setState({ errorModal: true, errorMsg: 'Please Enter valid Mobile no' })
    }
    else {
      let mo_no = this.state.mobileNo.replace(`${this.phone.getDialCode()}`, '')
      let cuntr_code = this.phone.getDialCode()

      console.log(mo_no, cuntr_code)

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
      console.log(fname, lname)

      this.setState({ loading: true })
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }} >
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Matrics.keyboardVerticalOffset}
          style={styles.formContainer}>

          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

            {Object.keys(this.state.profileImage).length == 0 ?
              <View style={styles.profileView}>
                <TouchableOpacity onPress={() => this.setState({ imagePickerModal: true })}>
                  <ImageBackground source={Images.profile_icon_placeholder} style={styles.profileImgstyle}>
                    <Image
                      source={{ uri: `${profile_image_url}${this.state.profileImg}` }}
                      style={styles.profileImgstyle} />
                  </ImageBackground>
                  <Image source={Images.edit} style={styles.editIconStyle} />

                </TouchableOpacity>
              </View>
              :
              <View style={styles.profileView}>
                <TouchableOpacity onPress={() => this.setState({ imagePickerModal: true })}>
                  <Image source={{ uri: this.state.profileImage.uri }} style={styles.profileImgstyle} />
                </TouchableOpacity>
              </View>
            }

            <TextInputField label='Name'
              style={styles.textStyle}
              value={this.state.name}
              onChangeText={(val) => { this.setState({ name: val }) }}
              returnKeyType={'next'}
              onSubmitEditing={(event) => this.Email.focus()}
            />
            <TextInputField label='Email'
              value={this.state.email}
              Ref={(r) => { this.Email = r; }}
              returnKeyType={'next'}
              onChangeText={(email) => { this.setState({ email }) }}
              onSubmitEditing={(event) => this.phone.focus()}
            />
            <Text style={styles.labelTextStyle}>Mobile Number</Text>
            <PhoneInput
              ref={ref => {
                this.phone = ref;
              }}
              value={this.state.mobileNo}
              style={{ borderBottomWidth: 1, paddingVertical: Matrics.ScaleValue(5), borderColor: 'rgba(0, 0, 0, .25)' }}
              onChangePhoneNumber={(text) => this.setState({ mobileNo: text })}

            />

            {/* <TextInputField label='Mobile Number'
              keyboardType={'numeric'}
              value={this.state.mobileNo}
              maxLength={12}
              returnKeyType={'next'}
              Ref={(r) => { this.MobileNo = r; }}
              onSubmitEditing={(event) => this.Password.focus()}
              onChangeText={(mobileNo) => { this.onSubmit() }}
            /> */}

          </KeyboardAwareScrollView>
          <Button label={'Save'}
            onPress={() => this.onSubmit()}
            customStyle={{ marginBottom: Matrics.ScaleValue(25) }} />

        </KeyboardAvoidingView>
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
          onPress={() => { this.onSuccess() }}
        />
      </SafeAreaView>
    )
  }
}

const styles = {
  ...ApplicationStyles,
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
  editIconStyle: {
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