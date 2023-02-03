import { Configuration, LogLevel } from '@azure/msal-browser'

const AzureClientId: string | any = process.env.REACT_APP_AZURE_CLIENT_ID
const AzureTenantId: string | undefined = process.env.REACT_APP_AZURE_TENANT_ID
const loginRedirectUri: string | undefined = process.env.REACT_APP_AZURE_REDIRECT_URI
const AzureScope: string = process.env.REACT_APP_AZURE_SCOPE || ''

export const MSAL_CONFIG: Configuration = {
  auth: {
    clientId: AzureClientId,
    authority: `https://login.microsoftonline.com/${AzureTenantId}/`,
    redirectUri: loginRedirectUri,
    postLogoutRedirectUri: loginRedirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: number,
        message: string,
        containsPii: any
      ): void => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
        }
      },
    },
  },
}

interface DpmScope {
  scopes: Array<string>
}
export const DPM_SCOPE: DpmScope = {
  scopes: [AzureScope],
}
