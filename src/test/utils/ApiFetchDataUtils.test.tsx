import React from "react";
import { ApiParamUtils } from "../../utils/apiUtils/ApiParamUtils";
import { localStorageUtils } from "../../utils/LocalStorageUtils";
import { UserPrefModelConstant, AppConstant } from "../../utils/AppConstants";

describe("ApiParamUtils", () => {
  let userPreferance = localStorageUtils.getSelectedPlantUserPreferance();
  const palntId =
    userPreferance && userPreferance[UserPrefModelConstant.POWER_PLANT_ID];
  let plantUrl = "";
  let selectedUnitId = localStorageUtils.getSelectedPlantUnitId();
  let selectedUnit = localStorageUtils.getSelectedUnit();
  let unitIdArray: string[] = [];
  userPreferance &&
    userPreferance[UserPrefModelConstant.GENERATORS].map((unitId: string) => {
      unitIdArray.push(
        unitId[UserPrefModelConstant.POWER_PLANT_UNIT_ID].slice(0, 3)
      );
    });
  if (selectedUnit === AppConstant.OVERVIEW) {
    unitIdArray.map((item, index) => {
      if (index === 0) {
        plantUrl = UserPrefModelConstant.POWER_PLANT_UNIT_ID_URL + item;
      } else {
        plantUrl =
          plantUrl + UserPrefModelConstant.AND_POWER_PLANT_UNIT_ID_URL + item;
      }
    });
  } else {
    plantUrl = UserPrefModelConstant.POWER_PLANT_UNIT_ID_URL + selectedUnitId;
  }
  const plantName =
    userPreferance &&
    userPreferance[UserPrefModelConstant.POWER_PLANT_NAME_FOR_KPI_API];
  it("Plant Id", () => {
    expect(ApiParamUtils.plantId()).toBe(palntId);
  });

  it("Plant URL", () => {
    expect(ApiParamUtils.plantUrl()).toBe(plantUrl);
  });

  it("unitName", () => {
    expect(ApiParamUtils.unitName()).toBe(selectedUnit);
  });

  it("plantName", () => {
    expect(ApiParamUtils.plantName()).toBe(plantName);
  });
});
