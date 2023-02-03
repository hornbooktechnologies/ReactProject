import {
  PublicClientApplication,
  AuthenticationResult,
  AccountInfo,
  RedirectRequest,
  PopupRequest,
  EndSessionPopupRequest,
  SilentRequest,
} from '@azure/msal-browser'
import { MSAL_CONFIG, DPM_SCOPE } from './AzureAdConfig'
import { Client } from '@microsoft/microsoft-graph-client'
import { ProfileInfo, UserInfo } from '../../data/types/UserInfo'

const config = {
  scopes: ['user.read'],
  prompt: 'select_account',
}

/**
 * AzureAdContext class
 *  - Microsoft login/Logout
 *  - Fetch User Account Info
 */
export class AzureAdContext {
  //instance of AzureAd application having, client Id, storage, and logger funciton
  private myMSALObj: PublicClientApplication = new PublicClientApplication(
    MSAL_CONFIG
  )
  private loginRequest?: PopupRequest
  // userinfo containing microsoft account info, and profile info
  public userInfo?: UserInfo | any
  private loginRedirectRequest?: RedirectRequest
  public isClientConfigured = false //Azure Client Id configured or not, set true/false

  constructor() {
    //Intialization
    this.userInfo = {
      profile: undefined,
      account: undefined,
    }
    this.setRequestObjects()
    if (MSAL_CONFIG?.auth?.clientId) {
      this.isClientConfigured = true
    }
  }

  private setRequestObjects(): void {
    this.loginRequest = {
      scopes: config.scopes,
      prompt: config.prompt,
    }
    this.loginRedirectRequest = {
      ...this.loginRequest,
      redirectStartPage: window.location.href,
    }
  }

  /**
   * Microsoft login
   * @param signInType : Indentification for login popup or login redirect
   * @param successCallback : callback function once user successfully login to microsoft account
   */

  public login(
    signInType: string,
    successCallback: (
      userInfo: UserInfo | undefined,
      accessToken: string
    ) => void
  ): void {
    if (signInType === 'loginPopup') {
      this.myMSALObj
        .loginPopup(this.loginRequest)
        .then(async (resp: AuthenticationResult) => {
          window.location.hash = ''
          const profileInfo = await this.getUserProfileInfo(resp.accessToken)
          this.setUserInfo(resp, profileInfo)
          const dppAccessToken = await this.getDpmAccessToken()
          successCallback(this.userInfo, dppAccessToken)
        })
        .catch((err: any) => {
          console.error(err)
          if (this.userInfo && this.userInfo.account && this.userInfo.profile) {
            this.logout(this.userInfo)
          }
        })
    } else if (signInType === 'loginRedirect') {
      this.myMSALObj.loginRedirect(this.loginRedirectRequest)
    }
  }

  /**
   * Set User Info
   * Assign object received response from Microsoft login
   * @param response | It has user account info
   * @param profileInfo | profile info received from client api
   */

  setUserInfo(response: AuthenticationResult, profileInfo: ProfileInfo): void {
    if (response !== null && response.account !== null) {
      this.userInfo['account'] = response.account
    } else {
      this.userInfo['account'] = this.getAccount()
    }
    this.userInfo['profile'] = profileInfo
  }

  /**
   * Logout
   * @param userInfo : Microsoft userInfo passed to logout
   * @param successCallback : callback function once user successfully logout to microsoft account
   */
   logout(userInfo: UserInfo, successCallback?: () => void, failedCallback?: () => void): void {
    const logOutRequest: EndSessionPopupRequest = {
      account: userInfo.account,
    }

    //pop up  logout popup, and call successCallback funciton

    this.myMSALObj.logoutPopup(logOutRequest).then(() => {
      successCallback && successCallback()
    }).catch((err) => {
      console.log(err)
      failedCallback && failedCallback()
    })
  }

  /**
   * Get Authenticated Client
   * Get authorised client from Access Token
   * @param accessToken accessToken received from microsoft login
   * @returns Client authorized client based on access token passed
   */
  getAuthenticatedClient(accessToken: string): Client {
    const client = Client.init({
      authProvider: (done: any) => {
        done(null, accessToken)
      },
    })
    return client
  }

  /**
   * Get UserProfile Info
   * Get userprofile info based on accesstoken having userPrincipalName
   * @param accessToken accessToken is string received from microsoft login response
   * @returns User
   */
  async getUserProfileInfo(accessToken: string): Promise<any> {
    const client = this.getAuthenticatedClient(accessToken)
    const user = await client
      .api('/me')
      .select('displayName,userPrincipalName')
      .get()

    return user
  }

  /**
   * GetAccount
   * Get all logged in accounts which is already in the session storage
   * @returns current active account information
   */
  public getAccount(): AccountInfo | undefined {
    const currentAccounts = this.myMSALObj.getAllAccounts()
    if (currentAccounts === null) {
      return undefined
    }

    //If session storage has multiple accounts, return current active account
    if (currentAccounts.length > 1) {
      return currentAccounts[0]
    } else if (currentAccounts.length === 1) {
      return currentAccounts[0]
    }
  }
  /**
   * AccessTokenを取得する
   * @returns AccessToken
   */
  public async getDpmAccessToken(): Promise<string> {
    const msalInstance = this.myMSALObj
    const activeAccount = msalInstance.getActiveAccount()
    const accounts = msalInstance.getAllAccounts()
    let account: any | undefined
    if (accounts.length > 0 && accounts[0]) {
      account = {
        ...accounts[0],
      }
    }
    const request: SilentRequest = {
      scopes: DPM_SCOPE.scopes,
      account: activeAccount || account || undefined,
    }
    const authResult = await msalInstance.acquireTokenSilent(request)
    return authResult.accessToken
  }
}
