const LOAD = "app/widgets/LOAD"
const LOAD_SUCCESS = "app/widgets/LOAD_SUCCESS"
const LOAD_FAIL = "app/widgets/LOAD_FAIL"

const EDIT_START = "app/widgets/EDIT_START"
const EDIT_END = "app/widgets/EDIT_END"

const SAVE = "app/widgets/SAVE"
const SAVE_SUCCESS = "app/widgets/SAVE_SUCCESS"
const SAVE_FAIL = "app/widgets/SAVE_FAIL"


const initialState = {
  loaded:false,
  editing:{},
  saveError:{}
}

export function isLoaded(globalState){
  return globalState.widgets && globalState.widgets.loaded;
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
    case EDIT_START:
      return{
        ...state,
        editing:{
          ...state.editing,
          [action.id]:true
        }
      };
    case EDIT_END:
      return{
        ...state,
        editing:{
          ...state.editing,
          [action.id]:false
        }
      };
    case SAVE:
      return state; //saving状态由redux-form提供
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result
      return{
        ...state,
        data:data,
        editing:{
          ...state.editing,
          [action.id]:false
        },
        saveError:{
          ...state.saveError,
          [action.id]:null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string'? {
        ...state,
        saveError:{
          ...state.saveError,
          [action.id]:action.error
        }
      } : state; 
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

export function editStart(id){
  return{
    type:EDIT_START,
    id
  }
}

export function editEnd(id){
  return {
    type:EDIT_END,
    id
  }
}

export function save(widget){
  return {
    types:[SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id:widget.id,
    promise:(client) => client.post('/widget/update',{data:widget})
  }
}