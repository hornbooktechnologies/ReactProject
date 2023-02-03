import React, { useEffect, useState } from 'react'
import useStateRef from 'react-usestateref'
import { useTranslation } from 'react-i18next'
import LinechartDropDown from '../common/Dropdown'
import Moment from 'moment'
import { FetchData } from './LinechartData'
import ResponsiveLineContainer from './ResponsiveLineChartContainer'
import { ChartConstant,DateformatConstant } from '../../utils/AppConstants'
import EstimationLayout from './EstimationLayout'
import DataChangeOptions from '../common/DataChangeOptions'

const LineGraph = (props) => {
  const { i18n } = useTranslation();
  const [ind, setIndex, indexref] = useStateRef<any>()
  const [linechartData, setLinechartData] = useState<any>()
  const [selectValue, setSelectValue] = useState(props.value)
  const [startDate, setStartDate] = useState(new Date(props.time * 1000))
  const [estimate, setEstimate] = useState<any>(
    i18n.t('ANNUAL_TARGET.EST_FOR_YR')
  )

  useEffect(() => {
    // rerender  the Annual Target for a new Date if No Data Available
    if (linechartData && linechartData.graphData === null && ind === 0) {
      props.noDataHandler(Math.trunc(startDate.getTime() / 1000), selectValue)
    } else {
    }
  }, [linechartData, props, selectValue, startDate, ind])

  let Today = new Date()
  let propsData = props.data
  
  useEffect(() => {
    const getIndexing = (e) => {
      let parsed1 = e
      setIndex(0)
      for (let [key, value] of Object.entries(parsed1)) {
        let maxDate2
        let minDate1
        if (value && value.Period) {
          minDate1 = new Date(value.Period[0]).getTime()
          var filteredPeriod = value.Period.filter(function (el) {
            return el != null
          })
        }
        if (
          selectValue === ChartConstant.ANNUAL_DATA ||
          selectValue === ChartConstant.CUMULATIVE_DATA
        ) {
          let date = Moment(filteredPeriod[filteredPeriod.length - 1])
            .add(30, 'day')
            .add(24, 'hours')

          maxDate2 = new Date(date).getTime()
        } else {
          maxDate2 = new Date(
            filteredPeriod[filteredPeriod.length - 1]
          ).getTime()
        }

        let d = new Date(startDate)
        d.setHours(0)
        d.setMinutes(0)
        d.setSeconds(0)
        d.setMilliseconds(0)
        let date = d.getTime()
        if (date >= minDate1 && date <= maxDate2) {
          setIndex(key)
          break
        }
      }
    }
    const getDataOfPreNext = (preNextButton) => {
      switch (selectValue) {
        case ChartConstant.ANNUAL_DATA:
          if (!preNextButton) {
            getIndexing(propsData?.Annual)
          }
          setEstimate(i18n.t('ANNUAL_TARGET.EST_FOR_YR'))
          setLinechartData(
            FetchData(
              propsData?.Annual,
              indexref.current,
              startDate,
              ChartConstant.ANNUAL_DATA
            )
          )

          break

        case ChartConstant.MONTHLY_DATA:
          if (!preNextButton) {
            getIndexing(propsData?.Monthly)
          }
          setEstimate(ChartConstant.EST_FOR_MONTH)
          setLinechartData(
            FetchData(
              propsData?.Monthly,
              indexref.current,
              startDate,
              ChartConstant.MONTHLY_DATA
            )
          )
        break

        case ChartConstant.WEEKLY_DATA:
          if (!preNextButton) {
            getIndexing(propsData?.Weekly)
          }
          setEstimate(ChartConstant.EST_FOR_WEEK)
          setLinechartData(
            FetchData(
              propsData?.Weekly,
              indexref.current,
              startDate,
              ChartConstant.WEEKLY_DATA
            )
          )
        break

        case ChartConstant.DAILY_DATA:
          if (!preNextButton) {
            getIndexing(propsData?.Daily)
          }
          setEstimate(ChartConstant.EST_FOR_DAY)
          setLinechartData(
            FetchData(
              propsData?.Daily,
              indexref.current,
              startDate,
              ChartConstant.DAILY_DATA
            )
          )
          break

        case ChartConstant.CUMULATIVE_DATA:
          if (!preNextButton) {
            getIndexing(propsData?.Cumulative)
          }
          setEstimate(i18n.t('ANNUAL_TARGET.EST_FOR_YR'))
          setLinechartData(
            FetchData(
              propsData?.Cumulative,
              indexref.current,
              startDate,
              ChartConstant.CUMULATIVE_DATA
            )
          )
        break

        default:
          if (!preNextButton) {
            getIndexing(propsData?.Annual)
          }
          setEstimate(i18n.t('ANNUAL_TARGET.EST_FOR_YR'))
          setLinechartData(
            FetchData(
              propsData?.Annual,
              indexref.current,
              startDate,
              ChartConstant.ANNUAL_DATA
            )
          )
      }
    }
    getDataOfPreNext(false)
  }, [
    selectValue,
    startDate,
    setIndex,
    indexref,
    propsData?.Annual,
    propsData?.Cumulative,
    propsData?.Daily,
    propsData?.Monthly,
    propsData?.Weekly,
    i18n,
  ])

  let cumulativeDisable = false
  if (props.cumulativeBoolean) {
    cumulativeDisable = true
  } else {
    cumulativeDisable = false
  }

  let data = []
  let dataEstList = []
  let list = []
  var ForecastList
  var PlannedList
  var ActualList
  var ylabel

  if (linechartData && linechartData.graphData) {
    let parsed = JSON.parse(linechartData.graphData)
    let dataObj = {
      Period: String,
      Forecast: Number,
      Actual: Number,
      Planned: Number,
      Estimates: Number,
      TimeStamp: Number,
    }
    for (const key in parsed.Period) {
      let graphData = Object.create(dataObj)
      if (parsed.Period[key]) {
        graphData.Period = parsed.Period[key]
        graphData.Forecast = parsed.Forecast[key]
        graphData.Actual = parsed.Actual[key]
        graphData.Planned = parsed.Planned[key]
        let epoch = new Date(parsed.Period[key])
        graphData.TimeStamp = epoch.getTime()

        if (selectValue === ChartConstant.MONTHLY_DATA) {
          if (Moment(graphData.Period).format(DateformatConstant.DDD) === 'Sun') {
            list.push(
              Moment(graphData.Period).format(DateformatConstant.YYYY_MM_DDT00)
            )
          }
        }
        if (selectValue === ChartConstant.DAILY_DATA) {
          let x = Moment(graphData.Period).format(DateformatConstant.HH)
          if (x % 2 === 0) {
            list.push(
              Moment(graphData.Period).format(DateformatConstant.YYYY_MM_DDTHH_MM)
            )
          }
        }
        data.push(graphData)
      }
    }

    if (selectValue === ChartConstant.ANNUAL_DATA) {
      if (
        Moment().format(DateformatConstant.MMM) === 'Mar' &&
        Moment(parsed.Period[parsed.Period.length - 1]).format(
          DateformatConstant.MMM
        ) === 'Mar'
      ) {
        Today = Moment(parsed.Period[parsed.Period.length - 1]).format(
          DateformatConstant.YYYY_MM_01T00
        )
      }
    } else if (selectValue !== ChartConstant.DAILY_DATA) {
      Today = Moment().format(DateformatConstant.YYYY_MM_DDT00)
    }
    for (const d in parsed.Estimates) {
      let dataEs = Object.create(dataObj)
      dataEs.Estimates = parsed.Estimates[d]
      dataEstList.push(dataEs.Estimates)
    }

    ForecastList = parsed.Forecast.filter(function (el) {
      return el != null
    })

    ActualList = parsed.Actual.filter(function (el) {
      return el != null
    })

    PlannedList = parsed.Planned.filter(function (el) {
      return el != null
    })

    ylabel = ''
    if (linechartData.Prefix) {
      ylabel = linechartData.Prefix + ' ' + linechartData.Suffix2
    } else {
      ylabel = linechartData.Suffix2
    }

    //ticks - in Y-axis .
    var min = Math.min(...ForecastList, ...PlannedList, ...ActualList)
    var max = Math.max(...ForecastList, ...PlannedList, ...ActualList)
    let interval = 3
    let diff = (max - min) / interval
    var ticks1 = []
    let start = min
    ticks1.push(Math.ceil(start))
    for (let i = 0; i < interval; i++) {
      ticks1.push(Math.round(start + diff))
      start += diff
    }
    ticks1.push(0)
    ticks1.sort((a, b) => a - b)
    Math.round(ticks1[ticks1.length - 1])
    //yaxisLabel -length
    var longestLabelLength = `${max}`.length
    if (longestLabelLength < 6) {
      longestLabelLength = 6
    }
  }
  const onSelectHandler = (e) => {
    setSelectValue(e.value)
  }
  const getIndexing = (e: any) => {
    let parsed1 = e

    setIndex(0)
    for (let [key, value] of Object.entries(parsed1)) {
      let maxDate2
      let minDate1
      if (value.Period) {
        minDate1 = new Date(value.Period[0]).getTime()
        var filteredPeriod = value.Period.filter(function (el) {
          return el != null
        })
      }

      if (
        selectValue === ChartConstant.ANNUAL_DATA ||
        selectValue === ChartConstant.CUMULATIVE_DATA
      ) {
        let date: any = Moment(filteredPeriod[filteredPeriod.length - 1])
          .add(30, 'day')
          .add(24, 'hours')

        maxDate2 = new Date(date).getTime()
      } else {
        maxDate2 = new Date(filteredPeriod[filteredPeriod.length - 1]).getTime()
      }

      let d = new Date(startDate)
      d.setHours(0)
      d.setMinutes(0)
      d.setSeconds(0)
      d.setMilliseconds(0)
      let date = d.getTime()

      if (date >= minDate1 && date <= maxDate2) {
        setIndex(key)

        break
      }
    }
  }
  const getDataOfPreNext = (preNextButton) => {
    switch (selectValue) {
      case ChartConstant.ANNUAL_DATA:
        if (!preNextButton) {
          getIndexing(propsData?.Annual)
        }
        setEstimate(i18n.t('ANNUAL_TARGET.EST_FOR_YR'))
        setLinechartData(
          FetchData(
            propsData?.Annual,
            indexref.current,
            startDate,
            ChartConstant.ANNUAL_DATA
          )
        )
      break

      case ChartConstant.MONTHLY_DATA:
        if (!preNextButton) {
          getIndexing(propsData?.Monthly)
        }
        setEstimate(ChartConstant.EST_FOR_MONTH)
        setLinechartData(
          FetchData(
            propsData?.Monthly,
            indexref.current,
            startDate,
            ChartConstant.MONTHLY_DATA
          )
        )
      break

      case ChartConstant.WEEKLY_DATA:
        if (!preNextButton) {
          getIndexing(propsData?.Weekly)
        }
        setEstimate(ChartConstant.EST_FOR_WEEK)
        setLinechartData(
          FetchData(
            propsData?.Weekly,
            indexref.current,
            startDate,
            ChartConstant.WEEKLY_DATA
          )
        )
        break

      case ChartConstant.DAILY_DATA:
        if (!preNextButton) {
          getIndexing(propsData?.Daily)
        }
        setEstimate(ChartConstant.EST_FOR_DAY)
        setLinechartData(
          FetchData(
            propsData?.Daily,
            indexref.current,
            startDate,
            ChartConstant.DAILY_DATA
          )
        )
        break

      case ChartConstant.CUMULATIVE_DATA:
        if (!preNextButton) {
          getIndexing(propsData?.Cumulative)
        }
        setEstimate(i18n.t('ANNUAL_TARGET.EST_FOR_YR'))
        setLinechartData(
          FetchData(
            propsData?.Cumulative,
            indexref.current,
            startDate,
            ChartConstant.CUMULATIVE_DATA
          )
        )
        break

      default:
        if (!preNextButton) {
          getIndexing(propsData?.Annual)
        }
        setEstimate(i18n.t('ANNUAL_TARGET.EST_FOR_YR'))
        setLinechartData(
          FetchData(
            propsData?.Annual,
            indexref.current,
            startDate,
            ChartConstant.ANNUAL_DATA
          )
        )
    }
  }
  //Prev
  let onClickPrev = () => {
    setIndex(parseInt(ind) - 1)
    getDataOfPreNext(true)
  }

  //Next
  let onClickNext = () => {
    setIndex(parseInt(ind) + 1)
    getDataOfPreNext(true)
  }
  return (
    <>
     {linechartData !== undefined ? (
        <>
          <div className="linechartContainer">
            <div className="uk-flex uk-flex-middle uk-flex-wrap mb-20">
              <LinechartDropDown
                onSelectHandler={onSelectHandler}
                cumulativeDisable={cumulativeDisable}
                selectValue={selectValue}
                customClass="m-w-160"
              />
              <DataChangeOptions
                linechartData={linechartData}
                onClickPrev={onClickPrev}
                startDate={startDate}
                selectValue={selectValue}
                setStartDate ={setStartDate}
                onClickNext={onClickNext}
                ind={ind}
                customClass="date-picker-return"
              />
            </div>
            {linechartData.graphData ? (
              <>
                <ResponsiveLineContainer
                  data={data}
                  selectValue={selectValue}
                  list={list}
                  longestLabelLength={longestLabelLength}
                  ylabel={ylabel}
                  linechartData={linechartData}
                  ForecastList={ForecastList}
                  PlannedList={PlannedList}
                  ActualList={ActualList}
                  Today={Today}
                />
              </>
            ) : (
              <>
               <div className='noDataText uk-flex uk-flex-center'>
                  <h2>
                    {i18n.t('ANNUAL_TARGET.NO_DATA_AVAILABLE')}
                  </h2>
              </div>
              </>
            )}
          </div>
        </>
      ) : null}
      {dataEstList.length > 0 ? (
        <>
          <EstimationLayout
            linechartData={linechartData}
            dataEstList={dataEstList}
            estimate={estimate}
            selectValue={selectValue}
          />
        </>
      ) : null}
    </>
  )
}

export default LineGraph
