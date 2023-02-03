import { i18n } from 'i18next';
import {
  DonutChartOolModel
} from '../../models/DonutChartDataModel';
import { PlannedList, PlannedListApiSpec, PlannedOutage } from '../../models/outageOutputLimit';
import { SalesOutageCardModel, ImpactofOutageApiModel } from '../../models/outageOutputLimit/SalesOutageModel';
import { KpiApiRes } from '../../models/outageOutputLimit/StoppageDataModel';
import { TimeLineChartsList } from '../../models/outageOutputLimit/TimelineChartModel';
import { timeOutageDataModel } from '../../models/outageOutputLimit/TimeOfOutageModel';
import { CommonApiMap, StoppageApiMap } from '../apiUtils/ApiParamMap';
import { ChartColors, ChartConstant, ChartGradientType, DateformatConstant, NumberConstant, OutageOutputConstant, ValueOfConstant } from "../AppConstants";
import { localStorageUtils } from '../LocalStorageUtils';
import { formatNumberToFractions, getCutoffTime, getDateTimeEpoch, getFormattedUnitId, getUnitNameById, groupBy } from '../utils';
import { calculateDiff } from '../utils';
export const GetDonutChartValue = (
  plan: number,
  forecast: number,
  planpreviousHrs: number,
  forecastPreviousHrs: number,
  suffix:string,
  actual: boolean,
  middleRatio?: boolean
) => {
   return {
    planHrs: plan,
    forecastHrs: forecast,
    planpreviousHrs: planpreviousHrs,
    forecastpreviousHrs: forecastPreviousHrs,
    actual:actual,
    middleRatio:middleRatio,
    suffix:suffix,
    chartGradientType: ChartGradientType.BLUE,
    gradientColor1: ChartColors._54AFDE,
    gradientColor2: ChartColors._007CBB,
    value: getDonutChartRatioValue(plan,forecast),
  } as DonutChartOolModel
 }

export const GetStartEndTimeOutageValue = (
  className: string,
  iconClassName: string,
  planTitle: string,
  planVal: number | string,
  planpreviousVal:number,
  subject: number,
  suffix: string,
  variation: string
) => {
   return {
    className: className,
    iconClassName: iconClassName,
    planTitle: planTitle,
    planVal: planVal,
    planpreviousVal:planpreviousVal,
    subject:subject,
    suffix:suffix,
    variation: variation,
  } 
 }
export const GetAnnualTimeOutageValue = (
  impactPreviousVal: number|string,
  impactVal: number|string,
  suffix: string,
  variation: string,
) => {
   return {
    impactPreviousVal: impactPreviousVal,
    impactVal: impactVal,
    suffix: suffix,
    variation: variation,
  } 
 }

function getDonutChartRatioValue(plan: number|any , forecast: number|any) {
  return ((forecast / plan) * 100) 
}

export const makeUnitStoppageData = (plans: PlannedList) => {
  const plansGroupedByPowerPlantUnit = groupBy(plans, CommonApiMap.powerPlantUnitId);
  const data: any[] = [];
  Object.keys(plansGroupedByPowerPlantUnit).forEach((unitId) => {
    const stoppageData = plansGroupedByPowerPlantUnit[unitId];
    data.push(
      stoppageData.map((s) => {
        return {
          [StoppageApiMap.fiscallyPlannedEndDateTime]: s[StoppageApiMap.fiscallyPlannedEndDateTime],
          [StoppageApiMap.fiscallyPlannedStartDateTime]: s[StoppageApiMap.fiscallyPlannedStartDateTime],
          [StoppageApiMap.scheduledStartDateTime]: s[StoppageApiMap.scheduledStartDateTime],
          [StoppageApiMap.scheduledEndDateTime]: s[StoppageApiMap.scheduledEndDateTime],
          [StoppageApiMap.actualStartDateTime]: s[StoppageApiMap.actualStartDateTime],
          [StoppageApiMap.actualEndDateTime]: s[StoppageApiMap.actualEndDateTime],
          planName: s.name,
          unitName: getFormattedUnitId(unitId),
          cancelled: s.cancelled,
        }
      })
    );
  })
  return data.flat();
}

