

import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, ImageBackground } from 'react-native'
import { Color, Matrics, Fonts, Images } from '../Config'
import ImageLoad from 'react-native-image-placeholder';


export const ShopView = ({ imageSrc, name, address, review, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginHorizontal: Matrics.ScaleValue(8) }} >
      <View style={{ flexDirection: 'row', backgroundColor: Color.white }}>
        {/* <Image source={imageSrc} style={styles.imgStyle} /> */}
        <ImageLoad
          style={styles.imgStyle}
          placeholderStyle={styles.imgStyle}
          borderRadius={Matrics.ScaleValue(5)}
          source={imageSrc}
          isShowActivity={false}
          placeholderSource={Images.small_image_placeholder}
        />
        <View style={{ flex: 1, marginVertical: Matrics.ScaleValue(10) }}>
          <Text style={styles.textNameStyle}>{name}</Text>
          <Text style={styles.addrStyle}>{address}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={Images.star_small} style={{ marginRight: 2, tintColor: review >= 1 ? Color.primary : null }} />
              <Image source={Images.star_small} style={{ marginRight: 2, tintColor: review >= 2 ? Color.primary : null }} />
              <Image source={Images.star_small} style={{ marginRight: 2, tintColor: review >= 3 ? Color.primary : null }} />
              <Image source={Images.star_small} style={{ marginRight: 2, tintColor: review >= 4 ? Color.primary : null }} />
              <Image source={Images.star_small} style={{ marginRight: 2, tintColor: review >= 5 ? Color.primary : null }} />
            </View>
            <Text style={styles.textReviewStyle}>({review} Review)</Text>
          </View>
          <View style={styles.directionStyle}>
            <Image source={Images.direction} />
            <View ><Text style={styles.directionTextStyle}>Direction</Text></View>
          </View>
        </View>
        <View style={{ marginRight: Matrics.ScaleValue(10) }}>
          <View>
            <Image source={Images.offer}  >
            </Image>
            <Text style={{ position: 'absolute', alignSelf: 'center', fontSize: 7, fontFamily: Fonts.type.ArimoBold, color: Color.white }}>25%{"\n"}OFF</Text>
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
    borderRadius: 5,
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
  addrStyle: {
    fontSize: Matrics.ScaleValue(11),
    fontFamily: Fonts.type.Arimo,
    color: Color.textGray,
    marginVertical: Matrics.ScaleValue(3),
  },
  directionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Color.primary,
    borderRadius: 2,
    paddingVertical: Matrics.ScaleValue(2),
    paddingHorizontal: Matrics.ScaleValue(5),
    marginTop: Matrics.ScaleValue(5),
  },
  directionTextStyle: {
    marginLeft: Matrics.ScaleValue(5),
    fontSize: Matrics.ScaleValue(10),
    fontFamily: Fonts.type.Arimo,
    color: Color.primaryDark,
  }
}