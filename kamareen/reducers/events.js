import { FETCHING_EVENTS} from '../Constants'
const initialState = {
  events: [],
  isFetching: false,
  error: false
}

export default function habitsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_EVENTS:
      return {
        ...state,
        isFetching: false,
        events: action.data
      }

    default:
      return state
  }
}