/**
 * U' stands for Unplanned Outage and 'P' stands for Planned Outage
 */
 export const getPlannedList = (i18n: i18n, selectedUnit: string, fiscalYear: number, stoppageData: PlannedList) => {
   console.log("console_stoppageData", stoppageData)
  const fiscalYearStart = `${fiscalYear}${DateformatConstant.FISCAL_YEAR}`;
  const fiscalYearEnd = `${fiscalYear + 1}${DateformatConstant.FISCAL_YEAR}`;
  const cutOff = getCutoffTime();

  let plannedData = stoppageData.filter(x => getFormattedUnitId(x[CommonApiMap.powerPlantUnitId]) === selectedUnit);
  const ret: TimeLineChartsList = defaultPlannedList(i18n);
  plannedData.forEach((plannedNode: PlannedOutage) => {
    if (plannedNode.cancelled) return;
    const fiscallyPlannedStartDateTime = plannedNode[StoppageApiMap.fiscallyPlannedStartDateTime]!;
    const fiscallyPlannedEndDateTime = plannedNode[StoppageApiMap.fiscallyPlannedEndDateTime]!;
    const scheduledStartDateTime = plannedNode[StoppageApiMap.scheduledStartDateTime]!;
    const scheduledEndDateTime = plannedNode[StoppageApiMap.scheduledEndDateTime]!;
    const actualStartDateTime = plannedNode[StoppageApiMap.actualStartDateTime]!;
    const actualEndDateTime = plannedNode[StoppageApiMap.actualEndDateTime]!;

    const isScheduledInFiscalYear = scheduledStartDateTime < fiscalYearEnd && scheduledEndDateTime > fiscalYearStart;

    if (
      fiscallyPlannedStartDateTime !== null &&
      fiscallyPlannedStartDateTime < fiscalYearEnd &&
      fiscallyPlannedEndDateTime !== null &&
      fiscallyPlannedEndDateTime > fiscalYearStart &&
      plannedNode[StoppageApiMap.coarseStoppageType] !== OutageOutputConstant.CoarseStoppageType.Unplanned
    ) {
      ret.push({
        name: plannedNode.name || '',
        data: [
          {
            x: i18n.t('OUTAGE_AND_OUTPUT_LIMIT.PLAN'),
            y: [
              getDateTimeEpoch(fiscallyPlannedStartDateTime),
              getDateTimeEpoch(fiscallyPlannedEndDateTime),
            ],
            fillColor: ChartConstant.FORECAST_LINE_STROKE,
          },
        ],
      })
    }

    if (
      isScheduledInFiscalYear &&
      (!(
        actualStartDateTime !== null &&
        actualEndDateTime !== null &&
        actualStartDateTime <= actualEndDateTime
      ) ||
        !(
          actualStartDateTime <= cutOff &&
          actualEndDateTime <= cutOff
        ))
    ) {
      ret.push({
        name: plannedNode.name || '',
        data: [
          {
            x: i18n.t('OUTAGE_AND_OUTPUT_LIMIT.ACTUAL_AND_FORECAST'),
            y: [
              getDateTimeEpoch(scheduledStartDateTime),
              getDateTimeEpoch(scheduledEndDateTime),
            ],
            fillColor: ChartConstant.FORECAST_LINE_STROKE,
          },
        ],
      })
    }

    if (
      actualStartDateTime !== null &&
      actualEndDateTime !== null &&
      actualStartDateTime <= actualEndDateTime &&
      actualStartDateTime < fiscalYearEnd &&
      actualEndDateTime > fiscalYearStart &&
      actualStartDateTime <= cutOff &&
      actualEndDateTime <= cutOff
    ) {
      ret.push({
        name: plannedNode.name || '',
        data: [
          {
            x: i18n.t('OUTAGE_AND_OUTPUT_LIMIT.ACTUAL_AND_FORECAST'),
            y: [
              getDateTimeEpoch(actualStartDateTime),
              getDateTimeEpoch(actualEndDateTime),
            ],
            fillColor: ChartConstant.ACTUAL_LINE_STROKE,
          },
        ],
      })
    }
  })
  return ret;
}

