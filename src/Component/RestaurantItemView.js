

import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, ImageBackground } from 'react-native'
import { Color, Matrics, Fonts, Images } from '../Config'



export const RestaurantItemView = ({ imageSrc, name, address, price, review, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginHorizontal: Matrics.ScaleValue(15) }} >
      <View style={{ flexDirection: 'row', backgroundColor: Color.white }}>
        <Image source={imageSrc} style={styles.imgStyle} />
        <View style={{ flex: 1, marginVertical: Matrics.ScaleValue(10), marginRight: Matrics.ScaleValue(5) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textNameStyle}>{name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Image source={Images.star_small} style={{ marginRight: 2, tintColor: review >= 1 ? Color.primary : null }} />
              <Image source={Images.star_small} style={{ marginRight: 2, tintColor: review >= 2 ? Color.primary : null }} />
              <Image source={Images.star_small} style={{ marginRight: 2, tintColor: review >= 3 ? Color.primary : null }} />
              <Image source={Images.star_small} style={{ marginRight: 2, tintColor: review >= 4 ? Color.primary : null }} />
              <Image source={Images.star_small} style={{ marginRight: 2, tintColor: review >= 5 ? Color.primary : null }} />
            </View>
          </View>
          <Text style={styles.contentStyle}>{address}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.priceStyle}>{price}</Text>
              <Text style={styles.offerPriceStyle}>{price}</Text>
            </View>
            <View style={styles.addView}>
              <Text style={styles.addTextStyle}>ADD</Text>
            </View>
          </View>

        </View>

      </View>
    </TouchableOpacity>
  )
}

const styles = {
  containerStyle: {
    backgroundColor: Color.white,
    justifyContent: 'flex-end',
    width: Matrics.newShopsImage,
    height: Matrics.newShopsImage,
  },
  imgStyle: {
    height: Matrics.foodImage,
    width: Matrics.foodImage,
    resizeMode: 'contain',
    margin: Matrics.ScaleValue(10),
    borderRadius: 5
  },
  textViewStyle: {
    padding: Matrics.ScaleValue(10),
    position: 'absolute',
    bottom: 0
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textNameStyle: {
    fontSize: Matrics.ScaleValue(14),
    fontFamily: Fonts.type.ArimoBold,
  },
  textReviewStyle: {
    fontSize: Matrics.ScaleValue(10),
    fontFamily: Fonts.type.Arimo,
    color: Color.textGray
  },
  contentStyle: {
    fontSize: Matrics.ScaleValue(11),
    fontFamily: Fonts.type.Arimo,
    color: Color.textGray,
    marginVertical: Matrics.ScaleValue(5),
  },
  priceStyle: {
    fontSize: Matrics.ScaleValue(13),
    fontFamily: Fonts.type.Arimo,
    color: Color.textGray,
    marginRight: Matrics.ScaleValue(10),
    textDecorationLine: 'line-through'
  },
  offerPriceStyle: {
    fontSize: Matrics.ScaleValue(13),
    fontFamily: Fonts.type.Arimo,
    color: Color.primary,
  },
  addView: {
    borderColor: Color.primary,
    borderWidth: 1,
    borderRadius: Matrics.ScaleValue(4),
    paddingHorizontal: Matrics.ScaleValue(15),
    paddingVertical: Matrics.ScaleValue(5),
  },
  addTextStyle: {
    fontSize: Matrics.ScaleValue(10),
    fontFamily: Fonts.type.Arimo,
    color: Color.primary,
  }
}