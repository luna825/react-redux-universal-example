import {createStore, applyMiddleware, compose} from 'redux'

import rootReducer from './modules/reducers'
import thunk from './middleware/thunk'
import clienMiddleware from './middleware/clientMiddleware'
import DevTools from 'containers/Devtools';

export default function createStoreWithMiddleware(client,initialState){
  const enhancer = compose(
    applyMiddleware(thunk, clienMiddleware(client)),
    DevTools.instrument()
  )

  const store = createStore(rootReducer, initialState, enhancer);

  return store;

}