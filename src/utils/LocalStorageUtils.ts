import { UserInfo } from '../data/types/UserInfo'
import { UserSetting } from '../data/types/UserSetting'
import { CommonApiMap } from './apiUtils/ApiParamMap'
import { AppConstant, AuthConstant } from './AppConstants'
import { getFormattedUnitId } from './utils'

export const localStorageUtils = {
  setUserSetting: (SelectedPlant: UserSetting, SelectedUnit: UserSetting) => {
    const userSetting = {
      SelectedPlant,
      SelectedUnit,
    }
    localStorage.setItem(AuthConstant.USER_SETTING, JSON.stringify(userSetting))
  },
  getUserSetting: () => {
    const userSettingStr: string | null = localStorage.getItem(
      AuthConstant.USER_SETTING
    )

    let userSetting: UserSetting | null
    if (userSettingStr) {
      userSetting = JSON.parse(userSettingStr)
    } else {
      userSetting = null
    }
    return userSetting
  },
  setUserInfo: (userInfo: UserInfo | undefined) => {
    localStorage.setItem(AuthConstant.USER_INFO, JSON.stringify(userInfo))
  },
  getUserInfo: () => {
    const userInfoStr: string | null = localStorage.getItem(
      AuthConstant.USER_INFO
    )
    let userInfo: UserInfo | undefined
    if (userInfoStr) {
      userInfo = JSON.parse(userInfoStr)
    } else {
      userInfo = undefined
    }
    return userInfo
  },
  setTokenInfo: (accessToken: string) => {
    localStorage.setItem(AuthConstant.ACCESS_TOKEN, accessToken)
  },
  getToken: () => {
    const token = localStorage.getItem(AuthConstant.ACCESS_TOKEN)
    return token
  },
  setIsLoggedIn: (isLoggedIn : boolean) => {
    localStorage.setItem(AuthConstant.IS_LOGGED_IN, String(isLoggedIn))
  },
  getIsLoggedIn: () => {
    const isLoggedInStr: string | null = localStorage.getItem(
      AuthConstant.IS_LOGGED_IN
    )
    if(localStorage.getItem(AuthConstant.USER_INFO) !== null && localStorage.getItem(AuthConstant.USER_PREFERENCE) !== null){
      return isLoggedInStr === 'true';  
    }else{
      return false;  
    }
    
  },
  clearStorage: () => {
    localStorage.clear();
  },
  setUserPreferences: (userPreferance : any) => {
    localStorage.setItem(AuthConstant.USER_PREFERENCE, userPreferance);
  },
  getUserPreferences: () => {
    const userPreferenceStr: string | null = localStorage.getItem(AuthConstant.USER_PREFERENCE)
    let userPreferences: any
    if (userPreferenceStr) {
      userPreferences = JSON.parse(userPreferenceStr)
    } else {
      userPreferences = null
    }
    return userPreferences
  },
  setSelectedPlantUserPreferance: (initialuserPreference : any) => {
    sessionStorage.setItem(AuthConstant.SELECTED_USER_PREFERENCE, initialuserPreference);
  },
  getSelectedPlantUserPreferance: () => {
    const initialuserPreferenceStr: string | null = sessionStorage.getItem(AuthConstant.SELECTED_USER_PREFERENCE)
    let initialuserPreferences: any
    if (initialuserPreferenceStr) {
      initialuserPreferences = JSON.parse(initialuserPreferenceStr)
    } else {
      initialuserPreferences = null
    }
    return initialuserPreferences
  },
  setSelectedUnit: (selectedUnit : string) => {
    sessionStorage.setItem(AppConstant.SELECTED_UNIT, selectedUnit)
  },
  getSelectedUnit: () => {
    const selectedUnit : string | null = sessionStorage.getItem(AppConstant.SELECTED_UNIT)
    return selectedUnit
  },
  setNaviIndex: (index : number) => {
    sessionStorage.setItem(AppConstant.SELECTED_NAV_INDEX, index.toString())
  },
  getNaviIndex: () => {
    const selectedNavIndex : string | null = sessionStorage.getItem(AppConstant.SELECTED_NAV_INDEX)
    return selectedNavIndex
  },
  setSelectedPlantUnitId: (selectedPlantId : string) => {
    sessionStorage.setItem(AppConstant.SELECTED_UNIT_ID, selectedPlantId)
  },
  getSelectedPlantUnitId: () => {
    const selectedPlantId : string | null = sessionStorage.getItem(AppConstant.SELECTED_UNIT_ID)
    return selectedPlantId
  },
  getSelectedUnitId: () => {
    const selectedUnit = sessionStorage.getItem(AppConstant.SELECTED_UNIT);
    const userPreferences = localStorageUtils.getSelectedPlantUserPreferance();
    let selectedUnitId: string = '';
    if (userPreferences && selectedUnit !== AppConstant.OVERVIEW) {
      let selectedUnitObj = userPreferences.generators.find(x => x[CommonApiMap.generatorNameForKpiApi] === selectedUnit);
      if (selectedUnitObj) selectedUnitId = selectedUnitObj[CommonApiMap.powerPlantUnitId];
    }
    return getFormattedUnitId(selectedUnitId); 
  }
}
