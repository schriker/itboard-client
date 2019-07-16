import * as actionTypes from '../actions/actionTypes'

const initialState = {
  isSending: false,
  authFailed: false,
  authErr: '',
  user: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return {
        ...state,
        isSending: true
      }
    }
    case actionTypes.AUTH_FAILED: {
      return {
        ...state,
        isSending: false,
        authFailed: true,
        authErr: action.payload,
        user: null
      }
    }
    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        isSending: false,
        authFailed: false,
        authErr: '',
        user: {
          ...action.payload
        }
      }
    }
    case actionTypes.AUTH_LOGOUT: {
      return {
        ...state,
        user: null
      }
    }
    case actionTypes.AUTH_RESET: {
      return {
        ...state,
        authFailed: false,
        authErr: ''
      }
    }
    default: return state
  }
}

export default reducer