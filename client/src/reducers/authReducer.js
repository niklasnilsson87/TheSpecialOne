import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  DESCRIPTION_SUCCESS,
  REGISTER_FAIL,
  UPDATEPOINT_SUCCESS,
  UPDATE_MANAGER_POINT_SUCCESS
} from '../actions/types'

// Global state for User.
const initialState = {
  token: window.localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case DESCRIPTION_SUCCESS:
    case UPDATEPOINT_SUCCESS:
      state.user.lastPlayed = action.payload.lastPlayed
      state.user.totalPoints = action.payload.totalPoints
      state.user.description = action.payload.description
      state.user.favPlayer = action.payload.favPlayer
      state.user.favTeam = action.payload.favTeam
      return {
        ...state
      }
    case UPDATE_MANAGER_POINT_SUCCESS:
      state.user.totalPoints = action.payload
      return {
        ...state
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      window.localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      window.localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state
  }
}
