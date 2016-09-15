import React,{Component, PropTypes} from 'react'

import {IndexLink} from 'react-router'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

import {InfoBar} from 'components'

import {asyncConnect} from 'redux-async-connect'
import {isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info'

@asyncConnect([{
  promise: ({store:{dispatch, getState}}) => {

    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }

    return Promise.all(promises);
  }
}])

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

          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/widgets">
                <NavItem eventKey={2} >Widgets</NavItem>
              </LinkContainer>

              <LinkContainer to="/survey">
                <NavItem eventKey={3}>Survey</NavItem>
              </LinkContainer>

              <LinkContainer to="/about">
                <NavItem eventKey={4}>About</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>


        </Navbar>
        <div className="appContent">{this.props.children}</div>
        <InfoBar />
      </div>
    )
  }
}