import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import 'font-awesome/css/font-awesome.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './utils/Polyfill'
import './translations/i18n'
import App from './App'
import store from './store'
import "uikit/dist/css/uikit-core.min.css";
import "uikit/dist/js/uikit.min.js"; 
import './assets/scss/_custom.scss'
import './assets/scss/_common.scss'
import './assets/scss/icons.scss'
import './assets/scss/_button.scss'

const Main = () => (
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
ReactDOM.render(
  <>
    <Main />
  </>,

  document.getElementById('root')
)
