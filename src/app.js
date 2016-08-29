import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'

import routes from './routes'

import {Provider} from 'react-redux'
import createWithMiddleware from 'redux/create'

import './theme/style/Index.scss'

const store = createWithMiddleware()

ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
  ,document.getElementById('app'))