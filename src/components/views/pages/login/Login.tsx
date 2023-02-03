import React from 'react'
import { useLoginState } from '../../../../hooks/useLoginState'
import i18n from '../../../../translations/i18n'

/**
 * Login with Microsoft Azure Ad
 *
 * On click of Login Button, open modal popup (redirect to url if it is internet explorer browser)
 * to authenticate user by microsoft account login. Once user authenticated, redirect back to
 * login page and execute further process of authentication.
 *
 * If Azure Client ID configured, Show Error message for client ID not configured and
 * Disable Login button
 *
 * Show error message if there is either client configuration error or API request fails
 */
const Login: React.FC = () => {
  const { handleLoginClick, isClientConfigured  } = useLoginState()

  return (
    <div className="main-content no-sidebar">
    {/* Content start */}
    <div id="content-section" className="content">
      <div className="h-100vh uk-flex uk-flex-middle uk-position-relative">
        <button
          className="uk-button uk-button-primary uk-button-large uk-margin-auto btn-shadow"
          onClick={() => handleLoginClick()}
          disabled={isClientConfigured ? false : true}
        >
          {i18n.t("LOGIN.LOGIN_BTN")}
        </button>
      </div>
    </div>
  </div>
  )
}

export default Login
