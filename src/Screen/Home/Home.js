import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  FlatList
} from 'react-native';
import { connect } from 'react-redux'

import { Color, Images, Matrics, ApplicationStyles } from '../../Config'
import { TextInputView, CategoryView, MainOfferShopView, NewShopsView, ShopView, ActionModal, Loader } from '../../Component/index'
import { getCategoryRequest, getNewShopRequest, getAllShopRequest, getPromotionsRequest } from '../../Redux/actions'
import { category_image_url, promotion_image_url } from '../../Api/api'
import Global from '../../Global/Global'
//import { FlatList } from 'react-native-gesture-handler';

class Home extends Component {
  state = {
    search: '',
    category: [],
    newShops: [],
    allShops: [],
    promotionsData: [],
    errorModal: false,
    errorMsg: '',
    category_id: '',
    newShopOffset: "0",
    newShopLoader: true,
    loadMoreNewShop: false,
    allShopOffset: "0",
    allShopLoader: true,
    loadMoreAllShop: false,
    categoryLoader: true,
    refreshing: false,
    promotionsLoader: true
  }

  callGetNewShops() {
    console.log(this.state.newShopOffset)
    this.props.getNewShopRequest({
      user_id: global.userId,
      category_id: this.state.category_id,
      search_txt: this.state.search,
      new_shop: "1",
      offset: this.state.newShopOffset
    })
  }

  callGetAllShop() {
    console.log(this.state.allShopOffset)
    this.props.getAllShopRequest({
      user_id: global.userId,
      category_id: this.state.category_id,
      search_txt: this.state.search,
      new_shop: "0",
      offset: this.state.allShopOffset
    })
  }

  callGetPromotionsList() {
    this.props.getPromotionsRequest()
  }

  LoadPageData() {
    this.props.getCategoryRequest()
    this.callGetNewShops()
    this.callGetAllShop()
    this.callGetPromotionsList()
  }