/**
 * U' stands for Unplanned Outage and 'P' stands for Planned Outage
 */
export const getUnitPlannedList = (i18n: i18n, selectedUnit: string, fiscalYear: number, stoppageData: PlannedList) => {
 
  const fiscalYearStart = `${fiscalYear}${DateformatConstant.FISCAL_YEAR}`;
  const fiscalYearEnd = `${fiscalYear + 1}${DateformatConstant.FISCAL_YEAR}`;
  const cutOff = getCutoffTime();

  let plannedData = stoppageData.filter(x => getFormattedUnitId(x[CommonApiMap.powerPlantUnitId]) !== selectedUnit);
  let data = makeUnitStoppageData(plannedData);
  const ret: TimeLineChartsList = defaultOtherUnitPlannedList(selectedUnit);
  data.forEach((plannedNode: any) => {
    if (plannedNode.cancelled) return;
    const scheduledStartDateTime = plannedNode[StoppageApiMap.scheduledStartDateTime];
    const scheduledEndDateTime = plannedNode[StoppageApiMap.scheduledEndDateTime];
    const actualStartDateTime = plannedNode[StoppageApiMap.actualStartDateTime];
    const actualEndDateTime = plannedNode[StoppageApiMap.actualEndDateTime];

    const isScheduledInFiscalYear = scheduledStartDateTime < fiscalYearEnd && scheduledEndDateTime > fiscalYearStart;
    
    if (  
      isScheduledInFiscalYear &&
      (!(
        actualStartDateTime !== null &&
        actualEndDateTime !== null &&
        actualStartDateTime <= actualEndDateTime
      ) ||
        !(
          actualStartDateTime <= cutOff &&
          actualEndDateTime <= cutOff
        ))
    ) {
      ret.push({
        name: plannedNode.planName || '',
        data: [
          {
            x: getUnitNameById(plannedNode.unitName) || '',
            y: [
              getDateTimeEpoch(scheduledStartDateTime),
              getDateTimeEpoch(scheduledEndDateTime)
            ],
            fillColor: ChartConstant.FORECAST_LINE_STROKE,
          },
        ],
      })
    }
    if (
      actualStartDateTime !== null &&
      actualEndDateTime !== null &&
      actualStartDateTime <= actualEndDateTime &&
      actualStartDateTime < fiscalYearEnd &&
      actualEndDateTime > fiscalYearStart &&
      actualStartDateTime <= cutOff &&
      actualEndDateTime <= cutOff
    ) {
      ret.push({
        name: plannedNode.name || '',
        data: [
          {
            x: getUnitNameById(plannedNode.unitName) || '',
            y: [
              getDateTimeEpoch(actualStartDateTime),
              getDateTimeEpoch(actualEndDateTime)
            ],
            fillColor: ChartConstant.ACTUAL_LINE_STROKE,
          },
        ],
      })
    }      
  })

  return ret;
}

export const defaultPlannedList = (i18n: i18n): TimeLineChartsList => {
  const ret: TimeLineChartsList = []
  ret.push({
    name: i18n.t('OUTAGE_AND_OUTPUT_LIMIT.PLAN'),
    data: [
      {
        x: i18n.t('OUTAGE_AND_OUTPUT_LIMIT.PLAN'),
        y: [0, 0],
        fillColor: ChartConstant.FORECAST_LINE_STROKE,
      },
    ],
  })
  ret.push({
    name: i18n.t('OUTAGE_AND_OUTPUT_LIMIT.ACTUAL_AND_FORECAST'),
    data: [
      {
        x: i18n.t('OUTAGE_AND_OUTPUT_LIMIT.ACTUAL_AND_FORECAST'),
        y: [0, 0],
        fillColor: ChartConstant.FORECAST_LINE_STROKE,
      },
    ],
  })

  return ret
}

