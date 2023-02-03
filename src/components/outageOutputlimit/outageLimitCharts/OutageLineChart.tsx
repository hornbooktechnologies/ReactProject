import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import { DailyAveragePrices } from '../../../models/outageOutputLimit'
import { AppConstant, ChartConstant, TIMEZONE } from '../../../utils/AppConstants'

type Props = {
  className?: string
  prices: DailyAveragePrices
  selectYear: number
  xaxisMin: number
  xaxisMax: number
  noOfUnits: number
}
type xasis = {
  type?: 'category' | 'datetime' | 'numeric' | undefined
}

const OutageLineChart: React.FC<Props> = (props) => {
  const { i18n } = useTranslation();
  const xaxisType: xasis = {
    type: 'datetime',
  }
  const perUnitHeight = 50;
  const marginHeight = 242;
  const yAxisLabelWidth = 80;
  const yAxisMinRange = 0;
  const yAxisMaxRange = 20;
  const lineChartHeight = marginHeight + (props.noOfUnits * perUnitHeight);
  const state = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      annotations: {
        xaxis: [
          {
            x: new Date().getTime() + TIMEZONE.JPN_TIMEZONE,
            strokeDashArray: 0,
            borderColor: ChartConstant.LABEL_COLOR,
            label: {
              borderColor: ChartConstant.LABEL_COLOR,
              style: {
                color: ChartConstant.LABEL_TEXT_COLOR,
                background: ChartConstant.LABEL_COLOR,
                fontFamily:  ChartConstant.ANNOTATION.FONT_FAMILY,
                fontSize: ChartConstant.ANNOTATION.FONT_SIZE,
              },
              text: i18n.t('LABELS.PRESENT')
            }
          },
        ],
      },
      xaxis: {
        type: xaxisType.type,
        min: props.xaxisMin,
        max: props.xaxisMax,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        opposite: true,
        min: yAxisMinRange,
        max: yAxisMaxRange,
        labels: {
          minWidth: yAxisLabelWidth,
          maxWidth: yAxisLabelWidth,
          padding: 2,
          style: {
            colors: ChartConstant.WHITE_STROKE,
          },
          formatter: (val: number) => {
            return `${val.toString()} ${AppConstant.OUTAGE_MEASURE_CHART_UNIT}`
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      stroke: {
        width: 3,
        colors: [ChartConstant.OUTAGE_LINE_CHART_STROKE],
      },
      grid: {
        show: false,
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
    const staticMargin = 280;
    const margin = `-${staticMargin + (props.noOfUnits * perUnitHeight)}px`;
    return (
      <div style={{ marginTop: margin }}>
        <ReactApexChart
          className={['line-chart', props.className].join(' ')}
          options={state.options}
          series={state.series}
          type="line"
          height={lineChartHeight}
        />
      </div>
    )
  } else {
    return null
  }
}

export default OutageLineChart
