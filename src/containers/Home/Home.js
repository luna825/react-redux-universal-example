import React ,{Component, PropTypes} from 'react'

import {Counter} from 'components'

export default class Home extends Component {
  render(){
    return(
      <div className="home">
        <div className="masthead">
          <div className="container">
            <div className="logo">
              <p>
                <img src="/assets/logo.png" alt=""/>
              </p>
            </div>
            <h1>React Redux Example</h1>
            <h2>所有React Redux模块最佳实践的示例</h2>
            <p>
              <a className="github" href="https://github.com/luna825/react-redux-universal-example"
               target="_blank">
              <i className="fa fa-github"/>Github源码
              </a> 
            </p>
          </div>
        </div>

        <div className="container">
          <div className="counterContainer">
            <Counter />
          </div>
        </div>
      

      </div>
    )
  }
}