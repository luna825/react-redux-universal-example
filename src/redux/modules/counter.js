const INCREMENT = 'app/counter/INCREMENT'


export default function reducer(state=0, action){
  switch(action.type){
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
}

export function increment(){
  return {
    type: INCREMENT
  }
}

export function incrementIfOdd(){
  return (getState, dispatch) => {
    const {counter} = getState()

    if(counter % 2 === 0){
      return
    }

    dispatch(increment())
  }
}