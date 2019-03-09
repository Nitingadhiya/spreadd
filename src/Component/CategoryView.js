

import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { Color, Matrics, Fonts, Images } from '../Config'
import ImageLoad from 'react-native-image-placeholder';

export const CategoryView = ({ imageSrc, name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ margin: Matrics.ScaleValue(8), }}>
      <View style={styles.containerStyle}>

        {/* <Image source={imageSrc} style={styles.imgStyle} /> */}
        <ImageLoad
          style={styles.imgStyle}
          placeholderStyle={styles.imgStyle}
          //borderRadius={10}
          source={imageSrc}
          isShowActivity={false}
          placeholderSource={Images.small_image_placeholder}
        />

        <Text style={styles.textStyle}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  containerStyle: {
    backgroundColor: Color.white,
    padding: Matrics.ScaleValue(10),
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Matrics.categoryView,
    height: Matrics.categoryView,
    borderRadius: 5
  },
  imgStyle: {
    height: Matrics.ScaleValue(30),
    width: Matrics.ScaleValue(30),
    resizeMode: 'contain'
  },
  textStyle: {
    fontSize: Matrics.ScaleValue(11),
    fontFamily: Fonts.type.Arimo,
    textAlign: 'center'
  }
}