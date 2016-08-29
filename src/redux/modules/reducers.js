import {combineReducers} from 'redux'

import counter from './counter'
import info from './info'

const rootReducer = combineReducers({
  counter,
  info
})

export default rootReducer