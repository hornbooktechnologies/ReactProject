import React, { Dispatch, SetStateAction } from 'react'
import ReactApexChart from 'react-apexcharts'
import { TimeLineChartsList } from '../../../models/outageOutputLimit/TimelineChartModel'
import { DateformatConstant, ChartConstant } from '../../../utils/AppConstants'
import { getFiscalYearTimestamp } from '../../../utils/utils'

type Props = {
  className?: string
  timelinecharts: TimeLineChartsList
  selectYear: number  
  setXaxisMin: Dispatch<SetStateAction<number>>
  setXaxisMax: Dispatch<SetStateAction<number>>
  xaxisMin: number
  xaxisMax: number
  noOfUnits: number
}

type xasis = {
  type?: 'category' | 'datetime' | 'numeric' | undefined
}

const TimeLineChartOtherUnits: React.FC<Props> = (props) => {
  const xaxisType: xasis = {
    type: 'datetime',
  }
  const perUnitHeight = 50;
  const marginHeight = 70;
  const yAxisLabelMinWidth = 90;
  const yAxisLabelMaxWidth = 130;
  const subChartHeight: number = marginHeight + (props.noOfUnits * perUnitHeight);
  const state = {
    options: {
      chart: {
        toolbar: {
          tools:{
            download: false,
          },
        },
        zoom: {
          type: 'x',
          autoScaleYaxis: false,
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
      },
      yaxis: {
        showForNullSeries: false,
        labels: {
          minWidth: yAxisLabelMinWidth,
          maxWidth: yAxisLabelMaxWidth,
          style: {
            colors: ChartConstant.WHITE_STROKE,
          },
          offsetX: -5,
        },
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

  if (props.timelinecharts.length > 0) {
    return (
      <ReactApexChart
        className={['timeline-chart', props.className].join(' ')}
        options={state.options}
        series={state.series}
        type="rangeBar"
        height={subChartHeight}
      />
    )
  } else {
    return null
  }
}

export default TimeLineChartOtherUnits
