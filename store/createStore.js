import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import offersReducer from './reducers/offers'

const initialState = {
  // Initial store
}

const rootReducer = combineReducers({
   offers: offersReducer
})

export function initializeStore (state = initialState) {
  return createStore(
    rootReducer,
    state,
    applyMiddleware(thunk)
  )
}