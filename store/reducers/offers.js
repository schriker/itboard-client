import * as actionTypes from '../actions/actionTypes'

const initialState = {
  filters: {
    language: [],
    location: null,
    level: null,
    stack: null,
    salary: null
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGES: {
      return {
        ...state,
        filters: {
          ...state.filters,
          language: action.payload
        }
      }
    }
    default: return state
  }
}

export default reducer