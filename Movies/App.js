import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { actionCreators } from './moviesRedux'

const mapStateToProps = (state) => ({
  loading: state.loading,
  error: state.error,
  posts: state.posts,
})

class App extends Component {

  componentWillMount() {
    const {dispatch} = this.props

    dispatch(actionCreators.fetchPosts())
  }

  refresh = async () => {
    const {dispatch} = this.props

    await dispatch(actionCreators.clearPosts())

    dispatch(actionCreators.fetchPosts())
  }

  renderPost = ({id, title, body}, i) => {
    return (
      <View
        key={id}
        style={styles.post}
      >
        <View style={styles.postNumber}>
          <Text>{i + 1}</Text>
        </View>
        <View style={styles.postContent}>
          <Text>
            {title}
          </Text>
          <Text style={styles.postBody}>
            {body}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const {posts, loading, error} = this.props

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text>
            Failed to load posts!
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {posts.map(this.renderPost)}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={this.refresh}
        >
          <Text>
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  post: {
    flexDirection: 'row',
  },
  postNumber: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 25,
    paddingRight: 15,
  },
  postBody: {
    marginTop: 10,
    fontSize: 12,
    color: 'lightgray',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  }
})

export default connect(mapStateToProps)(App)
