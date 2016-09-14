import {combineReducers} from 'redux'

import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import counter from './counter'
import info from './info'
import widgets from './widgets'
import { reducer as formReducer } from 'redux-form'
import survey from './survey'

const rootReducer = combineReducers({
  counter,
  info,
  reduxAsyncConnect,
  widgets,
  form:formReducer,
  survey
})

export default rootReducer