export const defaultOtherUnitPlannedList = (selectedUnit: string): TimeLineChartsList => {
  const allUnits = (localStorageUtils.getSelectedPlantUserPreferance())?.generators;
  const defaultRet: TimeLineChartsList = []
  allUnits?.forEach(unit => {
    if (getFormattedUnitId(unit[CommonApiMap.powerPlantUnitId]) !== selectedUnit) {
      defaultRet.push({
        name: '',
        data: [
          {
            x: getUnitNameById(getFormattedUnitId(unit[CommonApiMap.powerPlantUnitId])),
            y: [0, 0],
            fillColor: ChartConstant.PLANNED_LINE_STROKE,
          },
        ],
      })
    }
  })
  return defaultRet
}

export const mapOutageApiResponse = (outageOutputResponse: PlannedListApiSpec) => {
  return outageOutputResponse.map((response) => {
    return {
      'power-plant-id': response.PlantCode,
      'power-plant-unit-id': response.UnitCode,
      'fiscally-planned-start-datetime': response.PlanStart,
      'fiscally-planned-end-datetime': response.PlanEnd,
      'scheduled-start-datetime': response.ForecastStart,
      'scheduled-end-datetime': response.ForecastEnd,
      'actual-start-datetime': response.ActualStart,
      'actual-end-datetime': response.ActualEnd,
      name: response.Name,
    } as PlannedOutage
  })
}

