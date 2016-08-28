import React,{Component, PropTypes} from 'react'

export default class App extends Component {
  render(){
    return(
      <div>
        <div>App Header</div>
        <div>{this.props.children}</div>
        <div>App Footer</div>
      </div>
    )
  }
}