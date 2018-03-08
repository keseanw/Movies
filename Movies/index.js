import React, { Component } from 'react'
import { AppRegistry, View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

// Import the reducer and create a store
import { reducer } from './moviesRedux'
import App from './App';
// Add the thunk middleware to our store
const store = createStore(reducer, applyMiddleware(thunk))




// Pass the store into the Provider
const AppWithStore = () => (
    <Provider store={store}>
      <App />
    </Provider>
  )
  
  AppRegistry.registerComponent('Movies', () => AppWithStore)