export const mapSellingPriceAtOutageApiResponse = (i18n: i18n, salesPriceData: KpiApiRes): SalesOutageCardModel[] => {
  const today = salesPriceData.Today.SellingPriceAtOutage;
  const previousDay = salesPriceData.PreviousDay.SellingPriceAtOutage
  return [
    {
      header: i18n.t("LABELS.ANNUAL"),
      plannedActual:formatNumberToFractions(today.Annual.PlannedActualOrForcastAvgPrice,NumberConstant.ONE) ,
      plannedPlan:formatNumberToFractions(today.Annual.PlannedPlanAvgPrice,NumberConstant.ONE) ,
      unplannedActual:formatNumberToFractions(today.Annual.UnplannedAvgPrice,NumberConstant.ONE),
      plannedPreviousActual:formatNumberToFractions(previousDay.Annual.PlannedActualOrForcastAvgPrice,NumberConstant.ONE) ,
      plannedPreviousPlan:formatNumberToFractions(previousDay.Annual.PlannedPlanAvgPrice,NumberConstant.ONE) ,
      unplannedPreviousActual:formatNumberToFractions(previousDay.Annual.UnplannedAvgPrice,NumberConstant.ONE),
    },
    {
      header: i18n.t("LABELS.YEAR_START_TO_PRESENT"),
      plannedActual:formatNumberToFractions(today.YearStartToPresent.PlannedActualOrForcastAvgPrice,NumberConstant.ONE),
      plannedPlan:formatNumberToFractions(today.YearStartToPresent.PlannedPlanAvgPrice,NumberConstant.ONE),
      unplannedActual:formatNumberToFractions(today.YearStartToPresent.UnplannedAvgPrice,NumberConstant.ONE),
      plannedPreviousActual:formatNumberToFractions(previousDay.YearStartToPresent.PlannedActualOrForcastAvgPrice,NumberConstant.ONE),
      plannedPreviousPlan:formatNumberToFractions(previousDay.YearStartToPresent.PlannedPlanAvgPrice,NumberConstant.ONE),
      unplannedPreviousActual:formatNumberToFractions(previousDay.YearStartToPresent.UnplannedAvgPrice,NumberConstant.ONE),
      plannedActualSubValue: today.YearStartToPresent.PlannedActualOrForcastRecords || ValueOfConstant.VALUE_0,
      unplannedActualSubValue:today.YearStartToPresent.UnplannedRecords || ValueOfConstant.VALUE_0,
      plannedPlanSubValue:today.YearStartToPresent.PlannedPlanRecords || ValueOfConstant.VALUE_0,
    },
    {
      header: i18n.t("LABELS.PRESENT_TO_YEAR_END"),
      plannedActual:formatNumberToFractions(today.PresentToYearEnd.PlannedActualOrForcastAvgPrice,NumberConstant.ONE),
      plannedPlan:formatNumberToFractions( today.PresentToYearEnd.PlannedPlanAvgPrice,NumberConstant.ONE),
      plannedPreviousActual:formatNumberToFractions(previousDay.PresentToYearEnd.PlannedActualOrForcastAvgPrice,NumberConstant.ONE),
      plannedPreviousPlan:formatNumberToFractions(previousDay.PresentToYearEnd.PlannedPlanAvgPrice,NumberConstant.ONE),
      unplannedActual:formatNumberToFractions(today.PresentToYearEnd.UnplannedAvgPrice,NumberConstant.ONE),
      unplannedPreviousActual:formatNumberToFractions(previousDay.PresentToYearEnd.UnplannedAvgPrice,NumberConstant.ONE),
      plannedActualSubValue: today.PresentToYearEnd.PlannedActualOrForcastRecords || ValueOfConstant.VALUE_0,
      unplannedActualSubValue:today.PresentToYearEnd.UnplannedRecords || ValueOfConstant.VALUE_0,
      plannedPlanSubValue:today.PresentToYearEnd.PlannedPlanRecords || ValueOfConstant.VALUE_0,
    },
  ];
}
export const mapImpactOfOutageApiResponse = (i18n: i18n, kpiResponse: KpiApiRes) : ImpactofOutageApiModel[] => {
  const today = kpiResponse.Today.GrossMarginImpact;
  const previousDay = kpiResponse.PreviousDay.GrossMarginImpact
  return [
    {
      title:i18n.t("LABELS.ANNUAL"),
      prefix: today.Prefix,
      suffix: today.Suffix,
      value: calculateDiff(formatNumberToFractions(today.Annual.PluseImpact,NumberConstant.TWO),formatNumberToFractions( today.Annual.MinuseImpact,NumberConstant.TWO)),
      valuePrevious:calculateDiff(formatNumberToFractions(previousDay.Annual.PluseImpact,NumberConstant.TWO),formatNumberToFractions( previousDay.Annual.MinuseImpact,NumberConstant.TWO)),
      positiveVal:formatNumberToFractions(today.Annual.PluseImpact,NumberConstant.TWO),
      negativeVal:formatNumberToFractions(today.Annual.MinuseImpact,NumberConstant.TWO),
      positivePreviousVal:formatNumberToFractions(previousDay.Annual.PluseImpact,NumberConstant.TWO),
      negetivePreviousVal:formatNumberToFractions(previousDay.Annual.MinuseImpact,NumberConstant.TWO),
    },
    {
      title:i18n.t("LABELS.YEAR_START_TO_PRESENT"),
      prefix: today.Prefix,
      suffix: today.Suffix,
      value: calculateDiff(formatNumberToFractions(today.YearStartToPresent.PluseImpact,NumberConstant.TWO),formatNumberToFractions( today.YearStartToPresent.MinuseImpact,NumberConstant.TWO)),
      valuePrevious:calculateDiff(formatNumberToFractions(previousDay.YearStartToPresent.PluseImpact,NumberConstant.TWO),formatNumberToFractions( previousDay.YearStartToPresent.MinuseImpact,NumberConstant.TWO)),
      positiveVal:formatNumberToFractions( today.YearStartToPresent.PluseImpact,NumberConstant.TWO),
      negativeVal:formatNumberToFractions( today.YearStartToPresent.MinuseImpact,NumberConstant.TWO),
      positivePreviousVal:formatNumberToFractions( previousDay.YearStartToPresent.PluseImpact,NumberConstant.TWO),
      negetivePreviousVal:formatNumberToFractions( previousDay.YearStartToPresent.MinuseImpact,NumberConstant.TWO),
    },
    {
      title:i18n.t("LABELS.PRESENT_TO_YEAR_END"),
      prefix: today.Prefix,
      suffix: today.Suffix,
      value: calculateDiff(formatNumberToFractions(today.PresentToYearEnd.PluseImpact,NumberConstant.TWO),formatNumberToFractions( today.PresentToYearEnd.MinuseImpact,NumberConstant.TWO)),
      valuePrevious:calculateDiff(formatNumberToFractions(previousDay.PresentToYearEnd.PluseImpact,NumberConstant.TWO),formatNumberToFractions( previousDay.PresentToYearEnd.MinuseImpact,NumberConstant.TWO)),
      positiveVal:formatNumberToFractions( today.PresentToYearEnd.PluseImpact,NumberConstant.TWO),
      negativeVal:formatNumberToFractions( today.PresentToYearEnd.MinuseImpact,NumberConstant.TWO),
      positivePreviousVal:formatNumberToFractions( previousDay.PresentToYearEnd.PluseImpact,NumberConstant.TWO),
      negetivePreviousVal:formatNumberToFractions( previousDay.PresentToYearEnd.MinuseImpact,NumberConstant.TWO),
    }
  ]
}
export const mapTimeOutageAtOutageApiResponse = (i18n: i18n, timeOutageData: timeOutageDataModel) => {
  console.log("timeOutageData",timeOutageData)
  const today = timeOutageData.Today.StoppageTime;
  const previousDay = timeOutageData.PreviousDay.StoppageTime
  return [
    {
      header: i18n.t("LABELS.ANNUAL"),
      plannedActualOrForcast:formatNumberToFractions(today.Annual.ActualOrForcastHours,NumberConstant.ONE) ,
      plannedPlan:formatNumberToFractions(today.Annual.PlanHours,NumberConstant.ONE) ,
      positveImpactHrs:formatNumberToFractions(today.Annual.PositveImpactHours,NumberConstant.ONE),
      NagetiveImpactHrs:formatNumberToFractions(today.Annual.NagetiveImpactHours,NumberConstant.ONE) ,
      plannedPreviousActualOrForcast:formatNumberToFractions(previousDay.Annual.ActualOrForcastHours,NumberConstant.ONE) ,
      plannedPreviousPlan:formatNumberToFractions(previousDay.Annual.PlanHours,NumberConstant.ONE) ,
      positvePreviousImpactHrs:formatNumberToFractions(previousDay.Annual.PositveImpactHours,NumberConstant.ONE),
      NagetivePreviousImpactHrs:formatNumberToFractions(previousDay.Annual.NagetiveImpactHours,NumberConstant.ONE) ,
    },
    {
      header: i18n.t("LABELS.YEAR_START_TO_PRESENT"),
      presentPlannedActualOrForcast:formatNumberToFractions(today.YearStartToPresent.ActualOrForcastHours,NumberConstant.ONE) ,
      presentPlannedPlan:formatNumberToFractions(today.YearStartToPresent.PlanHours,NumberConstant.ONE),
      presentCancledHrs:formatNumberToFractions(today.YearStartToPresent.CancledHours,NumberConstant.ONE),
      presentCancledRecords:today.YearStartToPresent.CancledRecords || ValueOfConstant.VALUE_0,
      presentPlannedDecreseHrs:formatNumberToFractions(today.YearStartToPresent.PlannedDecreseHours,NumberConstant.ONE),
      presentPlannedDecreseRecords:today.YearStartToPresent.PlannedDecreseRecords || ValueOfConstant.VALUE_0,
      presentPlannedIncreseHrs:formatNumberToFractions(today.YearStartToPresent.PlannedIncreseHours,NumberConstant.ONE),
      presentPlannedIncreseRecords:today.YearStartToPresent.PlannedIncreseRecords || ValueOfConstant.VALUE_0,
      presentUnplannedHrs:formatNumberToFractions(today.YearStartToPresent.UnplannedHours,NumberConstant.ONE),
      presentUnplannedRecords:today.YearStartToPresent.UnplannedRecords || ValueOfConstant.VALUE_0,
      presentPlannedPreviousActualOrForcast:formatNumberToFractions(previousDay.YearStartToPresent.ActualOrForcastHours,NumberConstant.ONE),
      presentPlannedPreviousPlan:formatNumberToFractions(previousDay.YearStartToPresent.PlanHours,NumberConstant.ONE),
      presentCancledPreviousHrs:formatNumberToFractions(previousDay.YearStartToPresent.CancledHours,NumberConstant.ONE),
      presentCancledPreviousRecords:previousDay.YearStartToPresent.CancledRecords || ValueOfConstant.VALUE_0,
      presentPlannedPreviousDecreseHrs:formatNumberToFractions(previousDay.YearStartToPresent.PlannedDecreseHours,NumberConstant.ONE),
      presentPlannedPreviousDecreseRecords:previousDay.YearStartToPresent.PlannedDecreseRecords || ValueOfConstant.VALUE_0,
      presentPlannedPreviousIncreseHrs:formatNumberToFractions(previousDay.YearStartToPresent.PlannedIncreseHours,NumberConstant.ONE),
      presentPlannedPreviousIncreseRecords:previousDay.YearStartToPresent.PlannedIncreseRecords || ValueOfConstant.VALUE_0,
      presentUnplannedPreviousHrs:formatNumberToFractions(previousDay.YearStartToPresent.UnplannedHours,NumberConstant.ONE),
      presentUnplannedPreviousRecords:today.YearStartToPresent.UnplannedRecords || ValueOfConstant.VALUE_0,
    },
    {
      header: i18n.t("LABELS.PRESENT_TO_YEAR_END"),
      endPlannedActualOrForcast:formatNumberToFractions(today.PresentToYearEnd.ActualOrForcastHours,NumberConstant.ONE) ,
      endPlannedPlan:formatNumberToFractions(today.PresentToYearEnd.PlanHours,NumberConstant.ONE),
      endCancledHrs:formatNumberToFractions(today.PresentToYearEnd.CancledHours,NumberConstant.ONE),
      endCancledRecords:today.PresentToYearEnd.CancledRecords || ValueOfConstant.VALUE_0,
      endPlannedDecreseHrs:formatNumberToFractions(today.PresentToYearEnd.PlannedDecreseHours,NumberConstant.ONE),
      endPlannedDecreseRecords:today.PresentToYearEnd.PlannedDecreseRecords || ValueOfConstant.VALUE_0,
      endPlannedIncreseHrs:formatNumberToFractions(today.PresentToYearEnd.PlannedIncreseHours,NumberConstant.ONE),
      endPlannedIncreseRecords:today.PresentToYearEnd.PlannedIncreseRecords || ValueOfConstant.VALUE_0,
      endUnplannedHrs:formatNumberToFractions(today.PresentToYearEnd.UnplannedHours,NumberConstant.ONE),
      endUnplannedRecords:today.PresentToYearEnd.UnplannedRecords || ValueOfConstant.VALUE_0,
      endPlannedPreviousActualOrForcast:formatNumberToFractions(previousDay.PresentToYearEnd.ActualOrForcastHours,NumberConstant.ONE),
      endPlannedPreviousPlan:formatNumberToFractions(previousDay.PresentToYearEnd.PlanHours,NumberConstant.ONE),
      endCancledPreviousHrs:formatNumberToFractions(previousDay.PresentToYearEnd.CancledHours,NumberConstant.ONE),
      endCancledPreviousRecords:previousDay.PresentToYearEnd.CancledRecords || ValueOfConstant.VALUE_0,
      endPlannedPreviousDecreseHrs:formatNumberToFractions(previousDay.PresentToYearEnd.PlannedDecreseHours,NumberConstant.ONE),
      endPlannedPreviousDecreseRecords:previousDay.PresentToYearEnd.PlannedDecreseRecords || ValueOfConstant.VALUE_0,
      endPlannedPreviousIncreseHrs:formatNumberToFractions(previousDay.PresentToYearEnd.PlannedIncreseHours,NumberConstant.ONE),
      endPlannedPreviousIncreseRecords:previousDay.PresentToYearEnd.PlannedIncreseRecords || ValueOfConstant.VALUE_0,
      endUnplannedPreviousHrs:formatNumberToFractions(previousDay.PresentToYearEnd.UnplannedHours,NumberConstant.ONE),
      endUnplannedPreviousRecords:today.PresentToYearEnd.UnplannedRecords || ValueOfConstant.VALUE_0,
    },
  ];
}


export const getLineChartSalesData = (salesData) => {
  let data: any = []
  for (var i = 0; i < salesData.length; i++) {
    data.push({
        x: new Date(salesData[i]?.DAY)?.getTime(),
        y: salesData[i]?.AVG_SALES_UNITPRICE,
      })
  }
  
  return data
}