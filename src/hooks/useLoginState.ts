import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AzureAdContext } from '../components/azure-ad/AzureAdContext'
import { UserInfo } from '../data/types/UserInfo' 
import { localStorageUtils } from '../utils/LocalStorageUtils'
import { DpmService } from '../services/DpmServices'
import { useLogoutState } from '../../src/hooks/useLogoutState'
import { AppConstant } from '../../src/utils/AppConstants'

/**
 * Login State Object Type
 */
type LoginState = {
  errorMessage: string,
  isClientConfigured: boolean
  handleLoginClick: () => void
}

/**
 * useLoginState is functional component for Login Page
 * It performs actions like :
 *  - Connect to Microsoft Login
 *  - After Successful microsoft login, fetch user settings from API
 *  - Redirect user to appropriate page
 *
 * @returns LoginState
 */
export const useLoginState = (): LoginState => {

  //Logout
  const { handleLogout } = useLogoutState();

  //For page navigation
  
  //For multi language support
  const { t } = useTranslation()

  // Set error Message
  const [errorMessage, setErrorMessage] = useState('')

  // Azure Context object to use microsoft login, logout, account detail
  const azureAuthContext: AzureAdContext = new AzureAdContext()

  // hook to have state of client ID configured or not
  const [isClientConfigured, setIsClientconfigured] = useState<boolean>(false)

  /**
   * hook to handle login click
   * connect to microsoft login page based on browser
   * If browser is other than Internet Explorer open login popup else redirect to microsoft login page
   */

  const handleLoginClick = () => {
      setErrorMessage('')
    azureAuthContext.login('loginPopup', handleLoginResponse)
  }

  // hook to handle microsoft login response
  // store user information in local storage to use in other pages
  // fetch user settings based on microsoft user information
  const handleLoginResponse: any = async (
    userInfo: UserInfo | undefined,
    accessToken: string,
    language: string
  ) => {
    localStorageUtils.setIsLoggedIn(true);
    localStorageUtils.setUserInfo(userInfo);
    localStorageUtils.setTokenInfo(accessToken);

    if(userInfo?.account?.username){
      getUserPreferance(userInfo.account.username)
    }
    else {
      setErrorMessage(t('LOGIN.LOGIN_FAILED'))
      handleLogout()
    }
  language = AppConstant.LANGUAGE_SETTING_EN
  }

  // Get user preferance and store in localstorage
  const getUserPreferance = async (userName: string) => {
    DpmService.fetchPowerPlantAssetGroup(userName)
    .then((res: any) => {
      let initialuserpreference = res.data;
      localStorageUtils.setUserPreferences(JSON.stringify(res.data));
      if(initialuserpreference){
        localStorageUtils.setSelectedPlantUserPreferance(JSON.stringify(initialuserpreference[0]))
      }
      window.location.href = '/'
    }).catch((err) => {
      console.error(err)
      setErrorMessage(t('LOGIN.LOGIN_FAILED'))
      handleLogout()
    })
  }

  //on page load, set flag for azure client id configured or not and set
  React.useEffect(() => {
    ;(async () => {
      setIsClientconfigured(azureAuthContext.isClientConfigured)
      if (!azureAuthContext.isClientConfigured) {
        setErrorMessage(t('LOGIN.AZURE_CLIENT_NOT_CONFIGURED'))
      } else {
        setErrorMessage('')
      }
    })()
  }, [azureAuthContext.isClientConfigured,t])

  return {
    errorMessage,
    isClientConfigured,
    handleLoginClick,
  }
}