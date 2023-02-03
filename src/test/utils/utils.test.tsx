import React from 'react'
import moment from 'moment'
import { DateTime } from 'luxon'
import {
  GetDonutChartSeriesAndValueForCurrentStatus,
  getDateTimeEpoch,
  getGeneratorDropdownData,
  getFormattedUnitId,
  formatNumberToFractions,
  getCutOffUnixEpochSeconds,
  getCutoffFractionTime,
  getOtherUnits,
  getUnitNameById,
  getCutoffTime,
  formatDate,
  getSelectedUnitID,
  generatorDropdownUnit,
  calculateDiff,
  prefixSign,
  IsappearTooltip,
  IstextHighlight,
  addCustomClass,
  setTooltipPosition,
} from '../../utils/utils'
import {
  AnnualTargetConstant,
  ChartColors,
  ChartGradientType,
  ChartType,
  TIMEZONE,
} from '../../utils/AppConstants'
import { cssClassName } from '../../utils/CssConstants'
import i18n from '../../translations/i18n'
import { localStorageUtils } from '../../utils/LocalStorageUtils'
import { CommonApiMap } from '../../utils/apiUtils/ApiParamMap'

describe('Component: GetDonutChartSeriesAndValueForCurrentStatus', () => {
  const i18nCode = i18n
  const customData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: 'OPERATION_COST',
    chartGradientType: ChartGradientType.GREEN,
    gradientColor1: ChartColors._9FCD72,
    gradientColor2: ChartColors._66A428,
  }
  const seriesData = {
    title: undefined,
    ForecastCurrentYear: undefined,
    PlannedCurrentYear: undefined,
    prefix: '',
    suffix1: '',
    suffix2: '',
  }
  const GetDonutChartReturnValue = {
    ...customData,
    series1: {
      title: 'Plan',
      seriesValue: 0,
      prefix: seriesData?.prefix,
      suffix1: seriesData?.suffix1,
      suffix2: seriesData?.suffix2,
    },
    series2: {
      title: 'Forecast',
      seriesValue: 0,
      prefix: seriesData?.prefix,
      suffix1: seriesData?.suffix1,
      suffix2: seriesData?.suffix2,
    },
    value: NaN,
    plan: seriesData?.PlannedCurrentYear,
    forecast: seriesData?.ForecastCurrentYear,
  }

  function getDonutChartValue(seriesData: any) {
    return (
      (seriesData?.ForecastCurrentYear / seriesData?.PlannedCurrentYear) * 100
    )
  }

  it('GetDonutChartSeriesAndValueForCurrentStatus', () => {
    return expect(
      GetDonutChartSeriesAndValueForCurrentStatus(
        i18nCode,
        customData,
        seriesData
      )
    ).toStrictEqual(GetDonutChartReturnValue)
  })

  const datetime = NaN

  it('getDateTimeEpoch', () => {
    return expect(getDateTimeEpoch(datetime)).toStrictEqual(datetime)
  })

  it('getGeneratorDropdownData', () => {
    return expect(
      getGeneratorDropdownData(
        localStorageUtils.getSelectedPlantUserPreferance()
      )
    ).toStrictEqual(undefined)
  })
  const selectedUserPreference = localStorageUtils.getSelectedPlantUserPreferance()
  const units = getFormattedUnitId(selectedUserPreference?.generators)
  it('getFormattedUnitId', () => {
    return expect(getFormattedUnitId(units && units[0].value)).toStrictEqual(
      units?.slice(0, 3)
    )
  })

  const value = 191
  it('formatNumberToFractions', () => {
    return expect(formatNumberToFractions(value, 1)).toStrictEqual('191.0')
  })

  const unixTime = new Date().getTime()
  it('getCutOffUnixEpochSeconds', () => {
    return expect(getCutOffUnixEpochSeconds()).toStrictEqual(
      Math.floor(unixTime / 1000)
    )
  })

  const unixTime2 = new Date().getTime()
  it('getCutoffFractionTime', () => {
    return expect(getCutoffFractionTime()).toStrictEqual(
      Math.floor(unixTime2 / 1000)
    )
  })

  const allUnits = localStorageUtils.getSelectedPlantUserPreferance()
    ?.generators
  const selectedUnit = 'A100'
  it('getOtherUnits', () => {
    return expect(getOtherUnits(selectedUnit)).toStrictEqual(
      allUnits?.filter(
        (unit) =>
          getFormattedUnitId(unit[CommonApiMap.powerPlantUnitId]) !==
          selectedUnit
      )
    )
  })
  const unitId = 'HK'
  const allUnitsUnit = localStorageUtils.getSelectedPlantUserPreferance()
    ?.generators
  const unit = allUnitsUnit?.find(
    (x) => x[CommonApiMap.powerPlantUnitId] === `${unitId}0`
  )

  it('getUnitNameById', () => {
    return expect(getUnitNameById(unitId)).toStrictEqual(
      (unit && unit[CommonApiMap.generatorDisplayName]) || undefined
    )
  })

  it('getCutoffTime', () => {
    return expect(getCutoffTime()).toStrictEqual(
      DateTime.fromMillis(getCutOffUnixEpochSeconds() * 1000, {
        zone: TIMEZONE.ASIA_TOKYO,
      }).toFormat("yyyy-MM-dd'T'HH:mm:ss")
    )
  })

  it('formatDate', () => {
    return expect(formatDate(new Date())).toStrictEqual(
      moment(new Date()).format('YYYY/M/D HH:mm')
    )
  })

  const selectedUserPreference1 = localStorageUtils.getSelectedPlantUserPreferance()
  const units1 = getGeneratorDropdownData(selectedUserPreference1?.generators)
  const selectedUnitId =
    localStorageUtils.getSelectedUnitId() ||
    getFormattedUnitId(units1 && units1[0].value)

  it('getSelectedUnitID', () => {
    return expect(getSelectedUnitID()).toStrictEqual(selectedUnitId)
  })

  it('generatorDropdownUnit', () => {
    return expect(generatorDropdownUnit()).toStrictEqual(
      selectedUserPreference?.generators
    )
  })
  it('calculateDiff', () => {
    let diff = 0
    let firstVal = 10
    let secondVal = 5
    if (firstVal && secondVal) {
      diff = firstVal - secondVal
    }
    return expect(calculateDiff(firstVal, secondVal)).toStrictEqual(
      diff.toFixed(2)
    )
  })
  it('prefixSign', () => {
    let value = 10
    let variation = '-'
    let prefixSign1

    if (value === 0 || value < 0 || value === null) {
      prefixSign1 = ''
    } else if (value > 0 || variation === 'positiveVal') {
      prefixSign1 = '+'
    } else if (variation === '-') {
      prefixSign1 = '-'
    }

    return expect(prefixSign(value, variation)).toStrictEqual(prefixSign1)
  })
  it('IsappearTooltip', () => {
    let value = true
    let show
    if (value === true) {
      show = cssClassName.CUSTOM_TOOLTIP
    } else {
      show = ''
    }
    return expect(IsappearTooltip(value)).toStrictEqual(show)
  })
  it('IstextHighlight', () => {
    let value = true
    let show
    if (value === true) {
      show = cssClassName.TEXT_HIGHLIGHT
    } else {
      show = ''
    }
    return expect(IstextHighlight(value)).toStrictEqual(show)
  })
  it('addCustomClass', () => {
    let value = true
    let className = ''
    let customClass
    if (value === true) {
      customClass = className + cssClassName.TOOLTIP_CUSTOM
    } else {
      customClass = ''
    }
    return expect(addCustomClass(value, className)).toStrictEqual(customClass)
  })
  it('setTooltipPosition', () => {
    let addClass
    let className = ''
    if (className !== cssClassName.TOOLTIP_BOTTOM) {
      addClass = cssClassName.TOOLTIP_TOP
    } else {
      addClass = ''
    }
    return expect(setTooltipPosition(className)).toStrictEqual(addClass)
  })
})
