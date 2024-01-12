import { GET_PLAYER, PLAYER_LOADING } from '../actions/types'

// Global state for players.
const initialState = {
  players: [],
  loading: false
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLAYER:
      return {
        ...state,
        players: action.payload,
        loading: false
      }
    case PLAYER_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
