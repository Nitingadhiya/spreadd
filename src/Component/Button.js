import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native'
import { Color, Matrics, Fonts } from '../Config'

export const Button = ({ label, onPress, customStyle, children }) => {
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
    backgroundColor: Color.primary,
    padding: Matrics.ScaleValue(15),
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonTextStyle: {
    color: Color.white,
    fontFamily: Fonts.type.Arimo,
    fontSize: Matrics.ScaleValue(17)
  }
}