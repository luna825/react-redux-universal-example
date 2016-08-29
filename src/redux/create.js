import {createStore, applyMiddleware, compose} from 'redux'

import rootReducer from './modules/reducers'
import thunk from './middleware/thunk'
import clienMiddleware from './middleware/clientMiddleware'

export default function createStoreWithMiddleware(client,initialState){
  const enhancer = compose(
    applyMiddleware(thunk, clienMiddleware(client))
  )

  const store = createStore(rootReducer, initialState, enhancer);

  return store;

}