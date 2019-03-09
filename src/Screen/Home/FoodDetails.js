import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView
} from 'react-native';

import { Color, Images, Matrics, ApplicationStyles, Fonts } from '../../Config'
import { ButtonSmall, ActionModal } from '../../Component'

export default class FoodDetails extends Component {

  state = {
    rating: 0,
  }

  render() {
    let review = 4

    return (
      <View style={styles.mainContainer}>
        <ImageBackground style={styles.imgStyle} source={require('../../Images/img3.png')}>
          <Image source={Images.shadow_top} style={{ position: 'absolute', top: 0, height: '50%', width: '100%', resizeMode: 'cover' }} />
          <Image source={Images.shadow_bottom} style={{ position: 'absolute', bottom: 0, height: '50%', width: '100%', resizeMode: 'cover' }} />
          <TouchableOpacity style={[styles.navBarMargin, { alignSelf: 'flex-start' }]} onPress={() => { this.props.navigation.goBack() }}>
            <Image source={Images.back} style={styles.headerLeftIconStyle} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: Matrics.ScaleValue(15) }}>
            <View>
              <Text style={styles.textNameStyle} numberOfLines={1}>Lecore Hotel</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Matrics.ScaleValue(8) }}>
                <Text style={styles.priceStyle}>$10.99</Text>
                <Text style={styles.offerPriceStyle}>$8.99</Text>
              </View>
            </View>

            <View>
              <TouchableOpacity onPress={() => this.setState({ reviewModal: true })}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={Images.star} style={{ marginRight: 2, tintColor: review >= 1 ? Color.starColor : Color.inActiveStarColor }} />
                  <Image source={Images.star} style={{ marginRight: 2, tintColor: review >= 2 ? Color.starColor : Color.inActiveStarColor }} />
                  <Image source={Images.star} style={{ marginRight: 2, tintColor: review >= 3 ? Color.starColor : Color.inActiveStarColor }} />
                  <Image source={Images.star} style={{ marginRight: 2, tintColor: review >= 4 ? Color.starColor : Color.inActiveStarColor }} />
                  <Image source={Images.star} style={{ marginRight: 2, tintColor: review >= 5 ? Color.starColor : Color.inActiveStarColor }} />
                </View>
              </TouchableOpacity>
              <Text style={styles.textReviewStyle}>(20 Review)</Text>
              <View style={styles.custStyle}>

                <Text style={styles.customizeTextStyle}>CUSTOMIZE</Text>
              </View>

            </View>
          </View>
        </ImageBackground>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.descTextStyle}>Lorem Ipsum is a simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever.</Text>
          </View>
          <View style={styles.bottomViewStyle}>
            <Text style={styles.TotalTextStyle}>Total: <Text style={{ color: Color.primary }}>$10.99</Text></Text>
            <ButtonSmall label={'ADD'} onPress={() => { this.props.navigation.navigate('SelectQuantity') }} />
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = {
  ...ApplicationStyles,
  imgStyle: {
    width: '100%',
    height: Matrics.screenWidth * 65 / 100,
    justifyContent: 'space-between'
  },
  textNameStyle: {
    fontSize: Matrics.ScaleValue(17),
    fontFamily: Fonts.type.ArimoBold,
    color: Color.white
  },
  textReviewStyle: {
    fontSize: Matrics.ScaleValue(10),
    fontFamily: Fonts.type.Arimo,
    color: Color.white,
    marginVertical: Matrics.ScaleValue(4),
  },
  custStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: Matrics.ScaleValue(2),
    //paddingHorizontal: Matrics.ScaleValue(5),
    marginTop: Matrics.ScaleValue(5),
  },
  customizeTextStyle: {
    //marginLeft: Matrics.ScaleValue(5),
    fontSize: Matrics.ScaleValue(8),
    fontFamily: Fonts.type.Arimo,
    color: Color.white,
  },
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
  priceStyle: {
    fontSize: Matrics.ScaleValue(16.5),
    fontFamily: Fonts.type.Arimo,
    color: Color.white,
    marginRight: Matrics.ScaleValue(10),
    textDecorationLine: 'line-through'
  },
  offerPriceStyle: {
    fontSize: Matrics.ScaleValue(16.5),
    fontFamily: Fonts.type.Arimo,
    color: Color.primary,
  },
  descTextStyle: {
    fontSize: Matrics.ScaleValue(15.5),
    fontFamily: Fonts.type.Arimo,
    color: Color.textGray,
    padding: Matrics.ScaleValue(15),
    backgroundColor: Color.white
  }
}