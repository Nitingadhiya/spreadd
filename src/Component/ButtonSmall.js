import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native'
import { Color, Matrics, Fonts } from '../Config'

export const ButtonSmall = ({ label, onPress, customStyle, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonStyle, customStyle]}>
        <Text style={styles.buttonTextStyle}>{label}</Text>
        {children}
      </View>
    </TouchableOpacity>
  )
}
const styles = {
  buttonStyle: {
    backgroundColor: Color.primaryDark,
    paddingVertical: Matrics.ScaleValue(8),
    paddingHorizontal: Matrics.ScaleValue(15),
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonTextStyle: {
    color: Color.white,
    fontFamily: Fonts.type.Arimo,
    fontSize: Matrics.ScaleValue(13.5)
  }
}