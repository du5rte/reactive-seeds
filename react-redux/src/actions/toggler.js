export function toggle(newValue) {
  return {
    type: 'TOGGLE',
    value: newValue
  }
}


export function toggleOn() {
  return {
    type: 'TOGGLE_ON',
    value: true
  }
}

export function toggleOff() {
  return {
    type: 'TOGGLE_OFF',
    value: true
  }
}
