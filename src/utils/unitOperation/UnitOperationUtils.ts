import { NegGrossmarginTableModel } from "../../models/unitOperation/NegOperationGrossmarginModel";
import { Kpi_005ApiRes } from "../../models/unitOperation/UnitOperationModel";
import { i18n } from 'i18next';
import { NegOperationTimeModel } from "../../models/unitOperation/NegOperationTimeModel";
import { AverageSpreadCardModel } from "../../models/unitOperation/NegOperationAvgSpreadModel.ts";
import { formatNumberToFractions } from "../utils";
import { NumberConstant } from "../AppConstants";
import { cssClassName } from "../CssConstants";

export const negOperationGrossmarginApiResponse = (kpiResponse:Kpi_005ApiRes):NegGrossmarginTableModel => {
  console.log("kpiResponse__DASOFNASDJKFASD",kpiResponse)
   const today = kpiResponse.Today.NegativeOperationGrossMargin;
   const previousDay = kpiResponse.PreviousDay.NegativeOperationGrossMargin;
  return {
      impactOnEBITDAAnnual :formatNumberToFractions(today.Annual.ImpactOnEBITDA,NumberConstant.TWO),
      previousImpactOnEBITDAAnnual :formatNumberToFractions(previousDay.Annual.ImpactOnEBITDA,NumberConstant.TWO),
      planAnnual : formatNumberToFractions(today.Annual.Plan,NumberConstant.TWO) ,
      previousPlanAnnual :formatNumberToFractions(previousDay.Annual.Plan,NumberConstant.TWO),
      actualOrForcastAnnual :formatNumberToFractions(today.Annual.ActualOrForcast,NumberConstant.TWO),
      previousActualOrForcastAnnual :formatNumberToFractions(previousDay.Annual.ActualOrForcast,NumberConstant.TWO),
      impactOnEBITDAPresent :formatNumberToFractions(today.YearStartToPresent.ImpactOnEBITDA,NumberConstant.TWO),
      previousImpactOnEBITDAPresent :formatNumberToFractions(previousDay.YearStartToPresent.ImpactOnEBITDA,NumberConstant.TWO),
      planPresent :formatNumberToFractions(today.YearStartToPresent.Plan,NumberConstant.TWO),
      previousPlanPresent :formatNumberToFractions(previousDay.YearStartToPresent.Plan,NumberConstant.TWO),
      actualOrForcastPresent :formatNumberToFractions(today.YearStartToPresent.ActualOrForcast,NumberConstant.TWO),
      previousActualOrForcastPresent :formatNumberToFractions(previousDay.YearStartToPresent.ActualOrForcast,NumberConstant.TWO),
      impactOnEBITDAEnd :formatNumberToFractions(today.PresentToYearEnd.ImpactOnEBITDA,NumberConstant.TWO),
      previousImpactOnEBITDAEnd :formatNumberToFractions(previousDay.PresentToYearEnd.ImpactOnEBITDA,NumberConstant.TWO),
      planEnd :formatNumberToFractions(today.PresentToYearEnd.Plan,NumberConstant.TWO),
      previousPlanEnd :formatNumberToFractions(previousDay.PresentToYearEnd.Plan,NumberConstant.TWO),
      actualOrForcastEnd :formatNumberToFractions(today.PresentToYearEnd.ActualOrForcast,NumberConstant.TWO),
      previousActualOrForcastEnd :formatNumberToFractions(previousDay.PresentToYearEnd.ActualOrForcast,NumberConstant.TWO),
      customClassEnd:cssClassName.TOOLTIP_BOTTOM,
      customClassTop:cssClassName.TOOLTIP_TOP_POSITION,
      prefix:today.Prefix,
      suffix:today.Suffix,
   }
}
export const negOperationTimeApiResponse = (i18n:i18n, kpiResponse:Kpi_005ApiRes):NegOperationTimeModel[] => {
   const today = kpiResponse.Today.NegativeOperationTime;
   const previousDay = kpiResponse.PreviousDay.NegativeOperationTime;
  return [
    {
      header: i18n.t("LABELS.ANNUAL"),
      suffix:today.Suffix,
      titleX:i18n.t('LABELS.PLAN'),
      titleY:i18n.t('LABELS.ACTUAL_FORECAST'),
      plan :today.Annual.Plan || NumberConstant.ZERO,
      actualOrForecast :today.Annual.ActualOrForcast || NumberConstant.ZERO,
      previousPlan :previousDay.Annual.Plan || NumberConstant.ZERO,
      previousActualOrForecast :previousDay.Annual.ActualOrForcast || NumberConstant.ZERO,
    },
    {
      header: i18n.t("LABELS.YEAR_START_TO_PRESENT"),
      suffix:today.Suffix,
      titleX:i18n.t('LABELS.PLAN'),
      titleY:i18n.t('LABELS.ACTUAL'),
      plan :today.YearStartToPresent.Plan || NumberConstant.ZERO,
      actualOrForecast :today.YearStartToPresent.ActualOrForcast || NumberConstant.ZERO,
      previousPlan :previousDay.YearStartToPresent.Plan || NumberConstant.ZERO,
      previousActualOrForecast :previousDay.YearStartToPresent.ActualOrForcast || NumberConstant.ZERO,
    },
    {
      header: i18n.t("LABELS.PRESENT_TO_YEAR_END"),
      suffix:today.Suffix,
      titleX:i18n.t('LABELS.PLAN'),
      titleY:i18n.t('LABELS.FORECAST'),
      plan :today.PresentToYearEnd.Plan || NumberConstant.ZERO,
      actualOrForecast :today.PresentToYearEnd.ActualOrForcast || NumberConstant.ZERO,
      previousPlan :previousDay.PresentToYearEnd.Plan || NumberConstant.ZERO,
      previousActualOrForecast :previousDay.PresentToYearEnd.ActualOrForcast || NumberConstant.ZERO,
    },
  ];
};

