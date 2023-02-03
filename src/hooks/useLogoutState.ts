import { AzureAdContext } from '../components/azure-ad/AzureAdContext'
import { UserInfo } from '../data/types/UserInfo'
import { AuthConstant } from '../utils/AppConstants'
import { localStorageUtils } from '../utils/LocalStorageUtils'

/**
 * LogoutState type
 */
type LogoutState = {
  handleLogout: () => void,
  handlePostLogout: () => void
}

/**
 * useLoginState is functional component for Logout button/event
 * It performs actions like :
 *  - Get userInfo from localStorgage
 *  - Logout Microsoft login
 *  - Clear localStorage
 *
 * @returns LogoutState
 *
 */
export const useLogoutState = (): LogoutState => {


  const authenticationModule: AzureAdContext = new AzureAdContext()

  const handleLogout = (e) => {
    e.preventDefault();
    const userInfo: UserInfo = JSON.parse(
      //TODO Add Constants for localhost storage key
      localStorage.getItem(AuthConstant.USER_INFO) || ''
    )
    if (userInfo) {
      authenticationModule.logout(userInfo, handlePostLogout, handlePostLogout)  
    } else {
      handlePostLogout();
    }
  }

  //hook to handle Post logout process to clear storage values and navigate user to login page
  const handlePostLogout = () => {
    localStorageUtils.clearStorage()
    window.location.href = '/'
  }
  return {
    handleLogout,
    handlePostLogout
  }
}
