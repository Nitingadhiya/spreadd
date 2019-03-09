import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView
} from 'react-native'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import reducers from './Redux/reducers'
import rootSaga from './Redux/saga'
import AppNavigation from './route'
import InternetConnection from './Component/InternetConnection'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default class App extends Component {

  componentDidMount() {
    //console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigation />
          <InternetConnection />
        </View>
      </Provider>
    )
  }
}