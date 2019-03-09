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
import { getAddressDetailsRequest, deleteAddressDetailsRequest } from '../../Redux/actions'
import Global from '../../Global/Global'

class ManageAddressDetails extends Component {

  state = {
    addressDetails: [],
    loading: true,
    errorModal: false,
    errorMsg: '',
    successModal: false,
    successMsg: '',
    confirmModal: false,
    addr_id: ''
  }

  callGetAddressDetails() {
    this.setState({ loading: true })
    this.props.getAddressDetailsRequest({ user_id: global.userId })
  }

  async callDeleteAddressDetails() {
    await this.setState({ confirmModal: false, loading: true })
    this.props.deleteAddressDetailsRequest({ address_id: this.state.addr_id.toString() })
  }

  componentDidMount() {
    this.props.reset()
    this.callGetAddressDetails()
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.response.getAddressDetailSuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == 1) {
        await this.setState({ addressDetails: data.data.address })
        console.log(data.data)
      }
      else {
        if (data.message.trim() == 'No records found')
          this.props.onChange(true)
        else
          this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.deleteAddressDetailSuccess && this.state.loading) {
      const { data } = nextProps.response
      this.setState({ loading: false })
      if (data.status == 1) {
        this.callGetAddressDetails()
      }
      else {
        this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed && this.state.loading) {
      this.setState({ loading: false, errorModal: true, errorMsg: Global.requestFailedMsg })
    }
  }

  renderPaymentsDetails = ({ item }) => {
    return (
      <View style={styles.detailsViewStyle}>
        <View style={{ marginTop: Matrics.ScaleValue(10), marginHorizontal: Matrics.ScaleValue(10) }}>
          <Text style={styles.contentTextStyle}>{item.house_no} {item.address} {item.area} {item.landmark} </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text onPress={() => this.props.setEditAddr(item)}
            style={[styles.contentTextStyle, { color: Color.primary, padding: Matrics.ScaleValue(10) }]}>EDIT</Text>
          <Text onPress={() => { this.setState({ confirmModal: true, addr_id: item.address_id }) }}
            style={[styles.contentTextStyle, { color: Color.primary, padding: Matrics.ScaleValue(10) }]}>DELETE</Text>
        </View>

      </View>
    )
  }

  render() {
    return (
      <View style={[styles.mainContainer, { padding: Matrics.ScaleValue(20) }]} >
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.addressDetails}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderPaymentsDetails}
            ItemSeparatorComponent={() => (<View style={{ height: Matrics.ScaleValue(10) }} />)}
          />
        </View>

        {this.state.addressDetails.length != 0 ? <Button label={'Add New'}
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
          message={'Are you sure you want to delete this address details?'}
          onConfirmPress={() => { this.callDeleteAddressDetails() }}
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
    borderRadius: 5
  },
  contentTextStyle: {
    fontSize: Matrics.ScaleValue(13),
    fontFamily: Fonts.type.Arimo,
    color: Color.contentText,
  }
}

const mapStateToProps = (state) => {
  return {
    response: state.profile,
  };
}
export default connect(mapStateToProps, { getAddressDetailsRequest, deleteAddressDetailsRequest })(ManageAddressDetails);