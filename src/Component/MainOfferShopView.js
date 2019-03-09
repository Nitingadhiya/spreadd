

import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, ImageBackground } from 'react-native'
import { Color, Matrics, Fonts, Images } from '../Config'

export const MainOfferShopView = ({ imageSrc, title, subTitle, offer, offerTextColor, offerTextBgColor, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress} style={{ marginHorizontal: Matrics.ScaleValue(15), padding: Matrics.ScaleValue(5), borderRadius: 6, backgroundColor: 'white' }} >
      <ImageBackground style={styles.topContainerStyle} resizeMode={'cover'} source={Images.img_placeholder} borderRadius={5}>
        <ImageBackground style={styles.containerStyle} source={imageSrc} borderRadius={5} resizeMode="cover">
          <Image source={require('../Images/shadowImage.png')} style={{ height: '35%', width: '100%', resizeMode: 'cover', borderRadius: 5 }} />

          <View style={styles.textViewStyle}>
            <Text style={styles.textNameStyle} numberOfLines={1}>{title}</Text>
            <Text style={styles.textContentStyle}>
              {subTitle}
              {/* Special {offer}% off on all products this new year */}
            </Text>
          </View>
          <View style={{ top: 0, position: 'absolute', alignSelf: 'flex-end' }}>
            {/* <View>
              <Image source={Images.offer_shadow} style={{ tintColor: offerTextBgColor }}  >
              </Image>
              <Text style={{ position: 'absolute', right: 8, marginTop: 5, alignSelf: 'center', fontSize: Matrics.ScaleValue(12), fontFamily: Fonts.type.ArimoBold, color: offerTextColor }}>{offer}</Text>
            </View> */}
            <View>
              <Image source={Images.offer_shadow} style={{ tintColor: offerTextBgColor }}  >
              </Image>
              <Text style={{ position: 'absolute', alignSelf: 'center', marginTop: 5, alignSelf: 'center', fontSize: Matrics.ScaleValue(12), fontFamily: Fonts.type.ArimoBold, color: offerTextColor }}>{offer}</Text>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = {
  topContainerStyle: {
    backgroundColor: Color.white,
    width: '100%',
    height: Matrics.offerViewHeight,
  },
  containerStyle: {
    justifyContent: 'flex-end',
    width: '100%',
    height: Matrics.offerViewHeight,
  },
  imgStyle: {
    height: Matrics.ScaleValue(30),
    width: Matrics.ScaleValue(30),
    resizeMode: 'contain'
  },
  textViewStyle: {
    padding: Matrics.ScaleValue(10),
    position: 'absolute',
    bottom: 0
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textNameStyle: {
    fontSize: Matrics.ScaleValue(17),
    fontFamily: Fonts.type.ArimoBold,
    color: Color.white,
    marginBottom: Matrics.ScaleValue(5),
  },
  textContentStyle: {
    fontSize: Matrics.ScaleValue(12),
    fontFamily: Fonts.type.Arimo,
    color: Color.white
  }
}