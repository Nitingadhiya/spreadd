import React, { Component } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native'
import { ApplicationStyles, Images, Fonts, Color, Matrics } from '../Config'
import { Button } from '../Component'

const ActionModal = ({ visible, message, onPress, imageSrc, title }) => {
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

          <Button label={'OK'} customStyle={{ width: '50%', alignSelf: 'center', paddingVertical: Matrics.ScaleValue(12), margin: Matrics.ScaleValue(10) }}
            onPress={onPress} />
          {/* <View style={styles.btnStyle}>
              <Text style={styles.btnTextStyle}>OK</Text>
            </View> */}

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
    color: '#010101',
    textAlign: 'center'
  }
}

export { ActionModal }

