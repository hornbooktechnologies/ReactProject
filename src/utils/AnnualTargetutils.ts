import { i18n } from "i18next";
import {
  DonutChartCustomData,
  DonutChartDataModel,
} from "../models/DonutChartDataModel";
import { DropDownConstant, DropDownOptions } from "./AppConstants";

const GetDonutChartSeriesAndValueForAnnualTarget = (
  i18n: i18n,
  customData: DonutChartCustomData,
  seriesData: any
): DonutChartDataModel => {
  return {
    ...customData,
    series1: {
      title: i18n?.t("LABELS.PLAN"),
      seriesValue: seriesData?.PlannedCurrentYear || "",
      prefix: seriesData?.Annual?.Prefix || "",
      suffix1: seriesData?.Annual?.Suffix || "",
      suffix2: seriesData?.Annual?.Suffix2 || "",
    },
    series2: {
      title: i18n?.t("LABELS.FORECAST"),
      seriesValue: seriesData?.ForecastCurrentYear || "",
      prefix: seriesData?.Annual?.Prefix || "",
      suffix1: seriesData?.Annual?.Suffix || "",
      suffix2: seriesData?.Annual?.Suffix2 || "",
    },
    value: getDonutChartValue(seriesData),
    plan: seriesData?.PlannedCurrentYear,
    forecast: seriesData?.ForecastCurrentYear,
  } as DonutChartDataModel;
};

function getDonutChartValue(seriesData: any) {
  return (
    (      seriesData?.ForecastCurrentYear / seriesData?.PlannedCurrentYear) * 100
  );
}
export default GetDonutChartSeriesAndValueForAnnualTarget;

export const getSelectedValue= (selectValue: string) => {
  let optionValue  = DropDownOptions.ANNUAL_VIEW
  if (selectValue === DropDownConstant.ANNUAL_DATA)
  optionValue = DropDownOptions.ANNUAL_VIEW
  else if(selectValue === DropDownConstant.MONTHLY_DATA){
    optionValue = DropDownOptions.MONTHLY
  }
  else if(selectValue === DropDownConstant.WEEKLY_DATA){
    optionValue = DropDownOptions.WEEKLY
  }
  else if(selectValue === DropDownConstant.DAILY_DATA){
    optionValue = DropDownOptions.DAILY
  }
  else if(selectValue === DropDownConstant.CUMULATIVE_DATA){
    optionValue = DropDownOptions.CUMULATIVE
  }
 return optionValue;
}