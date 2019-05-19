import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import title from './reducers/title'

const initialState = {
  title: {
    pageTitle: 'Old Title'
  }
}

const rootReducer = combineReducers({
  title
})

export function initializeStore (state = initialState) {
  return createStore(
    rootReducer,
    state,
    applyMiddleware(thunk)
  )
}