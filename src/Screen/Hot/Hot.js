import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import { connect } from 'react-redux'

import { Color, Images, Matrics, ApplicationStyles } from '../../Config'
import { TextInputView, MainOfferShopView, ActionModal, LoadWheel } from '../../Component'
import Global from '../../Global/Global'

import { getPromotionsRequest } from '../../Redux/actions'
import { promotion_image_url } from '../../Api/api'

class Hot extends Component {
  state = {
    search: '',
    promotionsData: [],
    loading: true,
    errorModal: false,
    errorMsg: '',
    refreshing: false
  }

  callGetPromotionsList() {
    if (!this.state.refreshing)
      this.setState({ loading: true })
    this.props.getPromotionsRequest()
  }

  componentDidMount() {
    this.callGetPromotionsList()
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.response.getPromotionsSuccess && (this.state.loading || this.state.refreshing)) {
      const { data } = nextProps.response
      this.setState({ loading: false, refreshing: false })
      if (data.status == '1') {
        this.setState({ promotionsData: data.data.promotion_request })

      }
      else {
        this.setState({ errorModal: true, errorMsg: data.message })
      }
    }
    else if (nextProps.response.isRequestFailed && (this.state.loading || this.state.refreshing)) {
      this.setState({ loading: false, refreshing: false, errorModal: true, errorMsg: Global.requestFailedMsg })
    }
  }

  onSearch(search) {

  }

  renderPromotions = ({ item }) => {
    return (
      <MainOfferShopView
        //imageSrc={require('../../Images/img1.png')}
        imageSrc={promotion_image_url + '7.jpg'}
        title={item.title}
        subTitle={item.subtitle}
        offer={item.offer_text}
        onPress={() => { }}
        offerTextColor={item.offer_text_color}
        offerTextBgColor={item.offer_text_bg_color}
      />
    )
  }

  pullToRefresh = async () => {
    await this.setState({ refreshing: true })
    this.callGetPromotionsList()
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
        <Text style={[styles.titleStyle, { paddingVertical: 5 }]}>Promotions</Text>

        <FlatList
          data={this.state.promotionsData}
          refreshing={this.state.refreshing}
          onRefresh={this.pullToRefresh}
          style={{ marginHorizontal: Matrics.ScaleValue(5) }}
          renderItem={this.renderPromotions}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (<View style={{ height: Matrics.ScaleValue(8) }} />)}
        />
        <ActionModal visible={this.state.errorModal}
          message={this.state.errorMsg}
          onPress={() => { this.setState({ errorModal: false }) }}
        />
        <LoadWheel visible={this.state.loading} />
      </View>
    )
  }
}

const styles = {
  ...ApplicationStyles,
}


const mapStateToProps = (state) => {
  return {
    response: state.hot,
  };
}
export default connect(mapStateToProps, { getPromotionsRequest })(Hot);