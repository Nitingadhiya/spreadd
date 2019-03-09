import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, ImageBackground } from 'react-native'
import { Images, Color, Matrics, Fonts } from '../Config'

export const NotificationView = ({ title, content, date }) => {
  return (
    <View style={styles.containerStyle}>
      <Image source={Images.notification_logo} />
      <View style={{ flex: 1, marginLeft: Matrics.ScaleValue(15) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.titleTextStyle}>{title}</Text>
          <Text style={styles.dateTextStyle}>{date}</Text>
        </View>
        <Text style={styles.contentTextStyle}>{content}</Text>
      </View>

    </View>
  )
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: Color.white,
    padding: Matrics.ScaleValue(15),
    borderRadius: 5,
  },
  titleTextStyle: {
    fontSize: Matrics.ScaleValue(17),
    fontFamily: Fonts.type.Arimo,
  },
  dateTextStyle: {
    fontSize: Matrics.ScaleValue(12),
    fontFamily: Fonts.type.Arimo,
    color: Color.textGray
  },
  contentTextStyle: {
    marginTop: Matrics.ScaleValue(5),
    fontSize: Matrics.ScaleValue(13),
    fontFamily: Fonts.type.Arimo,
    color: Color.textGray
  }
}