import { GET_REPORT, SEND_REPORT, FAILD_REPORT } from '../actions/types'

// Global state for match-reports
const initialState = {
  reports: [],
  loading: false
}

export default function reportReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REPORT:
      return {
        ...state,
        reports: action.payload,
        loading: false
      }
    case SEND_REPORT:
      return {
        ...state,
        reports: [action.payload, ...state.reports],
        loading: false
      }
    case FAILD_REPORT:
      return {
        ...state
      }
    default:
      return state
  }
}
