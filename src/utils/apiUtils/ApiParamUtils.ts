import { localStorageUtils } from '../LocalStorageUtils'
import { UserPrefModelConstant, AppConstant } from '../AppConstants'

export const ApiParamUtils = {
  plantId: () => {
    let userPreferance = localStorageUtils.getSelectedPlantUserPreferance();
    return (userPreferance && userPreferance[UserPrefModelConstant.POWER_PLANT_ID]);
  },

  unitCode: () => {
    let selectedUnitCode = '';
    let userPreference = localStorageUtils.getSelectedPlantUserPreferance()
    let selectedUnit = localStorageUtils.getSelectedUnit()
    if (selectedUnit !== AppConstant.OVERVIEW) {
      const selectedUnitObj = userPreference[UserPrefModelConstant.GENERATORS].find((unit) => unit[UserPrefModelConstant.GENERATOR_NAME_FOR_KPI_API] === selectedUnit);
      selectedUnitCode = `${userPreference[UserPrefModelConstant.POWER_PLANT_ID]}_${selectedUnitObj[UserPrefModelConstant.POWER_PLANT_UNIT_ID]}`;
    }
    return selectedUnitCode;
  },

  plantUrl: () => {
    let plantUrl = ''
    let userPreferance = localStorageUtils.getSelectedPlantUserPreferance()
    let selectedUnitId = localStorageUtils.getSelectedPlantUnitId()
    let selectedUnit = localStorageUtils.getSelectedUnit()
    let unitIdArray: string[] = []
    userPreferance &&
      userPreferance[UserPrefModelConstant.GENERATORS].map((unitId: string) => {
        return unitIdArray.push(unitId[UserPrefModelConstant.POWER_PLANT_UNIT_ID].slice(0, 3))
      })
    if (selectedUnit === AppConstant.OVERVIEW) {
      unitIdArray.map((item, index) => {
        if (index === 0) {
         return plantUrl = UserPrefModelConstant.POWER_PLANT_UNIT_ID_URL + item
        } else {
         return plantUrl = plantUrl + UserPrefModelConstant.AND_POWER_PLANT_UNIT_ID_URL + item
        }
      })
    } else {
      plantUrl = UserPrefModelConstant.POWER_PLANT_UNIT_ID_URL + selectedUnitId
    }
    return plantUrl;
  },

  unitName: () => {
    return localStorageUtils.getSelectedUnit();
  },

  plantName: () => {
    let userPreferance = localStorageUtils.getSelectedPlantUserPreferance();
    return (userPreferance && userPreferance[UserPrefModelConstant.POWER_PLANT_NAME_FOR_KPI_API]);
  },
}
