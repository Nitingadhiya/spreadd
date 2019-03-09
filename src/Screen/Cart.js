import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Color, Images, Fonts, Matrics, ApplicationStyles } from '../Config'
import { ButtonSmall, TextInputView, CartItemView } from '../Component'

export default class Cart extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'My Cart',
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.headerStyle,
    headerTintColor: Color.white,
    headerLeft:
      <TouchableOpacity onPress={() => navigation.goBack()} >
        <Image source={Images.back} style={styles.headerLeftIconStyle} />
      </TouchableOpacity>,
    headerRight:
      <View />,
  })

  state = {
    cartItems: [{ name: 'zbc', quantity: 1 },
    { name: 'af', quantity: 3 },
    { name: 'fdsf', quantity: 4 }],
    note: '',
    code: '',
  }
  // onIncrease() {

  // }
  // onDecrease() {

  // }
  async handleQuantity(action, ind) {

    //const { cart, subTotal } = this.state;

    //let myTotal = subTotal;

    let myCart = this.state.cartItems.map((item, index) => {
      if (index == ind) {
        let { quantity, price } = item;
        quantity = action === 'up' ? quantity + 1 : (action === 'down' && quantity > 2 ? quantity - 1 : 1);
        item = { ...item, quantity };
        return item;
      } else {
        return item;
      }
    });

    await this.setState({
      cartItems: myCart
    });

  }

  renderCartItems = ({ item, index }) => {
    return (
      <CartItemView
        imageSrc={require('../Images/img2.png')}
        name={item.name}
        address={item.name}
        review={4}
        quantity={item.quantity}
        onIncrease={() => { this.handleQuantity('up', index) }}
        onDecrease={() => { this.handleQuantity('down', index) }}
        onPress={() => { }}
      />
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <Text style={styles.titleStyle}>Items</Text>
          <View>
            <FlatList
              data={this.state.cartItems}
              renderItem={this.renderCartItems}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (<View style={{ height: Matrics.ScaleValue(10) }} />)}
            />
          </View>
          <Text style={styles.titleStyle}>Other</Text>
          <View style={styles.textContainer}>
            <TextInputView
              value={this.state.note}
              placeholder={'Do you have any special note for Driver'}
              placeholderTextColor={Color.textGray}
              onChangeText={(value) => this.setState({ note: value })}
              multiline={true}
              style={{ height: 70 }}
            />
          </View>

          <View style={styles.textContainer}>
            <TextInputView
              value={this.state.code}
              placeholder={'Enter Voucher Code'}
              placeholderTextColor={Color.textGray}
              onChangeText={(value) => this.setState({ code: value })}
            />
          </View>
        </KeyboardAwareScrollView>

        <View style={styles.bottomViewStyle}>
          <Text style={styles.TotalTextStyle}>Total: <Text style={{ color: Color.primary }}>$10.99</Text></Text>
          <ButtonSmall label={'Select Address'} onPress={() => { this.props.navigation.navigate('SelectAddress') }} />
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
  textContainer: {
    backgroundColor: Color.white,
    borderRadius: 8,
    marginHorizontal: Matrics.ScaleValue(15),
    padding: Matrics.ScaleValue(15),
    marginBottom: Matrics.ScaleValue(10)
  },
  TotalTextStyle: {
    fontFamily: Fonts.type.Arimo,
    fontSize: Matrics.ScaleValue(17)
  }
}