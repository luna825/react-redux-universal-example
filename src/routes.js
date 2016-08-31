import React from 'react'
import {Route, IndexRoute} from 'react-router'

import {App, Home, Widgets} from './containers'

export default (store)=>{
  return (
    <Route name='app' path='/' component={App} >
      <IndexRoute component={Home} />
      <Route path="widgets" component={Widgets}/>
    </Route>
  )
}