  componentDidMount() {
    this.LoadPageData()
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.response.getCategorySuccess && this.state.categoryLoader) {
      const { data } = nextProps.response
      this.setState({ categoryLoader: false })
      if (data.status == '1') {
        this.setState({ category: data.data.category })

      }
      else {
        this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.getNewShopSuccess && (this.state.newShopLoader || this.state.loadMoreNewShop)) {
      const { data } = nextProps.response
      this.setState({ newShopLoader: false, loadMoreNewShop: false })
      if (data.status == '1') {
        console.log('****new shop****', data.data.shop)
        this.setState({ newShops: [...this.state.newShops, ...data.data.shop] })
      }
      // else {
      //   if (this.state.newShops.length == 0)
      //     this.setState({ errorModal: true, errorMsg: data.message })
      // }
    }
    else if (nextProps.response.getAllShopSuccess && (this.state.allShopLoader || this.state.loadMoreAllShop)) {
      const { data } = nextProps.response
      this.setState({ allShopLoader: false, loadMoreAllShop: false, refreshing: false })
      if (data.status == '1') {
        console.log('****ALL shop****', data.data.shop)
        this.setState({ allShops: [...this.state.allShops, ...data.data.shop] })
      }
      else {
        if (this.state.allShops.length == 0)
          this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    if (nextProps.responsePromotion.getPromotionsSuccess && (this.state.promotionsLoader)) {
      const { data } = nextProps.responsePromotion
      this.setState({ promotionsLoader: false })
      if (data.status == '1') {
        this.setState({ promotionsData: data.data.promotion_request })
        console.log(data.data.promotion_request)
      }
      else {
        this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed) {
      if (this.state.loadMoreNewShop) {
        this.setState({ newShopOffset: this.state.newShopOffset - 1, loadMoreNewShop: false })
      }
      if (this.state.loadMoreAllShop) {
        this.setState({ allShopOffset: this.state.allShopOffset - 1, loadMoreAllShop: false })
      }
      this.setState({ refreshing: false, allShopLoader: false, categoryLoader: false, newShopLoader: false, refreshing: false, errorModal: true, errorMsg: Global.requestFailedMsg })
    }
  }

  renderCategory = ({ item }) => {
    return (
      <CategoryView
        name={item.category_name}
        imageSrc={{ uri: `${category_image_url}${item.category_icon}` }}
        onPress={() => { this.props.navigation.navigate('CategoryDetails', { category_id: item.category_id }) }}
      />
    )
  }

  renderNewShops = ({ item }) => {
    return (
      <NewShopsView
        imageSrc={{ uri: `${category_image_url}${item.photo}` }}
        name={item.merchant_name}
        distance={2}
        onPress={() => { this.props.navigation.navigate('RestaurantDetails', { merchant_id: item.merchant_id }) }}
      />
    )
  }

  renderAllShops = ({ item }) => {
    return (
      <ShopView
        imageSrc={{ uri: `${category_image_url}${item.photo}` }}
        //imageSrc={require('../../Images/img2.png')}
        name={item.merchant_name}
        address={item.shop_address}
        review={20}
        onPress={() => { this.props.navigation.navigate('RestaurantDetails', { merchant_id: item.merchant_id }) }}
      />
    )
  }

  loadMoreNewShops() {
    this.setState({ loadMoreNewShop: true })
    this.setState({
      newShopOffset: Number(this.state.newShopOffset) + 1,
    }, () => {
      this.callGetNewShops();
    });
  }

  loadMoreAllShops() {
    this.setState({ loadMoreAllShop: true })
    this.setState({
      allShopOffset: Number(this.state.allShopOffset) + 1,
    }, () => {
      this.callGetAllShop();
    });
  }

  reset() {
    this.setState({
      search: '',
      category: [],
      newShops: [],
      allShops: [],
      errorModal: false,
      errorMsg: '',
      category_id: '',
      searchText: '',
      newShopOffset: "0",
      newShopLoader: true,
      loadMoreNewShop: false,
      allShopOffset: "0",
      allShopLoader: true,
      loadMoreAllShop: false,
      categoryLoader: true,
      refreshing: false
    })
  }

  _onRefresh = async () => {
    await this.reset()
    await this.setState({ refreshing: true });
    this.LoadPageData()
  }

  renderPromotionsShop = ({ item }) => {
    return (
      <View style={{ width: Matrics.screenWidth }}>
        {/* <MainOfferShopView
          imageSrc={require('../../Images/img1.png')}
          title={'The Light Shop'}
          offer={20}
          onPress={() => { }}
        /> */}
        <MainOfferShopView
          //imageSrc={require('../../Images/img1.png')}
          imageSrc={{ uri: promotion_image_url + '7.jpg' }}
          offerTextColor={item.offer_text_color}
          offerTextBgColor={item.offer_text_bg_color}
          title={item.title}
          subTitle={item.subtitle}
          offer={item.offer_text}
          onPress={() => { }}
        />
      </View>
    )
  }

  async onSearch() {
    console.log('testtttt')
    await this.setState({ allShopLoader: true, newShopLoader: true, allShopOffset: 0, newShopOffset: 0, newShops: [], allShops: [] })
    this.callGetAllShop()
    this.callGetNewShops()
  }

  async onSearchCancelPress() {
    await this.setState({
      search: '', newShops: [], allShops: [],
      newShopOffset: "0", newShopLoader: true, loadMoreNewShop: false,
      allShopOffset: "0", allShopLoader: true, loadMoreAllShop: false,
    })
    this.callGetAllShop()
    this.callGetNewShops()
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
              returnKeyType={'search'}
              onChangeText={(search) => { this.setState({ search }) }}
              //onFocus={()=>this.setState({searchView: true})}
              onSubmitEditing={(event) => { this.onSearch() }}
              style={styles.searchInput}
            />
            {this.state.search == '' ? null : <TouchableOpacity onPress={() => { this.onSearchCancelPress() }}><Image source={Images.close} style={styles.closeiconStyle} /></TouchableOpacity>}
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <FlatList
            data={this.state.category}
            style={{ margin: Matrics.ScaleValue(7) }}
            renderItem={this.renderCategory}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          {
            this.state.categoryLoader ? <Loader /> : null
          }
        </View>

        <ScrollView
          //contentContainerStyle={{ flex: 0 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FlatList
              horizontal={true}
              data={this.state.promotionsData}
              renderItem={this.renderPromotionsShop}
              showsHorizontalScrollIndicator={false}
            />
            {
              this.state.promotionsLoader ? <Loader /> : null
            }
          </View>

          <Text style={styles.titleStyle}>New Shops</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FlatList
              data={this.state.newShops}
              style={{ margin: Matrics.ScaleValue(7) }}
              renderItem={this.renderNewShops}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              onEndReached={() => this.state.newShops.length > 0 && !this.state.newShopLoader && !this.state.loadMoreNewShop ? this.loadMoreNewShops() : null}
              onEndReachedThreshold={1}
              showsHorizontalScrollIndicator={false}
            />
            {
              this.state.newShopLoader || this.state.loadMoreNewShop ? <Loader /> : null
            }

          </View>

          <Text style={styles.titleStyle}>All Shops</Text>
          <FlatList
            data={this.state.allShops}
            style={{ margin: Matrics.ScaleValue(7) }}
            renderItem={this.renderAllShops}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            onEndReached={() => this.state.allShops.length > 0 && !this.state.allShopLoader && !this.state.loadMoreAllShop ? this.loadMoreAllShops() : null}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => (<View style={{ height: Matrics.ScaleValue(10) }} />)}
          />
          {
            this.state.allShopLoader || this.state.loadMoreAllShop ? <Loader /> : null
          }
        </ScrollView>
        <ActionModal visible={this.state.errorModal}
          message={this.state.errorMsg}
          onPress={() => { this.setState({ errorModal: false }) }}
        />
      </View>
    )
  }
}

const styles = {
  ...ApplicationStyles,
}

const mapStateToProps = (state) => {
  return {
    response: state.home,
    responsePromotion: state.hot,
  };
}
export default connect(mapStateToProps, { getCategoryRequest, getNewShopRequest, getAllShopRequest, getPromotionsRequest })(Home);