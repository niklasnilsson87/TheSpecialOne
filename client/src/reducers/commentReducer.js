import { GET_COMMENTS, ADD_COMMENTS, COMMENT_FAIL } from '../actions/types'

// Global state for comments.
const initialState = {
  comments: [],
  loading: false
}

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      }
    case ADD_COMMENTS:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false
      }
    case COMMENT_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}
