import React, { Component } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native'
import { ApplicationStyles, Images, Fonts, Color, Matrics } from '../Config'
import { Button } from '../Component'

const ConfirmModal = ({ visible, message, onConfirmPress, onCancelPress, imageSrc, title }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => { }}
    >
      <View style={styles.modalViewContainer}>
        <View style={styles.viewContainer}>

          {imageSrc ? <Image source={imageSrc} style={styles.imgStyle} /> : null}
          {title ? <Text style={styles.titleTextStyle}>{title}</Text> : null}
          <Text style={styles.msgStyle}> {message} </Text>

          <View style={{ flexDirection: 'row', margin: Matrics.ScaleValue(15) }}>
            <View style={{ flex: 1 }}><Button label='Cancel' customStyle={{ padding: Matrics.ScaleValue(8) }} onPress={onCancelPress} /></View>
            <View style={{ width: Matrics.ScaleValue(15) }} />
            <View style={{ flex: 1 }}><Button label='OK' customStyle={{ padding: Matrics.ScaleValue(8) }} onPress={onConfirmPress} /></View>

          </View>

        </View>
      </View>
    </Modal>
  )
}
const styles = {
  ...ApplicationStyles,
  msgStyle: {
    fontSize: Matrics.ScaleValue(15),
    fontFamily: Fonts.type.Arimo,
    color: Color.textGray,
    textAlign: 'center',
    marginVertical: Matrics.ScaleValue(15),
  },
  btnStyle: {
    //borderTopWidth: 1,
    borderColor: Color.lightGray,
    paddingVertical: Matrics.ScaleValue(15),
    alignItems: 'center',
  },
  imgStyle: {
    alignSelf: 'center',
    marginBottom: Matrics.ScaleValue(20),
    marginTop: Matrics.ScaleValue(10)
  },
  btnTextStyle: {
    fontSize: Matrics.ScaleValue(18),
    color: Color.blue,
    fontFamily: Fonts.type.Arimo,
    fontWeight: 'bold'
  },
  titleTextStyle: {
    fontSize: Matrics.ScaleValue(22),
    fontFamily: Fonts.type.Arimo,
    //color: Color.textGray,
    textAlign: 'center'
  }
}

export { ConfirmModal }

