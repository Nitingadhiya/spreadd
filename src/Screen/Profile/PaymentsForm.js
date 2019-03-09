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

import { addCardDetailsRequest } from '../../Redux/actions'
import Global from '../../Global/Global'


class PaymentsForm extends Component {

  state = {
    cardNo: '',
    datePickerModal: false,
    expDate: '',
    cvv: '',
    selectedYear: '',
    selectedMonth: '01',
    loading: false,
    errorModal: false,
    errorMsg: '',
    successModal: false,
    successMsg: '',
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.response.addCardDetailsSuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == 1) {
        await this.setState({ successModal: true, successMsg: 'Payments details added successfully...' })
        console.log(data.data)
      }
      else {
        this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed && this.state.loading) {
      this.setState({ loading: false, errorModal: true, errorMsg: Global.requestFailedMsg })
    }
  }

  getMonth() {
    let data = []
    let month = [
      { name: 'January', val: '01' },
      { name: 'February', val: '02' },
      { name: 'March', val: '03' },
      { name: 'April', val: '04' },
      { name: 'May', val: '05' },
      { name: 'June', val: '06' },
      { name: 'July', val: '07' },
      { name: 'August', val: '08' },
      { name: 'Septemper', val: '09' },
      { name: 'October', val: '10' },
      { name: 'November', val: '11' },
      { name: 'December', val: '12' },

    ];

    for (let i = 0; i < month.length; i++) {
      data.push(<Picker.Item label={month[i].name} value={month[i].val} key={i} />)
    }
    return data;
  }

  getYear() {
    let data = []
    var d = new Date();
    var cur_year = d.getFullYear();
    if (this.state.selectedYear == '')
      this.setState({ selectedYear: cur_year.toString() })
    for (let i = cur_year; i < cur_year + 50; i++) {
      data.push(<Picker.Item label={i.toString()} value={i.toString()} key={i} />)
    }
    return data;
  }

  onDone() {
    this.setState({ expDate: `${this.state.selectedMonth}/${this.state.selectedYear}`, datePickerModal: false })
  }

  async onSubmit() {
    Keyboard.dismiss();
    await this.setState({ name: this.state.name.trim(), cardNo: this.state.cardNo.trim(), cvv: this.state.cvv.trim() })

    if (this.state.name == '' || this.state.cardNo == '', this.state.cvv == '', this.state.selectedMonth == '' || this.state.selectedYear == '') {
      this.setState({ errorModal: true, errorMsg: 'Please Enter value for all field' })
    }
    else if (this.state.cardNo.length < 12) {
      this.setState({ errorModal: true, errorMsg: 'Please enter valid card number' })
    }
    else if (this.state.cvv.length < 3) {
      this.setState({ errorModal: true, errorMsg: 'Please enter valid cvv' })
    }
    else {
      this.setState({ loading: true })
      this.props.addCardDetailsRequest({ user_id: global.userId, holder_name: this.state.name, card_no: this.state.cardNo, cvc: this.state.cvv, exp_month: this.state.selectedMonth, exp_year: this.state.selectedYear.slice(-2) })
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }} >
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Matrics.keyboardVerticalOffset}
          style={styles.formContainer}>

          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

            <TextInputField label='Card Holder Name'
              style={styles.textStyle}
              value={this.state.name}
              returnKeyType={'next'}
              onSubmitEditing={(event) => this.cardNo.focus()}
              onChangeText={(val) => { this.setState({ name: val }) }}
            />
            <TextInputField label='Card Number'
              style={styles.textStyle}
              value={this.state.cardNo}
              keyboardType={'numeric'}
              Ref={(r) => { this.cardNo = r; }}
              maxLength={16}
              onChangeText={(val) => { this.setState({ cardNo: val }) }}
              //returnKeyType={'done'}
              onSubmitEditing={(event) => this.expDate.focus()}
            />
            <TouchableOpacity onPress={() => this.setState({ datePickerModal: true })}>
              <TextInputField label='Card Expire(mm/yy)'
                editable={false}
                style={styles.textStyle}
                value={this.state.expDate}
                Ref={(r) => { this.expDate = r; }}
                onChangeText={(expDate) => { this.setState({ expDate }) }}
                returnKeyType={'next'}
                onSubmitEditing={(event) => this.cvv.focus()}
              />
            </TouchableOpacity>
            <TextInputField label='CVV'
              style={styles.textStyle}
              value={this.state.cvv}
              keyboardType={'numeric'}
              Ref={(r) => { this.cvv = r; }}
              onChangeText={(val) => { this.setState({ cvv: val }) }}
              //returnKeyType={'done'}
              maxLength={4}
              onSubmitEditing={(event) => this.onSubmit()}
            />


          </KeyboardAwareScrollView>
          <Button label={'Save'}
            onPress={() => this.onSubmit()}
            customStyle={{ marginBottom: Matrics.ScaleValue(25) }} />

        </KeyboardAvoidingView>

        <Modal
          visible={this.state.datePickerModal}
          transparent={true}
          onRequestClose={() => { }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
            <View style={{ height: Matrics.screenHeight * 0.40 }}>
              <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, justifyContent: 'flex-end' }}>
                <View style={{ backgroundColor: Color.white, borderBottomWidth: 1, borderBottomColor: Color.lightGray, flexDirection: 'row', height: 40, justifyContent: 'space-between', alignItems: 'center' }}>


                  <TouchableOpacity onPress={() => this.setState({ datePickerModal: false })}>
                    <Text style={{ fontSize: 18, color: 'black', marginRight: 20 }}> Cancel </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.onDone()}>
                    <Text style={{ fontSize: 18, color: '#4b80ff' }}> Done </Text>
                  </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, backgroundColor: '#ffffff' }}>
                  <Picker
                    style={{ width: Matrics.screenWidth / 2 }}
                    itemStyle={{ textAlign: 'right' }}
                    selectedValue={this.state.selectedMonth}
                    onValueChange={value => this.setState({ selectedMonth: value })}
                  >
                    {this.getMonth()}

                  </Picker>
                  <Picker
                    style={{ width: Matrics.screenWidth / 2 }}
                    selectedValue={this.state.selectedYear}
                    onValueChange={value => this.setState({ selectedYear: value })}
                  >
                    {this.getYear()}
                  </Picker>
                </View>
              </View>
            </View>
          </View>
        </Modal>
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
export default connect(mapStateToProps, { addCardDetailsRequest })(PaymentsForm);