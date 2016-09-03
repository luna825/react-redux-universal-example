export default function clientMiddleware(client){
  return store => next => action => {
    const {promise, types, ...rest} = action

    if (!promise){
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({...rest, type:REQUEST})

    const actionPromise = promise(client)
    actionPromise.then(
      (result) => {next({...rest, result, type:SUCCESS})}
    ).catch((error) =>{
      console.error('MIDDLEWARE ERROR:', error);
      next({...rest, error, type: FAILURE});
    })

    return actionPromise;

  }
}