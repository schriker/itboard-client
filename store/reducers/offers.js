import * as actionTypes from '../actions/actionTypes'

const initialState = {
  filters: {
    language: [],
    location: null,
    level: null,
    stack: null,
    salary: null
  },
  newOffer: {}
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
    case actionTypes.NEW_OFFER_DETAILS: {
      return {
        ...state,
        newOffer: {
          ...state.newOffer,
          ...action.payload
        }
      }
    }
    case actionTypes.NEW_OFFER_CONTENT: {
      return {
        ...state,
        newOffer: {
          ...state.newOffer,
          content: action.payload,
          raw: action.raw
        }
      }
    }
    default: return state
  }
}

export default reducer