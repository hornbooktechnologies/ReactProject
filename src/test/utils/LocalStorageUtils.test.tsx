import { localStorageUtils } from '../../utils/LocalStorageUtils'

describe('Component: localStorageUtils', () => {
  it('localStorageUtils_getUserSetting', () => {
    return expect(localStorageUtils.getUserSetting()).toStrictEqual(
      localStorageUtils.getUserSetting()
    )
  })
  it('localStorageUtils_getUserInfo', () => {
    return expect(localStorageUtils.getUserInfo()).toStrictEqual(
      localStorageUtils.getUserInfo()
    )
  })
  it('localStorageUtils_getToken', () => {
    return expect(localStorageUtils.getToken()).toStrictEqual(
      localStorageUtils.getToken()
    )
  })
  it('localStorageUtils_getIsLoggedIn', () => {
    return expect(localStorageUtils.getIsLoggedIn()).toStrictEqual(
      localStorageUtils.getIsLoggedIn()
    )
  })
  it('localStorageUtils_getUserPreferences', () => {
    return expect(localStorageUtils.getUserPreferences()).toStrictEqual(
      localStorageUtils.getUserPreferences()
    )
  })
  it('localStorageUtils_getSelectedPlantUserPreferance', () => {
    return expect(localStorageUtils.getSelectedPlantUserPreferance()).toStrictEqual(
      localStorageUtils.getSelectedPlantUserPreferance()
    )
  })
  it('localStorageUtils_getSelectedUnit', () => {
    return expect(localStorageUtils.getSelectedUnit()).toStrictEqual(
      localStorageUtils.getSelectedUnit()
    )
  })
  it('localStorageUtils_getNaviIndex', () => {
    return expect(localStorageUtils.getNaviIndex()).toStrictEqual(
      localStorageUtils.getNaviIndex()
    )
  })
  it('localStorageUtils_getSelectedPlantUnitId', () => {
    return expect(localStorageUtils.getSelectedPlantUnitId()).toStrictEqual(
      localStorageUtils.getSelectedPlantUnitId()
    )
  })
  it('localStorageUtils_getSelectedUnitId', () => {
    return expect(localStorageUtils.getSelectedUnitId()).toStrictEqual(
      localStorageUtils.getSelectedUnitId()
    )
  })
})
