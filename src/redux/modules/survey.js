const LOAD = 'app/survey/LOAD'

export default function reducer(state={},action){
  switch(action.type){
    case LOAD:
      return{
        data:action.data
      }
    default:
      return state;
  }
}

export function load(data){
  return {
    type:LOAD,
    data
  }
}