const LOAD = 'app/info/LOAD'
const LOAD_SUCCESS = 'app/info/LOAD_SUCCESS'
const LOAD_FAIL = 'app/info/LOAD_FAIL'

const initialState = {
  loaded: false
}

export function load(){
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('loadInfo')
  }
}

export default function reducer(state=initialState , action){
  switch(action.type){
    case LOAD:
      return {
        ...state,
        loading:true
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded:true,
        loading:false,
        data: action.result
      }
    case LOAD_FAIL:
      return {
        ...state,
        loaded:false,
        loading:false,
        data:action.error
      }
    default:
      return state;
  }
}