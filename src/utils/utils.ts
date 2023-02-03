import { i18n } from "i18next";
import { DateTime } from "luxon";
import moment from "moment";
import { DonutChartCustomData, DonutChartDataModel } from "../models/DonutChartDataModel";
import { DropDownData } from "../models/DropdownModel";
import { CommonApiMap } from "./apiUtils/ApiParamMap";
import { AppConstant, DateformatConstant, MathConstant, NumberConstant, OutageOutputConstant, TIMEZONE } from "./AppConstants";
import { cssClassName } from "./CssConstants";
import { localStorageUtils } from "./LocalStorageUtils";

export const GetDonutChartSeriesAndValueForCurrentStatus = (i18n: i18n, customData: DonutChartCustomData, seriesData: any): DonutChartDataModel => {
    return {
        ...customData,
        series1: {
            title: i18n.t("LABELS.PLAN"),
            seriesValue: seriesData?.Plan || 0,
            prefix: seriesData?.Prefix || '',
            suffix1: seriesData?.Suffix || '',
            suffix2: seriesData?.Suffix2 || '',
        },
        series2: {
            title: i18n.t("LABELS.FORECAST"),
            seriesValue: seriesData?.Forecast || 0,
            prefix: seriesData?.Prefix || '',
            suffix1: seriesData?.Suffix || '',
            suffix2: seriesData?.Suffix2 || '',
        },
        value: getDonutChartValue(seriesData),
        plan: seriesData?.Plan,
        forecast: seriesData?.Forecast,
    } as DonutChartDataModel;
}

function getDonutChartValue(seriesData: any) {
    return (seriesData?.Forecast / seriesData?.Plan) * 100;
}

export const getDateTimeEpoch = (datetime: string): number => {
  return new Date(datetime).getTime() + TIMEZONE.JPN_TIMEZONE
}

export const getFiscalYear = (): number => {
  if (new Date().getMonth() + 1 >= 1 && new Date().getMonth() + 1 <= 3) {
    return new Date().getFullYear() - 1
  } else {
    return new Date().getFullYear()
  }
}

export const getFiscalYearTimestamp = (fiscalYear: number): number => {
  return new Date(`${fiscalYear}${DateformatConstant.FISCAL_YEAR}`).getTime();
}

export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

export const getGeneratorDropdownData = (generatorList: any[]) => {
  return generatorList?.map((generator) => {
    return { 
      label: generator[CommonApiMap.generatorDisplayName],
      value: getFormattedUnitId(generator[CommonApiMap.powerPlantUnitId])
    } as DropDownData
  })
}

export const getFormattedUnitId = (unitId: string) => {
  return unitId?.slice(0,3);
}

export const formatNumberToFractions = (value: number|string |undefined|null, noOfDecimals: number) => {
  let noOfDecimalsVal = noOfDecimals ? noOfDecimals : 1
  if (!value || value === "undefined") {value = MathConstant.DEFAULT_FRACTION_STRING;}
  return parseFloat(value.toString())?.toFixed(noOfDecimalsVal);
}

export const getCutOffUnixEpochSeconds = (): number => {
  const unixTime = new Date().getTime();
  return Math.floor(unixTime / MathConstant._1000);
}

export const getCutoffFractionTime = (): number => {
  const unixTime = new Date().getTime();
  return Math.trunc(unixTime / MathConstant._1000);
}

export const getOtherUnits = (selectedUnit: string | null) => {
  const allUnits = (localStorageUtils.getSelectedPlantUserPreferance())?.generators;
  return allUnits?.filter(unit => getFormattedUnitId(unit[CommonApiMap.powerPlantUnitId]) !== selectedUnit);
}

export const getUnitNameById = (unitId: string) => {
  const allUnits = (localStorageUtils.getSelectedPlantUserPreferance())?.generators;
  const unit = allUnits && allUnits.find(x => x[CommonApiMap.powerPlantUnitId] === `${unitId}0`);
  return unit && unit[CommonApiMap.generatorDisplayName] || '' || undefined;
}

export const getCutoffTime = () => {
  return DateTime.fromMillis(getCutOffUnixEpochSeconds() * MathConstant._1000, {
    zone: TIMEZONE.ASIA_TOKYO,
  }).toFormat(DateformatConstant.CUTOFF_FORMAT);
}

export const formatDate = (date: string) => {
  return moment(date).format(DateformatConstant.YYYY_M_D_HH_MM);
}

export const getSelectedUnitID= () => {
  const selectedUserPreference = localStorageUtils.getSelectedPlantUserPreferance()
  const units = getGeneratorDropdownData(selectedUserPreference?.generators)
  const selectedUnitId = localStorageUtils.getSelectedUnitId() || getFormattedUnitId(units && units[0].value)
  return selectedUnitId;
}

export const generatorDropdownUnit =()=>{
  const selectedUserPreference = localStorageUtils.getSelectedPlantUserPreferance()
  return getGeneratorDropdownData(selectedUserPreference?.generators)
}

export const calculateDiff = (firstVal: number | string,secondVal:number | string) => {
  let diff  
  if (firstVal && secondVal) {
    diff = firstVal - secondVal
  }
  return diff.toFixed(NumberConstant.TWO)
}

export const prefixSign = (value: number|string,variation: string) => {
  let prefixSign  
 
    if(value === 0 || value < 0 || value === null) {
      prefixSign = ''
    }
    else if (value > 0 || variation === OutageOutputConstant.POSITIVE_VAL) {
      prefixSign = AppConstant.PLUS_SYMBOL
    }
    else if (variation === AppConstant.MINUS_SYMBOL) {
      prefixSign = AppConstant.MINUS_SYMBOL
    }
  
  return prefixSign 
}

export const IsappearTooltip = (value:boolean) => {
  let show  
  if(value === true){
    show = cssClassName.CUSTOM_TOOLTIP
  }
  else {
    show = ''
  }
  return show 
}

export const IstextHighlight = (value:boolean) => {
  let show  
  if(value === true){
    show = cssClassName.TEXT_HIGHLIGHT
  }
  else {
    show = ''
  }
  return show 
}

export const addCustomClass = (value:boolean,className:string|undefined) => {
  let customClass  
  if(value === true){
    customClass = className + cssClassName.TOOLTIP_CUSTOM
  }
  else {
    customClass = ''
  }
  return customClass 
}

export const setTooltipPosition = (className:string|undefined) => {
  let addClass  
  if(className !== cssClassName.TOOLTIP_BOTTOM){
    addClass = cssClassName.TOOLTIP_TOP
  }
  else {
    addClass = ''
  }
  return addClass 
}

export const getDiffOfValues = (ValueA:number|string|null,ValueB:number|string|null) => {
  let diffOfValues 
  if( ValueA && ValueB ) {
    diffOfValues = ValueA !== ValueB
  }
   return diffOfValues
}