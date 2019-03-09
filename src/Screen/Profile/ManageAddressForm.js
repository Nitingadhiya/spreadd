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
import { connect } from 'react-redux'

import { Color, Images, Matrics, ApplicationStyles, Fonts } from '../../Config'
import { Button, TextInputField, ActionModal, LoadWheel } from '../../Component'
import { addAddressDetailsRequest, editAddressDetailsRequest } from '../../Redux/actions'
import Global from '../../Global/Global'

class ManageAddressForm extends Component {

  state = {
    addr: '',
    houseNo: '',
    area: '',
    landmark: '',
    loading: false,
    errorModal: false,
    errorMsg: '',
    successModal: false,
    successMsg: '',
    addr_id: ''
  }

  async onSubmit() {
    Keyboard.dismiss();
    await this.setState({ addr: this.state.addr.trim(), houseNo: this.state.houseNo.trim(), area: this.state.area.trim(), landmark: this.state.landmark.trim() })
    if (this.state.addr == '' || this.state.houseNo == '', this.state.area == '', this.state.landmark == '') {
      this.setState({ errorModal: true, errorMsg: 'Please Enter value for all field' })
    }
    else {
      this.setState({ loading: true })
      if (this.state.addr_id == '')
        this.props.addAddressDetailsRequest({ user_id: global.userId, address: this.state.addr, house_no: this.state.houseNo, landmark: this.state.landmark, area: this.state.area })
      else
        this.props.editAddressDetailsRequest({ user_id: global.userId, address_id: this.state.addr_id, address: this.state.addr, house_no: this.state.houseNo, landmark: this.state.landmark, area: this.state.area })
    }
  }

  componentWillMount() {
    if (Object.keys(this.props.editAddrData).length != 0) {
      const { editAddrData } = this.props
      this.setState({ addr_id: editAddrData.address_id, addr: editAddrData.address, houseNo: editAddrData.house_no, area: editAddrData.area, landmark: editAddrData.landmark })
    }

    if (this.props.editAddrData)
      console.log('true')
    else
      console.log('nodata')
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.response.addAddressDetailSuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == 1) {
        await this.setState({ successModal: true, successMsg: 'Address details added successfully...' })
      }
      else {
        this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    if (nextProps.response.editAddressDetailSuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == 1) {
        await this.setState({ successModal: true, successMsg: 'Edit address details successfully...' })
      }
      else {
        this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed && this.state.loading) {
      this.setState({ loading: false, errorModal: true, errorMsg: Global.requestFailedMsg })
    }
  }

  render() {
    console.log(this.props.editAddrData)
    return (
      <SafeAreaView style={{ flex: 1 }} >
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Matrics.keyboardVerticalOffset}
          style={styles.formContainer}>

          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

            <TextInputField label='Address'
              style={styles.textStyle}
              value={this.state.addr}
              returnKeyType={'next'}
              onSubmitEditing={(event) => this.houseNo.focus()}
              onChangeText={(val) => { this.setState({ addr: val }) }}
            />

            <TextInputField label='House / Flat No'
              style={styles.textStyle}
              value={this.state.houseNo}
              Ref={(r) => { this.houseNo = r; }}
              onChangeText={(val) => { this.setState({ houseNo: val }) }}
              returnKeyType={'next'}
              onSubmitEditing={(event) => this.area.focus()}
            />

            <TextInputField label='Area'
              style={styles.textStyle}
              value={this.state.area}
              Ref={(r) => { this.area = r; }}
              onChangeText={(val) => { this.setState({ area: val }) }}
              returnKeyType={'next'}
              onSubmitEditing={(event) => this.landmark.focus()}
            />

            <TextInputField label='Landmark'
              style={styles.textStyle}
              value={this.state.landmark}
              Ref={(r) => { this.landmark = r; }}
              onChangeText={(val) => { this.setState({ landmark: val }) }}
              returnKeyType={'done'}
              onSubmitEditing={(event) => { }}
            />

          </KeyboardAwareScrollView>
          <Button label={'Save'}
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
          onPress={async () => { await this.setState({ successModal: false }); this.props.onChange(false) }}
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
    response: state.profile,
  };
}
export default connect(mapStateToProps, { addAddressDetailsRequest, editAddressDetailsRequest })(ManageAddressForm);