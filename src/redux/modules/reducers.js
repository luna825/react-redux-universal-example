import {combineReducers} from 'redux'

import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import counter from './counter'
import info from './info'
import widgets from './widgets'

const rootReducer = combineReducers({
  counter,
  info,
  reduxAsyncConnect,
  widgets
})

export default rootReducer