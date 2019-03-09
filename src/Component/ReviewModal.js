import React, { Component } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native'
import { ApplicationStyles, Images, Fonts, Color, Matrics } from '../Config'
import { Button, TextInputView } from '../Component'
import StarRating from 'react-native-star-rating';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ReviewModal = ({ visible, name, value, onChangeText, rating, selectedStar, onCancelPress, imgSrc, addr }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => { }}
    >
      <View style={styles.modalViewContainer}>
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          <View style={[styles.viewContainer, { width: '90%', padding: Matrics.ScaleValue(20) }]}>

            <View style={{ alignItems: 'center' }}>
              <Image source={imgSrc} style={styles.imgStyle} />
              <Text style={styles.textNameStyle}>{name}</Text>
              <Text style={styles.addrStyle}>{addr}</Text>
              <View style={{ marginVertical: Matrics.ScaleValue(10) }}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={rating}
                  emptyStar={'star'}
                  fullStarColor={Color.starColor}
                  emptyStarColor={Color.inActiveStarColor}
                  selectedStar={selectedStar}
                  starStyle={{ margin: Matrics.ScaleValue(8) }}
                />
              </View>
              <View style={styles.textContainer}>
                <TextInputView
                  value={value}
                  placeholder={'Please leave your comment here'}
                  placeholderTextColor={Color.textGray}
                  onChangeText={onChangeText}
                  multiline={true}
                  style={{ height: 70 }}
                />
              </View>
            </View>

            <Button label={'Leave Review'} customStyle={{ paddingVertical: Matrics.ScaleValue(15), marginVertical: Matrics.ScaleValue(5) }} />
            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }} onPress={onCancelPress}>
              <Image source={Images.closeBtn} style={{ margin: Matrics.ScaleValue(15) }} />
            </TouchableOpacity>

          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  )
}
const styles = {
  ...ApplicationStyles,
  contentView: {
    padding: Matrics.ScaleValue(25)
  },
  addrStyle: {
    fontSize: Matrics.ScaleValue(15),
    fontFamily: Fonts.type.Arimo,
    color: Color.textGray,
    marginVertical: Matrics.ScaleValue(4),
  },
  btnStyle: {
    borderTopWidth: 1,
    borderColor: Color.lightGray,
    paddingVertical: Matrics.ScaleValue(15),
    alignItems: 'center',
  },
  imgStyle: {
    height: Matrics.itemImage,
    width: Matrics.itemImage,
    resizeMode: 'cover',
    margin: Matrics.ScaleValue(10),
    borderRadius: 5
  },
  btnTextStyle: {
    fontSize: Matrics.ScaleValue(18),
    color: Color.blue,
    fontFamily: Fonts.type.Arimo,
    fontWeight: 'bold'
  },
  textNameStyle: {
    fontSize: Matrics.ScaleValue(16),
    fontFamily: Fonts.type.ArimoBold,
  },
  textContainer: {
    backgroundColor: Color.bgColor,
    borderRadius: 8,
    width: '100%',
    marginHorizontal: Matrics.ScaleValue(15),
    padding: Matrics.ScaleValue(15),
    marginBottom: Matrics.ScaleValue(10)
  }
}

export { ReviewModal }

