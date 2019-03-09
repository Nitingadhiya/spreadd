import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'

import { Color, Images, Matrics, ApplicationStyles } from '../../Config'
import { TextInputView, ShopView, ActionModal, Loader, LoadWheel } from '../../Component'
import { getAllShopRequest } from '../../Redux/actions'
import Global from '../../Global/Global'
import { category_image_url } from '../../Api/api'


class CategoryDetails extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Kids',
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.headerStyle,
    headerTintColor: Color.white,
    headerLeft:
      <TouchableOpacity onPress={() => navigation.goBack()} >
        <Image source={Images.back} style={styles.headerLeftIconStyle} />
      </TouchableOpacity>,
    headerRight:
      <TouchableOpacity onPress={() => { }} >
        <Image source={Images.cart} style={styles.headerLeftIconStyle} />
      </TouchableOpacity>,
  })

  state = {
    search: '',
    allShopOffset: 0,
    shopData: [],
    loading: true,
    loadMore: false
  }

  callGetAllShop() {
    console.log(this.state.allShopOffset)
    this.props.getAllShopRequest({
      user_id: global.userId,
      category_id: this.props.navigation.state.params.category_id,
      search_txt: this.state.search,
      new_shop: "0",
      offset: this.state.allShopOffset
    })
  }

  componentDidMount() {
    this.callGetAllShop()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response.getAllShopSuccess && (this.state.loading || this.state.loadMore)) {
      const { data } = nextProps.response
      this.setState({ loading: false, loadMore: false })
      if (data.status == '1') {
        console.log('****ALL shop****', data.data.shop)
        this.setState({ shopData: [...this.state.shopData, ...data.data.shop] })
      }
      else {
        if (this.state.shopData.length == 0)
          this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed) {
      if (this.state.loadMore) {
        this.setState({ allShopOffset: this.state.allShopOffset - 1, loadMore: false })
      }
      this.setState({ loading: false, errorModal: true, errorMsg: Global.requestFailedMsg })
    }
  }

  loadMoreShops() {
    console.log('load more..')
    this.setState({ loadMore: true })
    this.setState({
      allShopOffset: Number(this.state.allShopOffset) + 1,
    }, () => {
      this.callGetAllShop();
    });
  }

  renderAllShops = ({ item }) => {
    return (
      <ShopView
        imageSrc={{ uri: `${category_image_url}${item.photo}` }}
        //imageSrc={require('../../Images/img2.png')}
        name={item.merchant_name}
        address={item.shop_address}
        review={20}
        onPress={() => { }}
      />
    )
  }

  async onSearch() {
    await this.setState({ loading: true, allShopOffset: 0, shopData: [] })
    this.callGetAllShop()
  }

  async onSearchCancelPress() {
    await this.setState({
      search: '', shopData: [],
      newShopOffset: 0, loading: true,
    })
    this.callGetAllShop()
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
        {/* <View style={{ marginVertical: Matrics.ScaleValue(10) }}> */}
        <FlatList
          data={this.state.shopData}
          ListEmptyComponent={() => <View />}
          style={{ marginVertical: Matrics.ScaleValue(15), margin: Matrics.ScaleValue(7) }}
          renderItem={this.renderAllShops}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (<View style={{ height: Matrics.ScaleValue(10) }} />)}
          onEndReached={() => this.state.shopData.length > 0 && !this.state.loading && !this.state.loadMore ? this.loadMoreShops() : null}
          onEndReachedThreshold={0.5}
        />
        {
          this.state.loadMore ? <Loader /> : null
        }
        {/* </View> */}
        <LoadWheel visible={this.state.loading} />
        <ActionModal visible={this.state.errorModal}
          message={this.state.errorMsg}
          onPress={() => { this.setState({ errorModal: false }) }}
        />
      </View>
    )
  }
}

const styles = {
  ...ApplicationStyles
}

const mapStateToProps = (state) => {
  return {
    response: state.home,
    responsePromotion: state.hot,
  };
}
export default connect(mapStateToProps, { getAllShopRequest })(CategoryDetails)