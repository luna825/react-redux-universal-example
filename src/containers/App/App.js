import React,{Component, PropTypes} from 'react'

import {IndexLink} from 'react-router'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

import {InfoBar} from 'components'


export default class App extends Component {
  render(){
    return(
      <div className="app">
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand> 
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className="brand" />
                <span>React Redux Example</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
        </Navbar>
        <div className="appContent">{this.props.children}</div>
        <InfoBar />
      </div>
    )
  }
}