export const negOperationAvrgSpreadApiResponse = (i18n:i18n, kpiResponse:Kpi_005ApiRes):AverageSpreadCardModel[] => {
  const today = kpiResponse.Today.NegativeOperationAvgSpread;
  const previousDay = kpiResponse.PreviousDay.NegativeOperationAvgSpread;
  return [
    {
      title: i18n.t("LABELS.ANNUAL"),
      Suffix: today.Suffix,
      plan: {
        header: i18n.t("LABELS.PLAN"),
        value: formatNumberToFractions(today.Annual.Plan,NumberConstant.TWO),
        previousValue: formatNumberToFractions(previousDay.Annual.Plan,NumberConstant.TWO),
      },
      actual_forcast: {
        header: i18n.t("LABELS.ACTUAL_FORECAST"),
        value: formatNumberToFractions(today.Annual.ActualOrForcast,NumberConstant.TWO ),
        previousValue: formatNumberToFractions(previousDay.Annual.ActualOrForcast,NumberConstant.TWO ),
      },
    },
    {
      title: i18n.t("LABELS.YEAR_START_TO_PRESENT"),
      Suffix: today.Suffix,
      plan: {
        header: i18n.t("LABELS.PLAN"),
        value:formatNumberToFractions(today.YearStartToPresent.Plan,NumberConstant.TWO),
        previousValue:formatNumberToFractions(previousDay.YearStartToPresent.Plan,NumberConstant.TWO),
      },
      actual_forcast: {
        header: i18n.t("LABELS.ACTUAL_FORECAST"),
        value: formatNumberToFractions(today.YearStartToPresent.ActualOrForcast,NumberConstant.TWO),
        previousValue: formatNumberToFractions(previousDay.YearStartToPresent.ActualOrForcast,NumberConstant.TWO),
      },
    },
    {
      title: i18n.t("LABELS.PRESENT_TO_YEAR_END"),
      Suffix: today.Suffix,
      plan: {
        header: i18n.t("LABELS.PLAN"),
        value: formatNumberToFractions(today.PresentToYearEnd.Plan,NumberConstant.TWO ),
        previousValue: formatNumberToFractions(previousDay.PresentToYearEnd.Plan,NumberConstant.TWO)
      },
      actual_forcast: {
        header: i18n.t("LABELS.ACTUAL_FORECAST"),
        value: formatNumberToFractions(today.PresentToYearEnd.ActualOrForcast,NumberConstant.TWO),
        previousValue: formatNumberToFractions(previousDay.PresentToYearEnd.ActualOrForcast,NumberConstant.TWO),
      },
    },
  ];
};
