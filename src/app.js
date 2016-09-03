import React from 'react'
import ReactDOM from 'react-dom'
import { renderToString } from 'react-dom/server'
import {Router, browserHistory, match} from 'react-router'

import getRoutes from './routes'
import {ReduxAsyncConnect} from 'redux-async-connect'

import {Provider} from 'react-redux'
import createWithMiddleware from 'redux/create'

import ApiClient from 'utils/ApiClient'

import './theme/style/Index.scss'

const client = new ApiClient()
const initState = window.__INITIAL_STATE__
const store = createWithMiddleware(client,initState)
const dest = document.getElementById("app")

const component = (
  <Router render={(props) => 
    <ReduxAsyncConnect {...props} filter={item => !item.deferred} /> } 
    history={browserHistory}>
    {getRoutes(store)}
  </Router>
)

ReactDOM.render(
  <Provider store={store} >
    {component}
  </Provider>
  ,dest)

if (process.env.NODE_ENV !== 'production') {

  const DevTools = require('containers/Devtools').default
  const popup = document.getElementById('app')
  let div = document.createElement('div');
  div.id = "react-devtools-root"

  setTimeout(() => {
    popup.appendChild(div);
    ReactDOM.render(
      <DevTools store={store} />,
      document.getElementById('react-devtools-root')
    );
  }, 10);
}