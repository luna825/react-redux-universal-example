import React,{Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {IndexLink,browserHistory} from 'react-router'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

import {InfoBar} from 'components'

import {asyncConnect} from 'redux-async-connect'
import {isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info'
import {isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth'

@asyncConnect([{
  promise: ({store:{dispatch, getState}}) => {

    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }

    if(!isAuthLoaded(getState())){
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state=>({user: state.auth.user}),
  {logout}
)
export default class App extends Component {
  static propTypes={
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user){
      browserHistory.push('/loginSuccess')
    }else if (this.props.user && !nextProps.user){
      browserHistory.push('/')
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render(){
    const {user} = this.props;
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
              {user &&
              <LinkContainer to="/chat">
                <NavItem eventKey={1}>Chat</NavItem>
              </LinkContainer>
              }


              <LinkContainer to="/widgets">
                <NavItem eventKey={2} >Widgets</NavItem>
              </LinkContainer>

              <LinkContainer to="/survey">
                <NavItem eventKey={3}>Survey</NavItem>
              </LinkContainer>

              <LinkContainer to="/about">
                <NavItem eventKey={4}>About</NavItem>
              </LinkContainer>

              {!user &&
              <LinkContainer to="/login">
                <NavItem eventKey={5}>Login</NavItem>
              </LinkContainer>
              }

              {user &&
              <LinkContainer to="/logout">
                <NavItem eventKey={6} onClick={this.handleLogout}>logout</NavItem>
              </LinkContainer>
              }

            </Nav>
          </Navbar.Collapse>


        </Navbar>
        <div className="appContent">{this.props.children}</div>
        <InfoBar />
      </div>
    )
  }
}