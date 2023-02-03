import React, { Dispatch, SetStateAction } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import { TimeLineChartsList } from '../../../models/outageOutputLimit/TimelineChartModel'
import { DateformatConstant, ChartConstant, TIMEZONE } from '../../../utils/AppConstants'
import { getFiscalYearTimestamp } from '../../../utils/utils'

type Props = {
  className?: string
  timelinecharts: TimeLineChartsList
  selectYear: number
  setXaxisMin: Dispatch<SetStateAction<number>>
  setXaxisMax: Dispatch<SetStateAction<number>>
  xaxisMin: number
  xaxisMax: number
  isUnitWiseView?: boolean
}
type xasis = {
  type?: 'category' | 'datetime' | 'numeric' | undefined
}

const TimeLineChartPlannedUnit: React.FC<Props> = (props) => {
  const { i18n } = useTranslation();
  const yAxisLabelMinWidth = 90;
  const yAxisLabelMaxWidth = 130;
  const chartHeight = 180;
  const xaxisType: xasis = {
    type: 'datetime',
  }

  const annotation = {
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
            text: i18n.t("LABELS.PRESENT"),
          }
        },
      ],
    },
  };

  let state = {
    options: {
      chart: {
        toolbar: {
          tools:{
            download: false,
          },
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
      plotOptions: {
        bar: {
          horizontal: true,
          rangeBarGroupRows: true,
        },
      },
      grid: {
        show: true,
        strokeDashArray: ChartConstant.TIMELINE_CHART_GRID_STROKE_AMOUNT,
        borderColor: ChartConstant.TICKLINE_STROKE,
      },
      legend: {
        show: false,
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
        }
      },
      yaxis: {
        showForNullSeries: false,
        labels: {
          minWidth: yAxisLabelMinWidth,
          maxWidth: yAxisLabelMaxWidth,
          style: {
            colors: ChartConstant.WHITE_STROKE,
          },
        },
      },
      toolbar: {
        show: false,
      },
      tooltip: {
        x: {
          format: DateformatConstant.TIMELINE_CHART_TOOLTIP_FORMAT,
        },
      },
      fill: {
        opacity: ChartConstant.OPACITY,
      },
    },
    series: props.timelinecharts,
  }

  // showing annotation on timeline chart in case of unit wise view
  if (props.isUnitWiseView) {
    state.options = { ...state.options, ...annotation };
  }

  if (props.timelinecharts.length > 0) {
    return (
      <ReactApexChart
        className={['timeline-chart', props.className].join(' ')}
        options={state.options}
        series={state.series}
        type="rangeBar"
        height={chartHeight}
      />
    )
  } else {
    return null
  }
}

export default TimeLineChartPlannedUnit
