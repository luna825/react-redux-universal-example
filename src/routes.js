import React from 'react'
import {Route, IndexRoute} from 'react-router'

import {isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth'

import {App, Home, Widgets, Survey, About, Login, LoginSuccess} from './containers'

export default (store)=>{

  const requireLogin=(nextState, replace, cb) =>{

    function checkAuth(){
      const {auth: {user} } = store.getState()
      if(!user){
        replace('/')
      }

      cb()
    }

    if(!isAuthLoaded(store.getState())){
      store.dispatch(loadAuth()).then(checkAuth);
    }else{
      checkAuth()
    }

  }

  return (
    <Route name='app' path='/' component={App} >
      <IndexRoute component={Home} />
      <Route path="widgets" component={Widgets}/>
      <Route path="survey" component={Survey} />
      <Route path="about" component={About} />
      <Route path="login" component={Login} />

      <Route onEnter={requireLogin} >
        <Route path="loginSuccess" component={LoginSuccess} />
      </Route> 
    </Route>
  )
}

