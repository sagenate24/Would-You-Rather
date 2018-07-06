const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The Action: ', action)
    const returnValue = new(action)
    console.log('The new state: ', store.getState())
  console.groupEnd()
  return returnValue
}

export default logger;