const LOAD = "app/widgets/LOAD"
const LOAD_SUCCESS = "app/widgets/LOAD_SUCCESS"
const LOAD_FAIL = "app/widgets/LOAD_FAIL"

const initialState = {
  loaded:false
}

export default function reducer(state=initialState, action){

  switch(action.type){
    case LOAD:
      return {
        ...state,
        loading:true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading:false,
        data:action.result,
        err:null
      };
    case LOAD_FAIL:
      return{
        ...state,
        loaded:false,
        loading:false,
        data:null,
        err:action.error
      };
    default:
      return state;
  }
}

export function load(){
  return {
    types:[LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get("/widget/load")
  }
}