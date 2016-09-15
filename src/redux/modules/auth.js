const LOGIN = "app/auth/LOGIN"
const LOGIN_SUCCESS = "app/auth/LOGIN_SUCCESS"
const LOGIN_FAIL = "app/auth/LOGIN_FAIL"
const LOGOUT = 'app/auth/LOGOUT';
const LOGOUT_SUCCESS = 'app/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'app/auth/LOGOUT_FAIL';

const initialState={
  loaded: false
}

export default function reducer(state=initialState, action){
  switch(action.type){
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn:false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn:false,
        user:null,
        loginErr: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutErr: action.error
      }
    default:
      return state
  }
}

export function login(name){
  return {
    types:[LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login',{
      data:{
        name: name
      }
    })
  }
}


export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}