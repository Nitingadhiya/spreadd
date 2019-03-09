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
import { ButtonSmall, ActionModal } from '../../Component'

export default class SelectAddress extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Select Address',
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.headerStyle,
    headerTintColor: Color.white,
    headerLeft:
      <TouchableOpacity onPress={() => { navigation.goBack() }} >
        <Image source={Images.close} style={styles.headerLeftIconStyle} />
      </TouchableOpacity>,
    headerRight:
      <TouchableOpacity onPress={() => { navigation.goBack() }} >
        <Image source={Images.plus_white} style={styles.headerLeftIconStyle} />
      </TouchableOpacity>,
  })

  state = {
    address: [1, 2],
    selectedVal: 1
  }

  renderAddress = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { this.setState({ selectedVal: item }) }}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>

          <Image source={this.state.selectedVal == item ? Images.selected_radio_btn : Images.radio_btn} style={{ margin: Matrics.ScaleValue(5) }} />

          <View style={styles.detailsViewStyle}>
            <View style={{ marginTop: Matrics.ScaleValue(10), marginHorizontal: Matrics.ScaleValue(10) }}>
              <Text style={styles.contentTextStyle}>C 203, Capital Complex, 1st Street New Bern, Auckland, New Aeal, 10001</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.contentTextStyle, { color: Color.primary, padding: Matrics.ScaleValue(10) }]}>EDIT</Text>
              <Text style={[styles.contentTextStyle, { color: Color.primary, padding: Matrics.ScaleValue(10) }]}>DELETE</Text>
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
          <ButtonSmall label={'Make Payment'} onPress={() => { this.props.navigation.navigate('SelectPayment') }} />
        </View>
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
    borderRadius: 5,
    flex: 1,
    marginLeft: Matrics.ScaleValue(10),
  },
  contentTextStyle: {
    fontSize: Matrics.ScaleValue(13),
    fontFamily: Fonts.type.Arimo,
    color: Color.contentText,
    marginVertical: Matrics.ScaleValue(3),
  }
}