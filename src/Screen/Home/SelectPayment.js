import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList
} from 'react-native';

import { Color, Images, Matrics, ApplicationStyles, Fonts } from '../../Config'
import { ButtonSmall, TextInputField, ActionModal } from '../../Component'


export default class SelectPayment extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Payments',
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.headerStyle,
    headerTintColor: Color.white,
    headerLeft:
      <TouchableOpacity onPress={() => { navigation.goBack() }} >
        <Image source={Images.close} style={styles.headerLeftIconStyle} />
      </TouchableOpacity>,
    headerRight:
      <TouchableOpacity onPress={() => { navigation.navigate('Payments') }} >
        <Image source={Images.plus_white} style={styles.headerLeftIconStyle} />
      </TouchableOpacity>,
  })

  state = {
    address: [1, 2],
    selectedVal: 1,
    actionModal: false,
  }

  renderAddress = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { this.setState({ selectedVal: item }) }}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          <Image source={this.state.selectedVal == item ? Images.selected_radio_btn : Images.radio_btn} style={{ margin: Matrics.ScaleValue(5) }} />
          <View style={styles.detailsViewStyle}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 8 }}>
                <Text style={styles.titleTextStyle} >Card Number</Text>
                <Text style={styles.contentTextStyle}>1224 - 7898 - 9898 - 6554</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.titleTextStyle}>Exp.</Text>
                <Text style={styles.contentTextStyle}>12/19</Text>
              </View>
            </View>
            <View style={{ height: Matrics.ScaleValue(10) }} />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 7 }}>
                <Text style={styles.titleTextStyle}>Card Holder Name</Text>
                <Text style={styles.contentTextStyle}>David Vane</Text>
              </View>
              <View style={{ flex: 3 }}>
                <TextInputField label='CVV'
                  keyboardType={'numeric'}
                  secureTextEntry={true}
                  labelHeight={10}
                  labelPadding={-5}
                  labelFontSize={Matrics.ScaleValue(13)}
                  fontSize={Matrics.ScaleValue(13)}
                  inputContainerPadding={5}
                  style={styles.contentTextStyle}
                  // value={this.state.mobileNo}
                  maxLength={12}
                  onChangeText={(mobileNo) => { }}
                />
              </View>
            </View>


          </View>
        </View>
      </TouchableOpacity >
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ flex: 1, margin: Matrics.ScaleValue(15) }}>
          <FlatList
            data={this.state.address}
            renderItem={this.renderAddress}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (<View style={{ height: Matrics.ScaleValue(15) }} />)}
          />
        </View>
        <View style={styles.bottomViewStyle}>
          <Text style={styles.TotalTextStyle}>Total: <Text style={{ color: Color.primary }}>$10.99</Text></Text>
          <ButtonSmall label={'Pay Now'} onPress={() => { this.setState({ actionModal: true }) }} />
        </View>
        <ActionModal visible={this.state.actionModal}
          title={'Awesome!'}
          imageSrc={Images.success}
          message={'Your payment has been successfully received'}
          onPress={() => { this.setState({ actionModal: false }, () => { this.props.navigation.navigate('RestaurantDetails') }) }}
        />
      </SafeAreaView>
    )
  }
}

const styles = {
  ...ApplicationStyles,
  bottomViewStyle: {
    backgroundColor: Color.white,
    padding: Matrics.ScaleValue(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  TotalTextStyle: {
    fontFamily: Fonts.type.Arimo,
    fontSize: Matrics.ScaleValue(17)
  },
  detailsViewStyle: {
    backgroundColor: Color.white,
    padding: Matrics.ScaleValue(10),
    marginLeft: Matrics.ScaleValue(10),
    borderRadius: 5,
    flex: 1
  },
  contentTextStyle: {
    fontSize: Matrics.ScaleValue(13),
    fontFamily: Fonts.type.Arimo,
    color: Color.contentText,
    marginVertical: Matrics.ScaleValue(3),
  },
  titleTextStyle: {
    color: Color.textGray,
    fontSize: Matrics.ScaleValue(13),
    marginVertical: Matrics.ScaleValue(3),
    fontFamily: Fonts.type.Arimo
  },
}