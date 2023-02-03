import React from 'react'
import Login from './Login'
import { TheHeader } from '../../../organisms'
import TheFooter from '../../../organisms/TheFooter'
import "../../../../assets/scss/header.scss"

const TheLoginLayout = () => {
  return (
    <>
      <div className="uk-light dark-body">
        <TheHeader />
        <div className="uk-body login-body">
            <Login />
        </div>
        <TheFooter />
      </div>
    </>
  )
}

export default TheLoginLayout
