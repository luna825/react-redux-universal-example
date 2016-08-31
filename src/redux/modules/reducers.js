import {combineReducers} from 'redux'

import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import counter from './counter'
import info from './info'

const rootReducer = combineReducers({
  counter,
  info,
  reduxAsyncConnect
})

export default rootReducer