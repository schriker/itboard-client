import * as actionTypes from '../actions/actionTypes'

const initialState = {
  filters: {
    language: [],
    location: null,
    level: null,
    stack: null,
    salary: null
  },
  newOffer: {},
  isSending: false,
  saved: false,
  err: null
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
    case actionTypes.OFFER_SAVE_START: {
      return {
        ...state,
        isSending: true,
        saved: false,
        err: null
      }
    }
    case actionTypes.OFFER_SAVE_SUCCESS: {
      return {
        ...state,
        isSending: false,
        saved: true,
        err: null
      }
    }
    case actionTypes.OFFER_SAVE_FAILED: {
      return {
        ...state,
        isSending: false,
        saved: false,
        err: action.err
      }
    }
    case actionTypes.OFFER_SAVE_CLEAR_ERROR: {
      return {
        ...state,
        err: null
      }
    }
    case actionTypes.OFFER_SAVE_RESET: {
      return {
        ...state,
        newOffer: {},
        isSending: false,
        saved: false,
        err: null
      }
    }
    default: return state
  }
}

export default reducer