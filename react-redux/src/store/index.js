import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise'

import reducers from '../reducers'

const initialState = {}

// Store
export default createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk, promise, logger()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
