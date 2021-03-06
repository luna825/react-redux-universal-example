import React,{Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as authActions from 'redux/modules/auth'

@connect(
  state => ({user: state.auth.user}),
  authActions
)
export default class Login extends Component{

  static propTypes = {
    user: PropTypes.object,
    login:PropTypes.func,
    logout: PropTypes.func
  };

  handleSubmit(event){
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value=""
  }

  render(){
    const {user, logout} = this.props;
    return(
      <div className="container loginPage">
        <h1>Login</h1>
        {!user && 
        <div>
          <form className="login-form form-inline">
            <div className="form-group">
              <input type="text" ref="username" placeholder="Enter a username" className="form-control" />
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit.bind(this)}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    )
  }
}