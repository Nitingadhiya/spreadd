import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, ImageBackground } from 'react-native'
import { Color, Matrics, Fonts, Images } from '../Config'

export const NewShopsView = ({ imageSrc, name, distance, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginHorizontal: Matrics.ScaleValue(8) }} >
      <ImageBackground style={styles.topContainerStyle} resizeMode={'contain'} source={Images.rect_img_placeholder} borderRadius={5}>
        <ImageBackground style={styles.containerStyle} resizeMode={'contain'} source={imageSrc} borderRadius={5}>
          <Image source={require('../Images/shadowRect.png')} style={{ height: '50%', width: '100%', resizeMode: 'stretch' }} />
          <View style={styles.textViewStyle}>
            <Text style={styles.textNameStyle} numberOfLines={1}>{name}</Text>
            <Text style={styles.textDistancetyle}>{distance}km Away</Text>
          </View>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = {
  topContainerStyle: {
    backgroundColor: Color.white,
    width: Matrics.newShopsImage,
    height: Matrics.newShopsImage,
  },
  containerStyle: {
    //backgroundColor: Color.white,
    justifyContent: 'flex-end',
    width: Matrics.newShopsImage,
    height: Matrics.newShopsImage
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
    fontSize: Matrics.ScaleValue(14),
    fontFamily: Fonts.type.ArimoBold,
    color: Color.white
  },
  textDistancetyle: {
    fontSize: Matrics.ScaleValue(11),
    fontFamily: Fonts.type.Arimo,
    color: Color.white
  }
}