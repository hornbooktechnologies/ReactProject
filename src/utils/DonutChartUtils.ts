import { i18n } from 'i18next';
import { DonutChartCustomData, DonutChartSeriesValWithDiffModel } from "../models/DonutChartDataModel";
import { NegOperationTimeModel } from '../models/unitOperation/NegOperationTimeModel';
import { ChartColors, ChartGradientType, ChartType } from "./AppConstants";

export const getChartFillValue = (value: number, plan: number, forecast: number) =>{
    const fillValue = value === Infinity ? 0 : value;
    return ((forecast > plan) ? 100 : fillValue);
}

export const getRatioChangePct = (plan: number, forecast: number) => {
  let changePercent = 0;
  changePercent = 100 + (((forecast - plan) / plan) * 100);
  return changePercent === Infinity
  ? 100
  : isNaN(changePercent)
  ? 0
  : parseFloat(changePercent.toFixed(2));
}

export const isPositiveRatio = (chartType: string, plan: number, forecast: number) => {
    const changePercent = getRatioChangePct(plan, forecast);
    let isPositive = false;
    isPositive = (changePercent >= 100) ? true : false;
    if (ChartType.COST === chartType)
    isPositive = (changePercent >= 100) ? false : true;
    return isPositive;
}
export const GetDonutChartSeriesValWithDiff = (i18n: i18n, customData: DonutChartCustomData, seriesData: NegOperationTimeModel): DonutChartSeriesValWithDiffModel => {
  return {
        ...customData,
        header: i18n.t(seriesData?.header),
        operatingTime: true,
        series1: {
            title: seriesData?.titleX,
            seriesValue: seriesData?.plan|| 0,
            seriesPreviousValue: seriesData?.previousPlan || 0,
            suffix1: seriesData?.suffix,
          },
          series2: {
            title: seriesData?.titleY,
            seriesValue: seriesData?.actualOrForecast|| 0,
            seriesPreviousValue: seriesData?.previousActualOrForecast || 0,
            suffix1: seriesData?.suffix,
          },
        value: getDonutchartRatio(seriesData?.plan,seriesData?.actualOrForecast),
        plan: seriesData?.plan,
        forecast: seriesData?.actualOrForecast,
    } 
}
export const getDonutchartRatio = (valueX:number,valueY:number) => {
    return (valueY / valueX) * 100;
  }
export const GetStrongRedDonutchart = () => {
    return   {  
    chartGradientType: ChartGradientType.STRONG_RED,
    gradientColor1: ChartColors._E88000,
    gradientColor2: ChartColors._D82531,
    type:ChartType.LARGE,
    color: ChartColors._D82531,
} as DonutChartCustomData
  }
  
