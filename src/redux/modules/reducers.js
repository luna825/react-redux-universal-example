import {combineReducers} from 'redux'

import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import counter from './counter'
import info from './info'
import widgets from './widgets'
import auth from './auth'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  counter,
  info,
  reduxAsyncConnect,
  widgets,
  form:formReducer,
  auth
})

export default rootReducer