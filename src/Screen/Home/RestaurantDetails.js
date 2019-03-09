import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux'

import { Color, Images, Matrics, ApplicationStyles, Fonts } from '../../Config'
import { RestaurantItemView, ReviewModal, ActionModal, LoadWheel, Loader } from '../../Component'
import { getShopProductsRequest } from '../../Redux/actions'
import { product_image_url } from '../../Api/api'
import Global from '../../Global/Global'

class RestaurantDetails extends Component {

  state = {
    categoryType: ['Breakfast', 'Snacks', 'Lunch', 'Dinner', 'Abcd'],
    errorModal: false,
    errorMsg: '',
    selectedItem: '',
    items: [],
    reviewModal: false,
    rating: 0,
    reviewNote: '',
    loading: true,
    offset: 0,
    loadMore: false
  }

  callGetProduct() {
    this.props.getShopProductsRequest({
      user_id: global.userId,
      merchant_id: this.props.navigation.state.params.merchant_id,
      offset: this.state.offset
    })
  }

  componentDidMount() {
    this.callGetProduct()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response.getShopProductsSuccess && (this.state.loading || this.state.loadMore)) {
      const { data } = nextProps.response
      this.setState({ loading: false, loadMore: false })
      if (data.status == '1') {
        console.log(data.data.product)
        this.setState({ items: [...this.state.items, ...data.data.product] })

      }
      else {
        this.setState({ errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed) {
      if (this.state.loadMore) {
        this.setState({ offset: this.state.offset - 1, loadMore: false })
      }
      this.setState({ loading: false, errorModal: true, errorMsg: Global.requestFailedMsg })
    }
  }

  renderCategory = ({ item }) => {
    return (
      <TouchableOpacity style={[styles.categoryView, { backgroundColor: item == this.state.selectedItem ? Color.primary : null }]} onPress={() => this.setState({ selectedItem: item })}>
        <Text style={[styles.categoryTextStyle, { color: item == this.state.selectedItem ? Color.white : Color.primary }]}>{item}</Text>
      </TouchableOpacity>
    )
  }

  renderItems = ({ item }) => {
    return (
      <RestaurantItemView
        imageSrc={{ uri: `${product_image_url}/${item.product_id}/${item.media[0].image}` }}
        name={item.product_name}
        address={'item'}
        review={item.rate_star}
        price={item.price[0].price}
        onPress={() => { this.props.navigation.navigate('FoodDetails') }}
      />
    )
  }

  onStarRatingPress(rating) {
    this.setState({
      rating: rating
    });
  }

  loadMoreItems() {
    this.setState({ loadMore: true })
    this.setState({
      offset: Number(this.state.offset) + 1,
    }, () => {
      this.callGetProduct();
    });
  }

  render() {
    let review = 4
    return (
      <View style={styles.mainContainer}>
        <ImageBackground style={styles.imgStyle} source={require('../../Images/img3.png')}>
          <Image source={Images.shadow_top} style={{ position: 'absolute', top: 0, height: '50%', width: '100%', resizeMode: 'cover' }} />
          <Image source={Images.shadow_bottom} style={{ position: 'absolute', bottom: 0, height: '50%', width: '100%', resizeMode: 'cover' }} />
          <TouchableOpacity style={[styles.navBarMargin, { alignSelf: 'flex-start' }]} onPress={() => { this.props.navigation.goBack() }}>
            <Image source={Images.back} style={styles.headerLeftIconStyle} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: Matrics.ScaleValue(15) }}>
            <View>
              <Text style={styles.textNameStyle} numberOfLines={1}>Lecore Hotel</Text>
              <Text style={styles.addrStyle}>202 Telok Ayer st, singapore 066879</Text>
              <Text style={styles.textDistancetyle}>2km Away</Text>
            </View>

            <View>
              <TouchableOpacity onPress={() => this.setState({ reviewModal: true })}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={Images.star} style={{ marginRight: 2, tintColor: review >= 1 ? Color.starColor : Color.inActiveStarColor }} />
                  <Image source={Images.star} style={{ marginRight: 2, tintColor: review >= 2 ? Color.starColor : Color.inActiveStarColor }} />
                  <Image source={Images.star} style={{ marginRight: 2, tintColor: review >= 3 ? Color.starColor : Color.inActiveStarColor }} />
                  <Image source={Images.star} style={{ marginRight: 2, tintColor: review >= 4 ? Color.starColor : Color.inActiveStarColor }} />
                  <Image source={Images.star} style={{ marginRight: 2, tintColor: review >= 5 ? Color.starColor : Color.inActiveStarColor }} />
                </View>
              </TouchableOpacity>
              <Text style={styles.textReviewStyle}>(20 Review)</Text>
              <View style={styles.directionStyle}>
                <Image source={Images.direction} style={{ tintColor: Color.white }} />
                <View ><Text style={styles.directionTextStyle}>Direction</Text></View>
              </View>

            </View>
          </View>
        </ImageBackground>
        <View style={{ backgroundColor: Color.white }}>
          <FlatList
            data={this.state.categoryType}
            style={{ margin: Matrics.ScaleValue(10) }}
            renderItem={this.renderCategory}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}

          />
        </View>
        <FlatList
          data={this.state.items}
          ListEmptyComponent={<View><Text style={styles.errorTextStyle}>{this.state.errorMsg}</Text></View>}
          style={{ marginVertical: Matrics.ScaleValue(15) }}
          renderItem={this.renderItems}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (<View style={{ height: Matrics.ScaleValue(10) }} />)}
          onEndReached={() => this.state.items.length > 0 && !this.state.loading && !this.state.loadMore ? this.loadMoreItems() : null}
          onEndReachedThreshold={0.5}
        />
        {
          this.state.loadMore ? <Loader /> : null
        }
        <LoadWheel visible={this.state.loading} />
        {/* <ActionModal visible={this.state.errorModal}
          message={this.state.errorMsg}
          onPress={() => { this.setState({ errorModal: false }) }}
        /> */}
        <ReviewModal visible={this.state.reviewModal}
          name={'Cute Bites'}
          addr={'2012, ajsh jkasskg 255698'}
          imgSrc={require('../../Images/img1.png')}
          rating={this.state.rating}
          onCancelPress={() => { this.setState({ reviewModal: false }) }}
          value={this.state.reviewNote}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
          onChangeText={(value) => this.setState({ reviewNote: value })} />
      </View>
    )
  }
}

