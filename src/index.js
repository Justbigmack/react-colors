import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createGenerateClassName } from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider'
import * as serviceWorker from './serviceWorker'

import App from './App'
import './index.css'

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c'
})

ReactDOM.render(
  <JssProvider generateClassName={generateClassName}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </JssProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
