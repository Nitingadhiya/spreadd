import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native';
import { Button, IconButton } from '../Component'
import { Color, Images, Matrics, Fonts } from '../Config'

export default class Welcome extends Component {
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ height: '60%' }}>
          <ImageBackground style={styles.topViewStyle} resizeMode='cover' source={Images.bg_img} >
            <Image source={Images.logo} />
            <Text style={styles.logoTextStyle}>Survis</Text>
            <Text style={styles.descTextStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
          </ImageBackground>
        </View>
        <View style={styles.bottonViewStyle}>
          <IconButton label={'Sign In with Facebook'} onPress={() => { }} iconSrc={Images.fb_icon} customStyle={{ backgroundColor: Color.fbBtnColor }} />
          <IconButton label={'Sign In with Email'} customStyle={{ marginTop: Matrics.ScaleValue(12) }} iconSrc={Images.email} onPress={() => { this.props.navigation.navigate('Login') }} />
        </View>

        <View style={styles.textViewStyle}>
          <Text style={styles.textStyle} onPress={() => this.props.navigation.navigate('Signup')}>Don't Have an Account? <Text style={{ color: Color.primary }}>SIGN UP</Text></Text>
        </View>
      </SafeAreaView >
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: Color.bgColor
  },
  topViewStyle: {
    //resizeMode: 'cover',
    // width: '100%',
    // height: '60%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoTextStyle: {
    fontSize: Matrics.ScaleValue(65),
    fontFamily: Fonts.type.Arista,
    color: Color.white
  },
  descTextStyle: {
    fontSize: Matrics.ScaleValue(17),
    color: Color.white,
    fontFamily: Fonts.type.Arimo,
    marginTop: Matrics.ScaleValue(20),
    textAlign: 'center',
    marginHorizontal: Matrics.ScaleValue(25),
  },
  bottonViewStyle: {
    margin: Matrics.ScaleValue(20),
    padding: Matrics.ScaleValue(20),
    borderRadius: Matrics.ScaleValue(10),
    backgroundColor: Color.white
    // shadowOpacity: 0.8,
    // shadowOffset: { height: 5 },
    // elevation: 1,
    //borderWidth: 1
  },
  textStyle: {
    fontFamily: Fonts.type.Arimo,
    fontSize: Matrics.ScaleValue(15),
  },
  textViewStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: Matrics.ScaleValue(25),
  }

}