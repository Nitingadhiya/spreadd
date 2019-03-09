import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';

import { Color, Images, Matrics, ApplicationStyles } from '../../Config'
import { NotificationView } from '../../Component'

export default class Notifications extends Component {
  state = {
    notifications: [1, 2, 3, 4, 5, 6]
  }
  renderNotifications = ({ item }) => {
    return (
      <NotificationView
        title={'Lorem Ipsum'}
        content={'Lorem Ipsum is a simply dummy text of the printing and typesetting industry'}
        date={'02/01/2018'}
      />
    )
  }

  render() {
    return (
      <View style={[styles.mainContainer, { padding: Matrics.ScaleValue(15) }]}>
        <FlatList
          data={this.state.notifications}
          renderItem={this.renderNotifications}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (<View style={{ height: Matrics.ScaleValue(10) }} />)}
        />
      </View>
    )
  }
}

const styles = {
  ...ApplicationStyles,

}