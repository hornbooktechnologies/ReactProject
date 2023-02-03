import React, { Dispatch, SetStateAction } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import { DailyAveragePrices } from '../../../models/outageOutputLimit'
import { TIMEZONE, AppConstant, ChartConstant, DateformatConstant } from '../../../utils/AppConstants'
import { getFiscalYearTimestamp } from '../../../utils/utils'

type Props = {
  className?: string
  prices: DailyAveragePrices
  selectYear: number
  xaxisMin: number
  xaxisMax: number
  setXaxisMin: Dispatch<SetStateAction<number>>
  setXaxisMax: Dispatch<SetStateAction<number>>
}
type xasis = {
  type?: 'category' | 'datetime' | 'numeric' | undefined
}

const OutageUnitWiseLineChart: React.FC<Props> = (props) => {
  const { i18n } = useTranslation();
  const xaxisType: xasis = {
    type: 'datetime',
  }
  const lineChartHeight = 350;
  const yAxisLabelWidth = 70;
  const yAxisMinRange = 0;
  const yAxisMaxRange = 20;
  const state = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        events: {
          beforeMount: function (chartContext: any, options: any) {
            props.setXaxisMin(options.config.xaxis.min)
            props.setXaxisMax(options.config.xaxis.max)
          },
          beforeZoom: function (chartContext: any, { xaxis }: any) {
            props.setXaxisMin(xaxis.min)
            props.setXaxisMax(xaxis.max)
          },
          beforeResetZoom: function () {
            props.setXaxisMin(getFiscalYearTimestamp(props.selectYear))
            props.setXaxisMax(getFiscalYearTimestamp(props.selectYear + 1))
            return {
              xaxis: {
                min: getFiscalYearTimestamp(props.selectYear),
                max: getFiscalYearTimestamp(props.selectYear + 1),
              },
            }
          },
          scrolled: function (chartContext: any, { xaxis }: any) {
            props.setXaxisMin(xaxis.min)
            props.setXaxisMax(xaxis.max)
          },
        },
      },
      annotations: {
        xaxis: [
          {
            x: new Date().getTime() + TIMEZONE.JPN_TIMEZONE,
            strokeDashArray: 0,
            borderColor: ChartConstant.LABEL_COLOR,
            label: {
              show: false
            }
          },
        ],
      },
      xaxis: {
        type: xaxisType.type,
        min: props.xaxisMin,
        max: props.xaxisMax,
        labels: {
          show: true,
          datetimeFormatter: {
            year: DateformatConstant.M_D,
            month: DateformatConstant.M_D,
            day: DateformatConstant.M_D,
            hour: DateformatConstant.HH_MM,
          },
          style: {
            colors: ChartConstant.WHITE_STROKE,
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: true,
        }
      },
      yaxis: {
        opposite: true,
        min: yAxisMinRange,
        max: yAxisMaxRange,
        tickAmount: 5,
        labels: {
          minWidth: yAxisLabelWidth,
          maxWidth: yAxisLabelWidth,
          style: {
            colors: ChartConstant.WHITE_STROKE,
          },
          formatter: (val: number) => {
            return `${val.toString()} ${AppConstant.OUTAGE_MEASURE_CHART_UNIT}`
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        }
      },
      tooltip: {
        enabled: false,
      },
      stroke: {
        width: 3,
        colors: [ChartConstant.OUTAGE_LINE_CHART_STROKE],
      },
      grid: {
        show: true,
        strokeDashArray: ChartConstant.TIMELINE_CHART_GRID_STROKE_AMOUNT,
        borderColor: ChartConstant.TICKLINE_STROKE,
      },
    },
    series: [
      {
        name: i18n.t('OUTAGE_AND_OUTPUT_LIMIT.MARKET_PRICE'),
        data: props.prices,
      },
    ],
  }

  if (props.prices.length > 0) {
    return (
      <ReactApexChart
        className={['line-chart', 'unitWiseLineChart'].join(' ')}
        options={state.options}
        series={state.series}
        type="line"
        height={lineChartHeight}
      />
    )
  } else {
    return null
  }
}

export default OutageUnitWiseLineChart
