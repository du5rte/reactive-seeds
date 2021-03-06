import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import { App } from './components'

import * as store from './store'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