const styles = {
  ...ApplicationStyles,
  imgStyle: {
    width: '100%',
    height: Matrics.screenWidth * 65 / 100,
    justifyContent: 'space-between'
  },
  textNameStyle: {
    fontSize: Matrics.ScaleValue(17),
    fontFamily: Fonts.type.ArimoBold,
    color: Color.white
  },
  textDistancetyle: {
    fontSize: Matrics.ScaleValue(12),
    fontFamily: Fonts.type.Arimo,
    color: Color.white
  },
  addrStyle: {
    fontSize: Matrics.ScaleValue(12),
    fontFamily: Fonts.type.Arimo,
    color: Color.white,
    marginVertical: Matrics.ScaleValue(3),
  },
  textReviewStyle: {
    fontSize: Matrics.ScaleValue(10),
    fontFamily: Fonts.type.Arimo,
    color: Color.white,
    marginVertical: Matrics.ScaleValue(4),
  },
  directionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Color.white,
    borderRadius: 2,
    paddingVertical: Matrics.ScaleValue(2),
    paddingHorizontal: Matrics.ScaleValue(5),
    marginTop: Matrics.ScaleValue(5),
  },
  directionTextStyle: {
    marginLeft: Matrics.ScaleValue(5),
    fontSize: Matrics.ScaleValue(13),
    fontFamily: Fonts.type.Arimo,
    color: Color.white,
  },
  categoryView: {
    margin: Matrics.ScaleValue(5),
    backgroundColor: Color.primary,
    borderRadius: 25,
    paddingHorizontal: Matrics.ScaleValue(10),
  },
  categoryTextStyle: {
    fontSize: Matrics.ScaleValue(15),
    fontFamily: Fonts.type.Arimo,
    color: Color.primary,
    margin: Matrics.ScaleValue(5),
  }
}

const mapStateToProps = (state) => {
  return {
    response: state.home,
  };
}
export default connect(mapStateToProps, { getShopProductsRequest })(RestaurantDetails)