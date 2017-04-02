const initialState = false

export default function toggler(state = initialState, action) {
  switch (action.type) {

    case 'TOGGLE':
    console.log(action.value)
      return action.value || !state

    case 'TOGGLE_ON':
      return true

    case 'TOGGLE_OFF':
      return false

    default:
      return state
  }
}
