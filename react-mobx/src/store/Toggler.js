import mobx, { computed, observable, action } from 'mobx'

class Toggler {
  @observable state = false

  @action toggle(value) {
    this.state = value || !this.state
  }

  @action toggleOn() {
    this.state = true
  }

  @action toggleOff() {
    this.state = false
  }
}

const toggler = window.toggler = new Toggler

export default toggler
