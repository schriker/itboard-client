import * as actionTypes from '../actions/actionTypes'

const initialState = {
  isSending: false,
  authFailed: false,
  authUserCreated: false,
  verified: true,
  authErr: null,
  user: null,
  email: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return {
        ...state,
        isSending: true,
        authFailed: false,
        authErr: null
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
        authErr: null,
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
        isSending: false,
        authUserCreated: false,
        authErr: null
      }
    }
    case actionTypes.AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        authUserCreated: true,        
        verified: false,
        isSending: false
      }
    }
    case actionTypes.AUTH_USER_NOT_VERIFIED: {
      return {
        ...state,
        verified: false,
        email: action.email,
        isSending: false
      }
    }
    case actionTypes.AUTH_VERIFIED_RESET: {
      return {
        ...state,
        verified: true
      }
    }
    default: return state
  }
}

export default reducer