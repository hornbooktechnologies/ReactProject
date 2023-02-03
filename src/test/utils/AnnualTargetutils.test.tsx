import React from "react";
import GetDonutChartSeriesAndValueForAnnualTarget, { getSelectedValue } from "../../utils/AnnualTargetutils";
import { AnnualTargetConstant, ChartColors, ChartGradientType, ChartType, DropDownConstant, DropDownOptions } from "../../utils/AppConstants";
import i18n from "../../translations/i18n";

describe("GetDonutChartSeriesAndValueForAnnualTarget", () => {
  const i18nCode = i18n;
  const customData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: "OPERATION_COST",
    chartGradientType: ChartGradientType.GREEN,
    gradientColor1: ChartColors._9FCD72,
    gradientColor2: ChartColors._66A428,
  };
  const seriesData = {
    title: undefined,
    ForecastCurrentYear: 23.02,
    PlannedCurrentYear: 24.32,
    prefix: "",
    suffix1: "",
    suffix2: "",
  };
  const GetDonutChartReturnValue = {
    ...customData,
    series1: {
      title: "Plan",
      seriesValue: 24.32 ,
      prefix: seriesData?.prefix ,
      suffix1: seriesData?.suffix1 ,
      suffix2: seriesData?.suffix2 ,
    },
    series2: {
      title: "Forecast",
      seriesValue: 23.02 ,
      prefix: seriesData?.prefix ,
      suffix1: seriesData?.suffix1 ,
      suffix2: seriesData?.suffix2 ,
    },
    value: getDonutChartValue(seriesData),
    plan: seriesData?.PlannedCurrentYear,
    forecast: seriesData?.ForecastCurrentYear,
  };

  function getDonutChartValue(seriesData: any) {
    return (
      (seriesData?.ForecastCurrentYear / seriesData?.PlannedCurrentYear) * 100
    );
  }

  it("GetDonutChartSeriesAndValueForAnnualTarget", () => {
    expect(
      GetDonutChartSeriesAndValueForAnnualTarget(
        i18nCode,
        customData,
        seriesData
      )
    ).toStrictEqual(GetDonutChartReturnValue);
  });
  it("getSelectedValue", () => {
    const selectValue = "AnnualView"
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
    expect(
      getSelectedValue(
        selectValue
      )
    ).toStrictEqual(optionValue);
  });


});
