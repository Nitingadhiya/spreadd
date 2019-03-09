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

export default class SelectQuantity extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Fruit Smoothie',
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.headerStyle,
    headerTintColor: Color.white,
    headerLeft:
      <TouchableOpacity onPress={() => { navigation.goBack() }} >
        <Image source={Images.close} style={styles.headerLeftIconStyle} />
      </TouchableOpacity>,
    headerRight:
      <View />,
  })

  state = {
    quantity: ['Full', 'Half'],
    selectedVal: 'Full'
  }

  renderQuantity = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { this.setState({ selectedVal: item }) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Matrics.ScaleValue(15), marginVertical: Matrics.ScaleValue(5) }}>

          <Image source={this.state.selectedVal == item ? Images.selected_radio_btn : Images.radio_btn} style={{ margin: Matrics.ScaleValue(5) }} />

          <Text style={styles.fontStyle}>{item}</Text>

        </View>
      </TouchableOpacity >
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleTextStyle}>Select Quantity</Text>
          <FlatList
            data={this.state.quantity}
            renderItem={this.renderQuantity}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.bottomViewStyle}>
          <Text style={styles.TotalTextStyle}>Total: <Text style={{ color: Color.primary }}>$10.99</Text></Text>
          <ButtonSmall label={'ADD'} onPress={() => { this.props.navigation.navigate('Cart') }} />
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
  titleTextStyle:
  {
    fontFamily: Fonts.type.Arimo,
    fontSize: Matrics.ScaleValue(18),
    color: Color.primary,
    paddingTop: Matrics.ScaleValue(25),
    paddingLeft: Matrics.ScaleValue(20),
    paddingBottom: Matrics.ScaleValue(10),
  }
}