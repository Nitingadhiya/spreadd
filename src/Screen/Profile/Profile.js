import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ScrollView,
  RefreshControl
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import ImageLoad from 'react-native-image-placeholder'
import { connect } from 'react-redux'

import { Color, Fonts, Images, Matrics, ApplicationStyles } from '../../Config'
import { Button, ActionModal, LoadWheel, ConfirmModal } from '../../Component';
import { getUserDetailsRequest } from '../../Redux/actions'
import { profile_image_url } from '../../Api/api'
import Global from '../../Global/Global'

export const TabView = ({ text, tabVal, activeTab, onPress }) => {
  return (
    <TouchableOpacity style={styles.tabStyle} onPress={onPress}>
      <View style={activeTab == tabVal ? styles.activeTabStyle : styles.inActiveTabStyle}>
        <Text style={styles.tabTextStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export const FieldView = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.fieldViewStyle}>
        <Text style={styles.labelTextStyle}>{label}</Text>
        <Image source={Images.right_icon} />
      </View>
    </TouchableOpacity>
  )
}

class Profile extends Component {
  state = {
    activeTab: 1,
    errorModal: false,
    errorMsg: '',
    successModal: false,
    successMsg: '',
    loading: true,
    //userId: '',
    userInfo: {},
    confirmModal: false,
    refreshing: false
  }

  callGetProfileDetails() {
    if (this.state.refreshing == false)
      this.setState({ loading: true })
    this.props.getUserDetailsRequest({ user_id: global.userId })
  }

  async componentDidMount() {
    // let info = await AsyncStorage.getItem('UserInfo')
    // if (info) {
    //   let userInfo = JSON.parse(info)
    //   await this.setState({ userId: userInfo.users.id })

    // }
    this.callGetProfileDetails()
  }

  async componentWillReceiveProps(nextProps) {

    if (nextProps.response.getProfileDetailsSuccess && (this.state.loading || this.state.refreshing)) {
      const { data } = nextProps.response
      this.setState({ loading: false, refreshing: false })
      if (data.status == '1') {
        await this.setState({ userInfo: data.data.users })
        console.log(data.data)
      }
      else {
        this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed && (this.state.loading || this.state.refreshing)) {
      this.setState({ loading: false, refreshing: false, errorModal: true, errorMsg: Global.requestFailedMsg })
    }
  }

  navigateToScreen(route) {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })]
    });
    this.props.navigation.dispatch(navigateAction);
  }

  onTabPress(val) {
    this.setState({ activeTab: val })
  }

  async onLogoutPress() {
    await this.setState({ confirmModal: false })
    AsyncStorage.clear()
    this.navigateToScreen('Login')
  }

  _onRefresh = async () => {
    await this.setState({ refreshing: true });
    this.callGetProfileDetails()
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <ImageBackground style={styles.backgroundImgStyle} source={require('../../Images/img4.png')}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

              {Object.keys(this.state.userInfo).length == 0 ?
                <Image source={Images.profile_icon_placeholder}
                  style={styles.profileImgStyle} /> :
                <Image source={this.state.userInfo.profile_pic == '' ? Images.profile_icon_placeholder : { uri: `${profile_image_url}${this.state.userInfo.profile_pic}` }}
                  style={styles.profileImgStyle} />
              }
              {/* <ImageLoad
              style={styles.profileImgStyle}
              placeholderStyle={styles.profileImgStyle}
              borderRadius={Matrics.profileImageSmall / 2}
              source={{ uri: `${profile_image_url}${this.state.userInfo.profile_pic}` }}
              isShowActivity={false}
              placeholderSource={Images.profile_icon_placeholder}
            /> */}

              <View style={{ flex: 1 }}>
                <Text style={styles.nameTextStyle}>{this.state.userInfo.first_name} {this.state.userInfo.last_name}</Text>
                <Text style={styles.emailTextStyle}>{this.state.userInfo.email}</Text>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile', { userInfo: this.state.userInfo, refreshData: this.callGetProfileDetails.bind(this) })}><Image source={Images.edit_icon} style={{ margin: Matrics.ScaleValue(25) }} /></TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <TabView text={'Me'} activeTab={this.state.activeTab} tabVal={1} onPress={() => this.onTabPress(1)} />
              <TabView text={'Lucky'} activeTab={this.state.activeTab} tabVal={2} onPress={() => this.onTabPress(2)} />
              <TabView text={'History'} activeTab={this.state.activeTab} tabVal={3} onPress={() => this.onTabPress(3)} />
              <TabView text={'Loyality'} activeTab={this.state.activeTab} tabVal={4} onPress={() => this.onTabPress(4)} />
            </View>
          </ImageBackground>

          <View style={styles.contentContainerStyle}>
            <View style={{ flex: 1 }}>
              <FieldView label={'Payments'} onPress={() => { this.props.navigation.navigate('Payments') }} />
              <FieldView label={'Manage Address'} onPress={() => { this.props.navigation.navigate('ManageAddress') }} />
              <FieldView label={'Change Password'} onPress={() => { this.props.navigation.navigate('ChangePassword') }} />
            </View>
            <Button label={'Logout'} onPress={() => this.setState({ confirmModal: true })} />
          </View>
        </ScrollView>
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
        <ConfirmModal visible={this.state.confirmModal}
          message={'Are you sure you Logout?'}
          onConfirmPress={() => { this.onLogoutPress() }}
          onCancelPress={() => { this.setState({ confirmModal: false }) }}
        />

      </View>
    )
  }
}

const styles = {
  ...ApplicationStyles,
  backgroundImgStyle: {
    width: '100%',
    height: Matrics.screenWidth / 2.50
  },
  tabTextStyle: {
    fontSize: Matrics.ScaleValue(15),
    fontFamily: Fonts.type.Arimo,
    color: Color.white,
    textAlign: 'center'
  },
  activeTabStyle: {
    //flex: 1,
    padding: Matrics.ScaleValue(10),
    borderBottomWidth: 2.5,
    borderColor: Color.white
  },
  tabStyle: {
    flex: 1,
  },
  inActiveTabStyle: {
    flex: 1,
    padding: Matrics.ScaleValue(10),
  },
  profileImgStyle: {
    height: Matrics.profileImageSmall,
    width: Matrics.profileImageSmall,
    borderRadius: Matrics.profileImageSmall / 2,
    marginHorizontal: Matrics.ScaleValue(20),
  },
  nameTextStyle: {
    fontSize: Matrics.ScaleValue(17),
    fontFamily: Fonts.type.ArimoBold,
    color: Color.white
  },
  emailTextStyle: {
    fontSize: Matrics.ScaleValue(15),
    fontFamily: Fonts.type.Arimo,
    color: Color.white,
    marginTop: Matrics.ScaleValue(5),
  },
  contentContainerStyle: {
    flex: 1,
    margin: Matrics.ScaleValue(15),
    padding: Matrics.ScaleValue(20),
    backgroundColor: Color.white,
    borderRadius: Matrics.ScaleValue(10),
  },
  fieldViewStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Color.fieldColor,
    paddingVertical: Matrics.ScaleValue(15),
    marginBottom: Matrics.ScaleValue(10)
  },
  labelTextStyle: {
    ...ApplicationStyles.fontStyle,
    color: Color.textGray,
    flex: 1
  }
}

const mapStateToProps = (state) => {
  return {
    response: state.profile,
  };
}
export default connect(mapStateToProps, { getUserDetailsRequest })(Profile);