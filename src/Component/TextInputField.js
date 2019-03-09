import React, { Component } from 'react';
import { Fonts, Matrics } from '../Config'
import { TextField } from 'react-native-material-textfield';
import { Color } from '../Config';

export const TextInputField = ({ label, prefix, error, labelFontSize, fontSize, inputContainerPadding, labelHeight, labelPadding, renderAccessory, secureTextEntry, maxLength, containerStyle, keyboardType, placeholder, placeholderTextColor, value, style, onBlur, onChangeText, onSubmitEditing, multiline, returnKeyType, Ref, editable, autoCapitalize }) => {
  return (
    <TextField
      labelHeight={labelHeight}
      labelPadding={labelPadding}
      inputContainerPadding={inputContainerPadding}
      label={label}
      prefix={prefix}
      secureTextEntry={secureTextEntry}
      fontSize={fontSize ? fontSize : Matrics.ScaleValue(16)}
      labelFontSize={labelFontSize ? labelFontSize : Matrics.ScaleValue(15)}
      labelTextStyle={{ fontFamily: Fonts.type.Arimo }}
      renderAccessory={renderAccessory}
      tintColor={Color.primary}
      style={style}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      maxLength={maxLength}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
      autoCorrect={false}
      autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      editable={editable}
      ref={Ref}
      onBlur={onBlur}
      error={error}
      errorColor={'red'}
      underlineColorAndroid='transparent'

    />
  )
}
