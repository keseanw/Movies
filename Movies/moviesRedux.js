export const types = {
    FETCH_POSTS_REQUEST: 'FETCH_POSTS_REQUEST',
    FETCH_POSTS_RESPONSE: 'FETCH_POSTS_RESPONSE',
    CLEAR_POSTS: 'CLEAR_POSTS',
  }
  
  export const actionCreators = {
    fetchPosts: () => async (dispatch, getState) => {
      dispatch({type: types.FETCH_POSTS_REQUEST})
  
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const posts = await response.json()
  
        dispatch({type: types.FETCH_POSTS_RESPONSE, payload: posts})
      } catch (e) {
        dispatch({type: types.FETCH_POSTS_RESPONSE, payload: e, error: true})
      }
    },
  
    clearPosts: () => async (dispatch, getState) => {
      if (getState().posts.length > 0) {
        dispatch({type: types.CLEAR_POSTS})
      }
    }
  }
  
  const initialState = {
    loading: true,
    error: false,
    posts: [],
  }
  
  export const reducer = (state = initialState, action) => {
    const {todos} = state
    const {type, payload, error} = action
  
    switch (type) {
      case types.FETCH_POSTS_REQUEST: {
        return {...state, loading: true, error: false}
      }
      case types.FETCH_POSTS_RESPONSE: {
        if (error) {
          return {...state, loading: false, error: true}
        }
  
        return {...state, loading: false, posts: payload}
      }
    }
  
    return state
  }
  