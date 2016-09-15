import React from 'react'
import {Route, IndexRoute} from 'react-router'

import {App, Home, Widgets, Survey, About, Login} from './containers'

export default (store)=>{
  return (
    <Route name='app' path='/' component={App} >
      <IndexRoute component={Home} />
      <Route path="widgets" component={Widgets}/>
      <Route path="survey" component={Survey} />
      <Route path="about" component={About} />
      <Route path="login" component={Login} />
    </Route>
  )
}

