import * as actionTypes from '../actions/actionTypes'

const initialState = {
  pageTitle: 'Temp Title'
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_TITLE: 
      return {
        ...state,
        pageTitle: action.payload
      }
    default: 
      return state 
  }
}

export default reducer