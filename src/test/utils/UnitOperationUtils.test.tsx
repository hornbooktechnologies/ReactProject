import React from 'react'
// import { i18n } from 'i18next';
import {
  negOperationGrossmarginApiResponse,
  negOperationTimeApiResponse,
  negOperationAvrgSpreadApiResponse,
} from '../../utils/unitOperation/UnitOperationUtils'
import {
  ChartColors,
  ChartGradientType,
  NumberConstant,
} from '../../utils/AppConstants'
import { unitOperationApiMockData } from './_mockData'
import { formatNumberToFractions } from '../../utils/utils'
import i18n from '../i18nForTests'
import { cssClassName } from '../../utils/CssConstants'

describe('negOperationGrossmarginApiResponse', () => {
  it('negOperationGrossmarginApiResponse', () => {
    const today =
      unitOperationApiMockData.Data.Today.NegativeOperationGrossMargin
    const previousDay =
      unitOperationApiMockData.Data.PreviousDay.NegativeOperationGrossMargin
    const negOperationGrossmarginApiResponseReturn = {
      impactOnEBITDAAnnual: formatNumberToFractions(
        today.Annual.ImpactOnEBITDA,
        NumberConstant.TWO
      ),
      previousImpactOnEBITDAAnnual: formatNumberToFractions(
        previousDay.Annual.ImpactOnEBITDA,
        NumberConstant.TWO
      ),
      planAnnual: formatNumberToFractions(
        today.Annual.Plan,
        NumberConstant.TWO
      ),
      previousPlanAnnual: formatNumberToFractions(
        previousDay.Annual.Plan,
        NumberConstant.TWO
      ),
      actualOrForcastAnnual: formatNumberToFractions(
        today.Annual.ActualOrForcast,
        NumberConstant.TWO
      ),
      previousActualOrForcastAnnual: formatNumberToFractions(
        previousDay.Annual.ActualOrForcast,
        NumberConstant.TWO
      ),
      impactOnEBITDAPresent: formatNumberToFractions(
        today.YearStartToPresent.ImpactOnEBITDA,
        NumberConstant.TWO
      ),
      previousImpactOnEBITDAPresent: formatNumberToFractions(
        previousDay.YearStartToPresent.ImpactOnEBITDA,
        NumberConstant.TWO
      ),
      planPresent: formatNumberToFractions(
        today.YearStartToPresent.Plan,
        NumberConstant.TWO
      ),
      previousPlanPresent: formatNumberToFractions(
        previousDay.YearStartToPresent.Plan,
        NumberConstant.TWO
      ),
      actualOrForcastPresent: formatNumberToFractions(
        today.YearStartToPresent.ActualOrForcast,
        NumberConstant.TWO
      ),
      previousActualOrForcastPresent: formatNumberToFractions(
        previousDay.YearStartToPresent.ActualOrForcast,
        NumberConstant.TWO
      ),
      impactOnEBITDAEnd: formatNumberToFractions(
        today.PresentToYearEnd.ImpactOnEBITDA,
        NumberConstant.TWO
      ),
      previousImpactOnEBITDAEnd: formatNumberToFractions(
        previousDay.PresentToYearEnd.ImpactOnEBITDA,
        NumberConstant.TWO
      ),
      planEnd: formatNumberToFractions(
        today.PresentToYearEnd.Plan,
        NumberConstant.TWO
      ),
      previousPlanEnd: formatNumberToFractions(
        previousDay.PresentToYearEnd.Plan,
        NumberConstant.TWO
      ),
      actualOrForcastEnd: formatNumberToFractions(
        today.PresentToYearEnd.ActualOrForcast,
        NumberConstant.TWO
      ),
      previousActualOrForcastEnd: formatNumberToFractions(
        previousDay.PresentToYearEnd.ActualOrForcast,
        NumberConstant.TWO
      ),
      customClassEnd: cssClassName.TOOLTIP_BOTTOM,
      customClassTop: cssClassName.TOOLTIP_TOP_POSITION,
      prefix: undefined,
      suffix: undefined,
    }
    expect(
      negOperationGrossmarginApiResponse(unitOperationApiMockData.Data)
    ).toStrictEqual(negOperationGrossmarginApiResponseReturn)
  })

  it('negOperationTimeApiResponse', () => {
    const today = unitOperationApiMockData.Data.Today.NegativeOperationTime
    const previousDay =
      unitOperationApiMockData.Data.PreviousDay.NegativeOperationTime

    const negOperationTimeApiResponseReturn = [
      {
        header: i18n.t('LABELS.ANNUAL'),
        suffix: 'Hrs',
        titleX: i18n.t('LABELS.PLAN'),
        titleY: i18n.t('LABELS.ACTUAL_FORECAST'),
        plan: today.Annual.Plan || NumberConstant.ZERO,
        actualOrForecast: today.Annual.ActualOrForcast || NumberConstant.ZERO,
        previousPlan: previousDay.Annual.Plan || NumberConstant.ZERO,
        previousActualOrForecast:
          previousDay.Annual.ActualOrForcast || NumberConstant.ZERO,
      },
      {
        header: i18n.t('LABELS.YEAR_START_TO_PRESENT'),
        suffix: 'Hrs',
        titleX: i18n.t('LABELS.PLAN'),
        titleY: i18n.t('LABELS.ACTUAL'),
        plan: today.YearStartToPresent.Plan || NumberConstant.ZERO,
        actualOrForecast:
          today.YearStartToPresent.ActualOrForcast || NumberConstant.ZERO,
        previousPlan:
          previousDay.YearStartToPresent.Plan || NumberConstant.ZERO,
        previousActualOrForecast:
          previousDay.YearStartToPresent.ActualOrForcast || NumberConstant.ZERO,
      },
      {
        header: i18n.t('LABELS.PRESENT_TO_YEAR_END'),
        suffix: 'Hrs',
        titleX: i18n.t('LABELS.PLAN'),
        titleY: i18n.t('LABELS.FORECAST'),
        plan: today.PresentToYearEnd.Plan || NumberConstant.ZERO,
        actualOrForecast:
          today.PresentToYearEnd.ActualOrForcast || NumberConstant.ZERO,
        previousPlan: previousDay.PresentToYearEnd.Plan || NumberConstant.ZERO,
        previousActualOrForecast:
          previousDay.PresentToYearEnd.ActualOrForcast || NumberConstant.ZERO,
      },
    ]
    expect(
      negOperationTimeApiResponse(i18n, unitOperationApiMockData.Data)
    ).toStrictEqual(negOperationTimeApiResponseReturn)
  })

  it('negOperationAvrgSpreadApiResponse', () => {
    const today = unitOperationApiMockData.Data.Today.NegativeOperationAvgSpread
    const previousDay =
      unitOperationApiMockData.Data.PreviousDay.NegativeOperationAvgSpread

    const negOperationAvrgSpreadApiResponseReturn = [
      {
        title: i18n.t('LABELS.ANNUAL'),
        Suffix: today.Suffix,
        plan: {
          header: i18n.t('LABELS.PLAN'),
          value: formatNumberToFractions(today.Annual.Plan, NumberConstant.TWO),
          previousValue: formatNumberToFractions(
            previousDay.Annual.Plan,
            NumberConstant.TWO
          ),
        },
        actual_forcast: {
          header: i18n.t('LABELS.ACTUAL_FORECAST'),
          value: formatNumberToFractions(
            today.Annual.ActualOrForcast,
            NumberConstant.TWO
          ),
          previousValue: formatNumberToFractions(
            previousDay.Annual.ActualOrForcast,
            NumberConstant.TWO
          ),
        },
      },
      {
        title: i18n.t('LABELS.YEAR_START_TO_PRESENT'),
        Suffix: today.Suffix,
        plan: {
          header: i18n.t('LABELS.PLAN'),
          value: formatNumberToFractions(
            today.YearStartToPresent.Plan,
            NumberConstant.TWO
          ),
          previousValue: formatNumberToFractions(
            previousDay.YearStartToPresent.Plan,
            NumberConstant.TWO
          ),
        },
        actual_forcast: {
          header: i18n.t('LABELS.ACTUAL_FORECAST'),
          value: formatNumberToFractions(
            today.YearStartToPresent.ActualOrForcast,
            NumberConstant.TWO
          ),
          previousValue: formatNumberToFractions(
            previousDay.YearStartToPresent.ActualOrForcast,
            NumberConstant.TWO
          ),
        },
      },
      {
        title: i18n.t('LABELS.PRESENT_TO_YEAR_END'),
        Suffix: today.Suffix,
        plan: {
          header: i18n.t('LABELS.PLAN'),
          value: formatNumberToFractions(
            today.PresentToYearEnd.Plan,
            NumberConstant.TWO
          ),
          previousValue: formatNumberToFractions(
            previousDay.PresentToYearEnd.Plan,
            NumberConstant.TWO
          ),
        },
        actual_forcast: {
          header: i18n.t('LABELS.ACTUAL_FORECAST'),
          value: formatNumberToFractions(
            today.PresentToYearEnd.ActualOrForcast,
            NumberConstant.TWO
          ),
          previousValue: formatNumberToFractions(
            previousDay.PresentToYearEnd.ActualOrForcast,
            NumberConstant.TWO
          ),
        },
      },
    ]
    expect(
      negOperationAvrgSpreadApiResponse(i18n, unitOperationApiMockData.Data)
    ).toStrictEqual(negOperationAvrgSpreadApiResponseReturn)
  })
})
