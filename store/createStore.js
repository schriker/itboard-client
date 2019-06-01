import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import offersReducer from './reducers/offers'
import authReducer from './reducers/auth'

const initialState = {
  // Initial store
}

const rootReducer = combineReducers({
   offers: offersReducer,
   auth: authReducer
})

const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export function initializeStore (state = initialState) {
  return createStore(
    rootReducer,
    state,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )
}