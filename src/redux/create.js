import {createStore, applyMiddleware, compose} from 'redux'

import rootReducer from './modules/reducers'
import thunk from './middleware/thunk'

export default function createStoreWithMiddleware(initialState){
  const enhancer = compose(
    applyMiddleware(thunk)
  )

  const store = createStore(rootReducer, initialState, enhancer);

  return store;

}