import axios from 'axios'
import i18n from 'i18next'
import { AzureAdContext } from '../components/azure-ad/AzureAdContext'
import { localStorageUtils } from '../utils/LocalStorageUtils'
import { AppConstant, AuthHeader } from '../utils/AppConstants'
import {useLogoutState} from '../../src/hooks/useLogoutState'

const AxiosHttpService = () => {
  const azureAuthContext: AzureAdContext = new AzureAdContext()
  const axiosInstance = axios.create()
  const {handlePostLogout} = useLogoutState();

  const httpConfig = {
    headers: {
     Accept: 'application/json',
    'Content-Type': 'application/json',
     Authorization: `${AppConstant.BEARER_TXT}${localStorageUtils.getToken()}`,
    'accept-language': i18n.language,
    },
  }

  let retry = 0
  const explicitLogout = () => {
    // Call handle logout function and logged out the user
    handlePostLogout()
  }
  /**
   * Request/Response Interceptor
   * On response, whether status code is 401 or not. If yes fetch new DPP Access token
   * and retry original request.
   * If DPP Access token api fails to get access token, clear localstorage and
   * redirect user to login page
   */
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      //Handle 401 and 302 unauthorized status code
      if (!error.response || error.response.status === 401 || error.response.status === 302) {
        if (retry === 2) {
          retry = 0
          explicitLogout()
        } else {
          try {
            const dppAccessToken = await azureAuthContext.getDpmAccessToken()
            localStorageUtils.setTokenInfo(dppAccessToken);
            retry++
            originalRequest.headers[AuthHeader.AUTHORIZATION] = `${AppConstant.BEARER_TXT}${dppAccessToken}`;
            return axiosInstance(originalRequest)
          } catch (e) {
            explicitLogout()
          }
        }
      }
      return Promise.reject(error)
    }
  )
  return {
    Get: (url: string) => axiosInstance.get(url, httpConfig),
    Post: (url: string, data: any) => axiosInstance.post(url, data, httpConfig),
    Patch: (url: string, data: any) =>
      axiosInstance.patch(url, data, httpConfig),
  }
}
export default AxiosHttpService
