import React, { Component } from 'react';
import { TextInput } from 'react-native'
//import { ApplicationStyles, Images } from '../Config'

export const TextInputView = ({ keyboardType, maxLength, onFocus, placeholder, placeholderTextColor, value, style, onBlur, onChangeText, onSubmitEditing, multiline, returnKeyType, Ref, editable, autoCapitalize }) => {
  return (
    <TextInput
      style={style}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      multiline={multiline}
      maxLength={maxLength}
      keyboardType={keyboardType}
      autoCorrect={false}
      autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      editable={editable}
      ref={Ref}
      onBlur={onBlur}
      onFocus={onFocus}
      underlineColorAndroid='transparent'
    />
  )
}
