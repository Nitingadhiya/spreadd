import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';

import { Color, Images, Matrics, ApplicationStyles } from '../../Config'
import { TextInputView, CategoryView, MainOfferShopView, NewShopsView, ShopView, ActionModal } from '../../Component'
import Global from '../../Global/Global'
//import { FlatList } from 'react-native-gesture-handler';

export default class NearBy extends Component {
  state = {
    search: '',
    // category: [1, 2, 3, 4, 5],
    newShops: [1, 2, 3, 4, 5],
    allShops: [1, 2, 3, 4, 5]
  }

  onSearch(search) {

  }

  // renderCategory = ({ item }) => {
  //   return (
  //     <CategoryView
  //       name={item}
  //       imageSrc={require('../../Images/cat_image.png')}
  //       onPress={() => { this.props.navigation.navigate('CategoryDetails') }}
  //     />
  //   )
  // }

  renderNewShops = ({ item }) => {
    return (
      <NewShopsView
        imageSrc={require('../../Images/img2.png')}
        name={item}
        distance={item}
        onPress={() => { this.props.navigation.navigate('RestaurantDetails') }}
      />
    )
  }

  renderAllShops = ({ item }) => {
    return (
      <ShopView
        imageSrc={require('../../Images/img2.png')}
        name={item}
        address={item}
        review={4}
        onPress={() => { }}
      />
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchView}>
            <Image source={Images.search} style={styles.iconStyle} />
            <TextInputView style={{ flex: 1 }}
              value={this.state.search}
              placeholder={'Search'}
              onChangeText={(search) => { this.onSearch(search); this.setState({ search }) }}
              //onFocus={()=>this.setState({searchView: true})}
              //onSubmitEditing={(event) => {this.setState({searchView:false, search:''})}}
              style={styles.searchInput}
            />
            {/* {this.state.search == '' ? null : <TouchableOpacity onPress={() => { this.onSearchCancelPress() }}><Image source={Images.close} style={styles.iconStyle} /></TouchableOpacity>} */}
          </View>
        </View>
        <View style={{ height: Matrics.ScaleValue(15) }} />
        {/* <View style={{ alignItems: 'center' }}>
          <FlatList
            data={this.state.category}
            style={{ margin: Matrics.ScaleValue(7) }}
            renderItem={this.renderCategory}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View> */}

        <ScrollView showsVerticalScrollIndicator={false}>

          <MainOfferShopView
            imageSrc={require('../../Images/img1.png')}
            title={'The Light Shop'}
            offer={'20% OFF'}
            onPress={() => { }}
          />

          <Text style={styles.titleStyle}>New Shops</Text>
          <View>
            <FlatList
              data={this.state.newShops}
              style={{ margin: Matrics.ScaleValue(7) }}
              renderItem={this.renderNewShops}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={styles.titleStyle}>All Shops</Text>
          <FlatList
            data={this.state.newShops}
            style={{ margin: Matrics.ScaleValue(7) }}
            renderItem={this.renderAllShops}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (<View style={{ height: Matrics.ScaleValue(10) }} />)}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  ...ApplicationStyles,
}