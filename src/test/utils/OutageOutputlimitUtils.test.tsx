import React from 'react'
import {
  GetDonutChartValue,
  GetStartEndTimeOutageValue,
  mapTimeOutageAtOutageApiResponse,
  GetAnnualTimeOutageValue,
  makeUnitStoppageData,
  defaultOtherUnitPlannedList,
  mapOutageApiResponse,
  mapSellingPriceAtOutageApiResponse,
  mapImpactOfOutageApiResponse,
  getLineChartSalesData,
  defaultPlannedList,
  getUnitPlannedList,
  getPlannedList,
} from '../../utils/outageOutputLimit/OutageOutputLimitUtils'
import {
  makeUnitStoppageMockData,
  mapOutageApiResponseMockData,
  mock,
  salesDataMock,
  stoppageMockData,
} from './_mockData'
import {
  ChartColors,
  ChartConstant,
  ChartGradientType,
  DateformatConstant,
  NumberConstant,
  OutageOutputConstant,
  ValueOfConstant,
} from '../../utils/AppConstants'
import {
  calculateDiff,
  formatNumberToFractions,
  getCutoffTime,
  getDateTimeEpoch,
  getFormattedUnitId,
  getUnitNameById,
  groupBy,
} from '../../utils/utils'
import i18n from '../i18nForTests'
import { CommonApiMap, StoppageApiMap } from '../../utils/apiUtils/ApiParamMap'
import { TimeLineChartsList } from '../../models/outageOutputLimit/TimelineChartModel'
import { localStorageUtils } from '../../utils/LocalStorageUtils'
describe('GetDonutChartValue', () => {
  const plan = 90
  const forecast = 10
  const actual = true
  const middleRatio = true
  const forecastPreviousHrs = 20
  const planpreviousHrs = 10
  const suffix = 'Oku'
  const GetDonutChartReturnValue = {
    planHrs: plan,
    forecastHrs: forecast,
    actual: true,
    chartGradientType: ChartGradientType.BLUE,
    gradientColor1: ChartColors._54AFDE,
    gradientColor2: ChartColors._007CBB,
    forecastpreviousHrs: 20,
    middleRatio: true,
    planpreviousHrs: 10,
    suffix: 'Oku',
    value: getDonutChartRatioValue(plan, forecast),
  }

  function getDonutChartRatioValue(plan: number | any, forecast: number | any) {
    return (forecast / plan) * 100
  }

  it('GetDonutChartValue', () => {
    expect(
      GetDonutChartValue(
        plan,
        forecast,
        planpreviousHrs,
        forecastPreviousHrs,
        suffix,
        actual,
        middleRatio
      )
    ).toStrictEqual(GetDonutChartReturnValue)
  })

  it('GetAnnualTimeOutageValue', () => {
    const impactPreviousVal = 10
    const impactVal = 12
    const suffix = 'oku'
    const variation = 'variation'
    const GetAnnualTimeOutageReturnValue = {
      impactPreviousVal: impactPreviousVal,
      impactVal: impactVal,
      suffix: suffix,
      variation: variation,
    }
    expect(
      GetAnnualTimeOutageValue(impactPreviousVal, impactVal, suffix, variation)
    ).toStrictEqual(GetAnnualTimeOutageReturnValue)
  })

  it('makeUnitStoppageData', () => {
    const plansGroupedByPowerPlantUnit = groupBy(
      makeUnitStoppageMockData,
      CommonApiMap.powerPlantUnitId
    )
    const data: any[] = []
    Object.keys(plansGroupedByPowerPlantUnit).forEach((unitId) => {
      const stoppageData = plansGroupedByPowerPlantUnit[unitId]
      data.push(
        stoppageData.map((s) => {
          return {
            [StoppageApiMap.fiscallyPlannedEndDateTime]:
              s[StoppageApiMap.fiscallyPlannedEndDateTime],
            [StoppageApiMap.fiscallyPlannedStartDateTime]:
              s[StoppageApiMap.fiscallyPlannedStartDateTime],
            [StoppageApiMap.scheduledStartDateTime]:
              s[StoppageApiMap.scheduledStartDateTime],
            [StoppageApiMap.scheduledEndDateTime]:
              s[StoppageApiMap.scheduledEndDateTime],
            [StoppageApiMap.actualStartDateTime]:
              s[StoppageApiMap.actualStartDateTime],
            [StoppageApiMap.actualEndDateTime]:
              s[StoppageApiMap.actualEndDateTime],
            planName: s.name,
            unitName: getFormattedUnitId(unitId),
            cancelled: s.cancelled,
          }
        })
      )
    })
    expect(makeUnitStoppageData(makeUnitStoppageMockData)).toStrictEqual(
      data.flat()
    )
  })

  it('GetStartEndTimeOutageValue', () => {
    const className = 'className'
    const iconClassName = 'iconClassName'
    const planTitle = 'planTitle'
    const planVal = 12
    const planpreviousVal = 10
    const subject = 4
    const suffix = 'suffix'
    const variation = 'variation'
    const GetStartEndTimeOutageReturnValue = {
      className: className,
      iconClassName: iconClassName,
      planTitle: planTitle,
      planVal: planVal,
      planpreviousVal: planpreviousVal,
      subject: subject,
      suffix: suffix,
      variation: variation,
    }
    expect(
      GetStartEndTimeOutageValue(
        className,
        iconClassName,
        planTitle,
        planVal,
        planpreviousVal,
        subject,
        suffix,
        variation
      )
    ).toStrictEqual(GetStartEndTimeOutageReturnValue)
  })

  it('mapTimeOutageAtOutageApiResponse', () => {
    const today = mock.Today.StoppageTime
    const previousDay = mock.PreviousDay.StoppageTime
    const mapTimeOutageAtOutageApiResponseReturn = [
      {
        header: i18n.t('LABELS.ANNUAL'),
        plannedActualOrForcast: formatNumberToFractions(
          today.Annual.ActualOrForcastHours,
          NumberConstant.ONE
        ),
        plannedPlan: formatNumberToFractions(
          today.Annual.PlanHours,
          NumberConstant.ONE
        ),
        positveImpactHrs: formatNumberToFractions(
          today.Annual.PositveImpactHours,
          NumberConstant.ONE
        ),
        NagetiveImpactHrs: formatNumberToFractions(
          today.Annual.NagetiveImpactHours,
          NumberConstant.ONE
        ),
        plannedPreviousActualOrForcast: formatNumberToFractions(
          previousDay.Annual.ActualOrForcastHours,
          NumberConstant.ONE
        ),
        plannedPreviousPlan: formatNumberToFractions(
          previousDay.Annual.PlanHours,
          NumberConstant.ONE
        ),
        positvePreviousImpactHrs: formatNumberToFractions(
          previousDay.Annual.PositveImpactHours,
          NumberConstant.ONE
        ),
        NagetivePreviousImpactHrs: formatNumberToFractions(
          previousDay.Annual.NagetiveImpactHours,
          NumberConstant.ONE
        ),
      },
      {
        header: i18n.t('LABELS.YEAR_START_TO_PRESENT'),
        presentPlannedActualOrForcast: formatNumberToFractions(
          today.YearStartToPresent.ActualOrForcastHours,
          NumberConstant.ONE
        ),
        presentPlannedPlan: formatNumberToFractions(
          today.YearStartToPresent.PlanHours,
          NumberConstant.ONE
        ),
        presentCancledHrs: formatNumberToFractions(
          today.YearStartToPresent.CancledHours,
          NumberConstant.ONE
        ),
        presentCancledRecords:
          today.YearStartToPresent.CancledRecords || ValueOfConstant.VALUE_0,
        presentPlannedDecreseHrs: formatNumberToFractions(
          today.YearStartToPresent.PlannedDecreseHours,
          NumberConstant.ONE
        ),
        presentPlannedDecreseRecords:
          today.YearStartToPresent.PlannedDecreseRecords ||
          ValueOfConstant.VALUE_0,
        presentPlannedIncreseHrs: formatNumberToFractions(
          today.YearStartToPresent.PlannedIncreseHours,
          NumberConstant.ONE
        ),
        presentPlannedIncreseRecords:
          today.YearStartToPresent.PlannedIncreseRecords ||
          ValueOfConstant.VALUE_0,
        presentUnplannedHrs: formatNumberToFractions(
          today.YearStartToPresent.UnplannedHours,
          NumberConstant.ONE
        ),
        presentUnplannedRecords:
          today.YearStartToPresent.UnplannedRecords || ValueOfConstant.VALUE_0,
        presentPlannedPreviousActualOrForcast: formatNumberToFractions(
          previousDay.YearStartToPresent.ActualOrForcastHours,
          NumberConstant.ONE
        ),
        presentPlannedPreviousPlan: formatNumberToFractions(
          previousDay.YearStartToPresent.PlanHours,
          NumberConstant.ONE
        ),
        presentCancledPreviousHrs: formatNumberToFractions(
          previousDay.YearStartToPresent.CancledHours,
          NumberConstant.ONE
        ),
        presentCancledPreviousRecords:
          previousDay.YearStartToPresent.CancledRecords ||
          ValueOfConstant.VALUE_0,
        presentPlannedPreviousDecreseHrs: formatNumberToFractions(
          previousDay.YearStartToPresent.PlannedDecreseHours,
          NumberConstant.ONE
        ),
        presentPlannedPreviousDecreseRecords:
          previousDay.YearStartToPresent.PlannedDecreseRecords ||
          ValueOfConstant.VALUE_0,
        presentPlannedPreviousIncreseHrs: formatNumberToFractions(
          previousDay.YearStartToPresent.PlannedIncreseHours,
          NumberConstant.ONE
        ),
        presentPlannedPreviousIncreseRecords:
          previousDay.YearStartToPresent.PlannedIncreseRecords ||
          ValueOfConstant.VALUE_0,
        presentUnplannedPreviousHrs: formatNumberToFractions(
          previousDay.YearStartToPresent.UnplannedHours,
          NumberConstant.ONE
        ),
        presentUnplannedPreviousRecords:
          today.YearStartToPresent.UnplannedRecords || ValueOfConstant.VALUE_0,
      },
      {
        header: i18n.t('LABELS.PRESENT_TO_YEAR_END'),
        endPlannedActualOrForcast: formatNumberToFractions(
          today.PresentToYearEnd.ActualOrForcastHours,
          NumberConstant.ONE
        ),
        endPlannedPlan: formatNumberToFractions(
          today.PresentToYearEnd.PlanHours,
          NumberConstant.ONE
        ),
        endCancledHrs: formatNumberToFractions(
          today.PresentToYearEnd.CancledHours,
          NumberConstant.ONE
        ),
        endCancledRecords:
          today.PresentToYearEnd.CancledRecords || ValueOfConstant.VALUE_0,
        endPlannedDecreseHrs: formatNumberToFractions(
          today.PresentToYearEnd.PlannedDecreseHours,
          NumberConstant.ONE
        ),
        endPlannedDecreseRecords:
          today.PresentToYearEnd.PlannedDecreseRecords ||
          ValueOfConstant.VALUE_0,
        endPlannedIncreseHrs: formatNumberToFractions(
          today.PresentToYearEnd.PlannedIncreseHours,
          NumberConstant.ONE
        ),
        endPlannedIncreseRecords:
          today.PresentToYearEnd.PlannedIncreseRecords ||
          ValueOfConstant.VALUE_0,
        endUnplannedHrs: formatNumberToFractions(
          today.PresentToYearEnd.UnplannedHours,
          NumberConstant.ONE
        ),
        endUnplannedRecords:
          today.PresentToYearEnd.UnplannedRecords || ValueOfConstant.VALUE_0,
        endPlannedPreviousActualOrForcast: formatNumberToFractions(
          previousDay.PresentToYearEnd.ActualOrForcastHours,
          NumberConstant.ONE
        ),
        endPlannedPreviousPlan: formatNumberToFractions(
          previousDay.PresentToYearEnd.PlanHours,
          NumberConstant.ONE
        ),
        endCancledPreviousHrs: formatNumberToFractions(
          previousDay.PresentToYearEnd.CancledHours,
          NumberConstant.ONE
        ),
        endCancledPreviousRecords:
          previousDay.PresentToYearEnd.CancledRecords ||
          ValueOfConstant.VALUE_0,
        endPlannedPreviousDecreseHrs: formatNumberToFractions(
          previousDay.PresentToYearEnd.PlannedDecreseHours,
          NumberConstant.ONE
        ),
        endPlannedPreviousDecreseRecords:
          previousDay.PresentToYearEnd.PlannedDecreseRecords ||
          ValueOfConstant.VALUE_0,
        endPlannedPreviousIncreseHrs: formatNumberToFractions(
          previousDay.PresentToYearEnd.PlannedIncreseHours,
          NumberConstant.ONE
        ),
        endPlannedPreviousIncreseRecords:
          previousDay.PresentToYearEnd.PlannedIncreseRecords ||
          ValueOfConstant.VALUE_0,
        endUnplannedPreviousHrs: formatNumberToFractions(
          previousDay.PresentToYearEnd.UnplannedHours,
          NumberConstant.ONE
        ),
        endUnplannedPreviousRecords:
          today.PresentToYearEnd.UnplannedRecords || ValueOfConstant.VALUE_0,
      },
    ]

    expect(mapTimeOutageAtOutageApiResponse(i18n, mock)).toStrictEqual(
      mapTimeOutageAtOutageApiResponseReturn
    )
  })

  it('defaultOtherUnitPlannedList', () => {
    const selectedUnit = 'A100'
    const allUnits = localStorageUtils.getSelectedPlantUserPreferance()
      ?.generators
    const defaultRet: TimeLineChartsList = []
    allUnits?.forEach((unit) => {
      if (
        getFormattedUnitId(unit[CommonApiMap.powerPlantUnitId]) !== selectedUnit
      ) {
        defaultRet.push({
          name: '',
          data: [
            {
              x: getUnitNameById(
                getFormattedUnitId(unit[CommonApiMap.powerPlantUnitId])
              ),
              y: [0, 0],
              fillColor: ChartConstant.PLANNED_LINE_STROKE,
            },
          ],
        })
      }
    })
    expect(defaultOtherUnitPlannedList(selectedUnit)).toStrictEqual(defaultRet)
  })

  it('mapOutageApiResponse', () => {
    const ReturnValue = mapOutageApiResponseMockData.map((response) => {
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
      }
    })
    expect(mapOutageApiResponse(mapOutageApiResponseMockData)).toStrictEqual(
      ReturnValue
    )
  })

  it('mapSellingPriceAtOutageApiResponse', () => {
    const today = mock.Today.SellingPriceAtOutage
    const previousDay = mock.PreviousDay.SellingPriceAtOutage
    const ReturnValue = [
      {
        header: i18n.t('LABELS.ANNUAL'),
        plannedActual: formatNumberToFractions(
          today.Annual.PlannedActualOrForcastAvgPrice,
          NumberConstant.ONE
        ),
        plannedPlan: formatNumberToFractions(
          today.Annual.PlannedPlanAvgPrice,
          NumberConstant.ONE
        ),
        unplannedActual: formatNumberToFractions(
          today.Annual.UnplannedAvgPrice,
          NumberConstant.ONE
        ),
        plannedPreviousActual: formatNumberToFractions(
          previousDay.Annual.PlannedActualOrForcastAvgPrice,
          NumberConstant.ONE
        ),
        plannedPreviousPlan: formatNumberToFractions(
          previousDay.Annual.PlannedPlanAvgPrice,
          NumberConstant.ONE
        ),
        unplannedPreviousActual: formatNumberToFractions(
          previousDay.Annual.UnplannedAvgPrice,
          NumberConstant.ONE
        ),
      },
      {
        header: i18n.t('LABELS.YEAR_START_TO_PRESENT'),
        plannedActual: formatNumberToFractions(
          today.YearStartToPresent.PlannedActualOrForcastAvgPrice,
          NumberConstant.ONE
        ),
        plannedPlan: formatNumberToFractions(
          today.YearStartToPresent.PlannedPlanAvgPrice,
          NumberConstant.ONE
        ),
        unplannedActual: formatNumberToFractions(
          today.YearStartToPresent.UnplannedAvgPrice,
          NumberConstant.ONE
        ),
        plannedPreviousActual: formatNumberToFractions(
          previousDay.YearStartToPresent.PlannedActualOrForcastAvgPrice,
          NumberConstant.ONE
        ),
        plannedPreviousPlan: formatNumberToFractions(
          previousDay.YearStartToPresent.PlannedPlanAvgPrice,
          NumberConstant.ONE
        ),
        unplannedPreviousActual: formatNumberToFractions(
          previousDay.YearStartToPresent.UnplannedAvgPrice,
          NumberConstant.ONE
        ),
        plannedActualSubValue:
          today.YearStartToPresent.PlannedActualOrForcastRecords ||
          ValueOfConstant.VALUE_0,
        unplannedActualSubValue:
          today.YearStartToPresent.UnplannedRecords || ValueOfConstant.VALUE_0,
        plannedPlanSubValue:
          today.YearStartToPresent.PlannedPlanRecords ||
          ValueOfConstant.VALUE_0,
      },
      {
        header: i18n.t('LABELS.PRESENT_TO_YEAR_END'),
        plannedActual: formatNumberToFractions(
          today.PresentToYearEnd.PlannedActualOrForcastAvgPrice,
          NumberConstant.ONE
        ),
        plannedPlan: formatNumberToFractions(
          today.PresentToYearEnd.PlannedPlanAvgPrice,
          NumberConstant.ONE
        ),
        plannedPreviousActual: formatNumberToFractions(
          previousDay.PresentToYearEnd.PlannedActualOrForcastAvgPrice,
          NumberConstant.ONE
        ),
        plannedPreviousPlan: formatNumberToFractions(
          previousDay.PresentToYearEnd.PlannedPlanAvgPrice,
          NumberConstant.ONE
        ),
        unplannedActual: formatNumberToFractions(
          today.PresentToYearEnd.UnplannedAvgPrice,
          NumberConstant.ONE
        ),
        unplannedPreviousActual: formatNumberToFractions(
          previousDay.PresentToYearEnd.UnplannedAvgPrice,
          NumberConstant.ONE
        ),
        plannedActualSubValue:
          today.PresentToYearEnd.PlannedActualOrForcastRecords ||
          ValueOfConstant.VALUE_0,
        unplannedActualSubValue:
          today.PresentToYearEnd.UnplannedRecords || ValueOfConstant.VALUE_0,
        plannedPlanSubValue:
          today.PresentToYearEnd.PlannedPlanRecords || ValueOfConstant.VALUE_0,
      },
    ]
    expect(mapSellingPriceAtOutageApiResponse(i18n, mock)).toStrictEqual(
      ReturnValue
    )
  })

  it('mapImpactOfOutageApiResponse', () => {
    const today = mock.Today.GrossMarginImpact
    const previousDay = mock.PreviousDay.GrossMarginImpact
    const ReturnValue = [
      {
        title: i18n.t('LABELS.ANNUAL'),
        prefix: today.Prefix,
        suffix: today.Suffix,
        value: calculateDiff(
          formatNumberToFractions(today.Annual.PluseImpact, NumberConstant.TWO),
          formatNumberToFractions(today.Annual.MinuseImpact, NumberConstant.TWO)
        ),
        valuePrevious: calculateDiff(
          formatNumberToFractions(
            previousDay.Annual.PluseImpact,
            NumberConstant.TWO
          ),
          formatNumberToFractions(
            previousDay.Annual.MinuseImpact,
            NumberConstant.TWO
          )
        ),
        positiveVal: formatNumberToFractions(
          today.Annual.PluseImpact,
          NumberConstant.TWO
        ),
        negativeVal: formatNumberToFractions(
          today.Annual.MinuseImpact,
          NumberConstant.TWO
        ),
        positivePreviousVal: formatNumberToFractions(
          previousDay.Annual.PluseImpact,
          NumberConstant.TWO
        ),
        negetivePreviousVal: formatNumberToFractions(
          previousDay.Annual.MinuseImpact,
          NumberConstant.TWO
        ),
      },
      {
        title: i18n.t('LABELS.YEAR_START_TO_PRESENT'),
        prefix: today.Prefix,
        suffix: today.Suffix,
        value: calculateDiff(
          formatNumberToFractions(
            today.YearStartToPresent.PluseImpact,
            NumberConstant.TWO
          ),
          formatNumberToFractions(
            today.YearStartToPresent.MinuseImpact,
            NumberConstant.TWO
          )
        ),
        valuePrevious: calculateDiff(
          formatNumberToFractions(
            previousDay.YearStartToPresent.PluseImpact,
            NumberConstant.TWO
          ),
          formatNumberToFractions(
            previousDay.YearStartToPresent.MinuseImpact,
            NumberConstant.TWO
          )
        ),
        positiveVal: formatNumberToFractions(
          today.YearStartToPresent.PluseImpact,
          NumberConstant.TWO
        ),
        negativeVal: formatNumberToFractions(
          today.YearStartToPresent.MinuseImpact,
          NumberConstant.TWO
        ),
        positivePreviousVal: formatNumberToFractions(
          previousDay.YearStartToPresent.PluseImpact,
          NumberConstant.TWO
        ),
        negetivePreviousVal: formatNumberToFractions(
          previousDay.YearStartToPresent.MinuseImpact,
          NumberConstant.TWO
        ),
      },
      {
        title: i18n.t('LABELS.PRESENT_TO_YEAR_END'),
        prefix: today.Prefix,
        suffix: today.Suffix,
        value: calculateDiff(
          formatNumberToFractions(
            today.PresentToYearEnd.PluseImpact,
            NumberConstant.TWO
          ),
          formatNumberToFractions(
            today.PresentToYearEnd.MinuseImpact,
            NumberConstant.TWO
          )
        ),
        valuePrevious: calculateDiff(
          formatNumberToFractions(
            previousDay.PresentToYearEnd.PluseImpact,
            NumberConstant.TWO
          ),
          formatNumberToFractions(
            previousDay.PresentToYearEnd.MinuseImpact,
            NumberConstant.TWO
          )
        ),
        positiveVal: formatNumberToFractions(
          today.PresentToYearEnd.PluseImpact,
          NumberConstant.TWO
        ),
        negativeVal: formatNumberToFractions(
          today.PresentToYearEnd.MinuseImpact,
          NumberConstant.TWO
        ),
        positivePreviousVal: formatNumberToFractions(
          previousDay.PresentToYearEnd.PluseImpact,
          NumberConstant.TWO
        ),
        negetivePreviousVal: formatNumberToFractions(
          previousDay.PresentToYearEnd.MinuseImpact,
          NumberConstant.TWO
        ),
      },
    ]
    expect(mapImpactOfOutageApiResponse(i18n, mock)).toStrictEqual(ReturnValue)
  })

  it('getLineChartSalesData', () => {
    const getLineChartData = salesDataMock
    let data: any = []
    for (var i = 0; i < getLineChartData.length; i++) {
      data.push({
        x: new Date(getLineChartData[i]?.DAY)?.getTime(),
        y: getLineChartData[i]?.AVG_SALES_UNITPRICE,
      })
    }

    expect(getLineChartSalesData(getLineChartData)).toStrictEqual(data)
  })

  it('defaultPlannedList', () => {
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
    expect(defaultPlannedList(i18n)).toStrictEqual(ret)
  })

  it('getUnitPlannedList', () => {
    const selectedUnit = 'A10'
    const fiscalYear = 2021
    const fiscalYearStart = `${fiscalYear}${DateformatConstant.FISCAL_YEAR}`
    const fiscalYearEnd = `${fiscalYear + 1}${DateformatConstant.FISCAL_YEAR}`
    const cutOff = getCutoffTime()

    let plannedData: any = stoppageMockData.filter(
      (x: any) =>
        getFormattedUnitId(x[CommonApiMap.powerPlantUnitId]) !== selectedUnit
    )
    let data = makeUnitStoppageData(plannedData)
    const ret: TimeLineChartsList = defaultOtherUnitPlannedList(selectedUnit)
    data.forEach((plannedNode: any) => {
      if (plannedNode.cancelled) return
      const scheduledStartDateTime =
        plannedNode[StoppageApiMap.scheduledStartDateTime]
      const scheduledEndDateTime =
        plannedNode[StoppageApiMap.scheduledEndDateTime]
      const actualStartDateTime =
        plannedNode[StoppageApiMap.actualStartDateTime]
      const actualEndDateTime = plannedNode[StoppageApiMap.actualEndDateTime]

      const isScheduledInFiscalYear =
        scheduledStartDateTime < fiscalYearEnd &&
        scheduledEndDateTime > fiscalYearStart

      if (
        isScheduledInFiscalYear &&
        (!(
          actualStartDateTime !== null &&
          actualEndDateTime !== null &&
          actualStartDateTime <= actualEndDateTime
        ) ||
          !(actualStartDateTime <= cutOff && actualEndDateTime <= cutOff))
      ) {
        ret.push({
          name: plannedNode.planName || '',
          data: [
            {
              x: getUnitNameById(plannedNode.unitName) || '',
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
              x: getUnitNameById(plannedNode.unitName) || '',
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

    expect(
      getUnitPlannedList(i18n, selectedUnit, fiscalYear, stoppageMockData)
    ).toStrictEqual(ret)
  })

 
})
