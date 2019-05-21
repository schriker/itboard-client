import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// Import redicers here

const initialState = {
  // Initial store
}

const rootReducer = combineReducers({
  // Reducers goes here
})

export function initializeStore (state = initialState) {
  return createStore(
    rootReducer,
    state,
    applyMiddleware(thunk)
  )
}