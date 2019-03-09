import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  Picker,
  Modal,
  FlatList
} from 'react-native';
import { connect } from 'react-redux'

import { Color, Images, Matrics, ApplicationStyles, Fonts } from '../../Config'
import { Button, TextInputField, ActionModal, LoadWheel, ConfirmModal } from '../../Component'
import { getCardDetailsRequest, deleteCardDetailsRequest } from '../../Redux/actions'
import Global from '../../Global/Global'

class PaymentsDetails extends Component {

  state = {
    paymentsDetails: [],
    loading: true,
    errorModal: false,
    errorMsg: '',
    successModal: false,
    successMsg: '',
    confirmModal: false,
    cust_id: '',
    card_id: ''
  }

  callGetCardDetails() {
    this.setState({ loading: true })
    this.props.getCardDetailsRequest({ user_id: global.userId })
  }

  componentDidMount() {
    this.callGetCardDetails()
  }

  async componentWillReceiveProps(nextProps) {

    if (nextProps.response.getCardDetailSuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == 1) {
        await this.setState({ paymentsDetails: data.data.card_details })
        console.log(data.data)
      }
      else {
        if (data.message == 'No records found')
          this.props.onChange(true)
        else
          this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.deleteCardDetailSuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == 1) {
        this.callGetCardDetails()
      }
      else {
        this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed && this.state.loading) {
      this.setState({ loading: false, errorModal: true, errorMsg: Global.requestFailedMsg })

    }
  }

  async callDeletePaymentDetails() {
    await this.setState({ confirmModal: false, loading: true })
    this.props.deleteCardDetailsRequest({ user_id: global.userId, customer_id: this.state.cust_id, card_id: this.state.card_id })
  }

  renderPaymentsDetails = ({ item }) => {
    return (
      <View style={styles.detailsViewStyle}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 8 }}>
            <Text style={styles.titleTextStyle} >Card Number</Text>
            <Text style={styles.contentTextStyle}>xxxx - xxxx - xxxx - {item.lastdigits}</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.titleTextStyle}>Exp.</Text>
            <Text style={styles.contentTextStyle}>{item.expiry_month}/{item.expiry_year}</Text>
          </View>
        </View>
        <View style={{ height: Matrics.ScaleValue(10) }} />
        <Text style={styles.titleTextStyle}>Card Holder Name</Text>
        <Text style={styles.contentTextStyle}>David Vane</Text>
        <View style={{ height: Matrics.ScaleValue(10) }} />
        <Text style={[styles.contentTextStyle, { color: Color.primary }]} onPress={() => { this.setState({ confirmModal: true, cust_id: item.stripe_customer_id, card_id: item.stripe_card_token }) }} >DELETE</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.mainContainer, { padding: Matrics.ScaleValue(20) }]} >
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.paymentsDetails}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderPaymentsDetails}
            ItemSeparatorComponent={() => (<View style={{ height: Matrics.ScaleValue(10) }} />)}
          />
        </View>

        {this.state.paymentsDetails.length != 0 ? <Button label={'Add New'}
          onPress={() => { this.props.onChange(true) }}
          customStyle={{ margin: Matrics.ScaleValue(15) }} /> : null}

        <LoadWheel visible={this.state.loading} />
        <ActionModal visible={this.state.errorModal}
          message={this.state.errorMsg}
          onPress={() => { this.setState({ errorModal: false }) }}
        />
        <ActionModal visible={this.state.successModal}
          imageSrc={Images.success}
          message={this.state.successMsg}
          onPress={async () => { await this.setState({ successModal: false }); }}
        />
        <ConfirmModal visible={this.state.confirmModal}
          message={'Are you sure you want to delete this payment details?'}
          onConfirmPress={() => { this.callDeletePaymentDetails() }}
          onCancelPress={() => { this.setState({ confirmModal: false }) }}
        />

      </View>
    )
  }
}

const styles = {
  ...ApplicationStyles,
  detailsViewStyle: {
    backgroundColor: Color.white,
    padding: Matrics.ScaleValue(10),
    borderRadius: 5
  },
  titleTextStyle: {
    color: Color.textGray,
    fontSize: Matrics.ScaleValue(13),
    marginVertical: Matrics.ScaleValue(3),
    fontFamily: Fonts.type.Arimo
  },
  contentTextStyle: {
    fontSize: Matrics.ScaleValue(15),
    fontFamily: Fonts.type.Arimo,
    color: Color.contentText,
  }
}


const mapStateToProps = (state) => {
  return {
    response: state.profile,
  };
}
export default connect(mapStateToProps, { getCardDetailsRequest, deleteCardDetailsRequest })(PaymentsDetails);