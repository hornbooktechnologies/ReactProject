import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiParamUtils } from '../../../utils/apiUtils/ApiParamUtils'
import useStateRef from 'react-usestateref'
import {
  AnnualTargetConstant,
  AppConstant,
  DateformatConstant,
  ChartConstant,
  UserPrefModelConstant,
} from '../../../utils/AppConstants'
import {
  generatorDropdownUnit,
  getFormattedUnitId,
  getGeneratorDropdownData,
} from '../../../utils/utils'
import LinechartDropDown from '../../common/Dropdown'
import GeneratorDropDown from '../../common/GeneratorDropDown'
import DataChangeOptions from '../../common/DataChangeOptions'
import { FetchData } from './LinechartData'
import Moment from 'moment'
import SpreadLineChart from './SpreadLineChart'
import { localStorageUtils } from '../../../utils/LocalStorageUtils'
import {
  SpecificationSpreadDataModel,
  SpreadLineChartBaseDataModel,
  titleDropdownModel,
} from '../../../models/unitOperation/UnitOperationModel'
import { getCutoffFractionTime } from '../../../utils/utils'
import { linechartDataModel } from '../../../models/LinechartModel'

const SpecificationSpread = (props: SpecificationSpreadDataModel) => {
  const { i18n } = useTranslation()
  const selectedUserPreference = localStorageUtils.getSelectedPlantUserPreferance()
  const units = getGeneratorDropdownData(selectedUserPreference?.generators)
  const [selectedUnitId, setSelectedUnitId] = useState(
    localStorageUtils.getSelectedUnitId() ||
      getFormattedUnitId(units && units[0].value)
  )
  const [selectValue, setSelectValue] = useState(
    AnnualTargetConstant.ANNUAL_DATA
  )
  const [startDate, setStartDate] = useState(new Date(props.time * 1000))
  const [linechartData, setLinechartData] = useState<
    linechartDataModel | undefined
  >()
  const [titleDropdown, setTitleDropdown] = useState([])
  const [selectedTitleDropdown, setSelectedTitleDropdown] = useState('')
  const [ind, setIndex, indexref] = useStateRef<any>()
  const powerPlantUnitId =  UserPrefModelConstant.POWER_PLANT_UNIT_ID
  const powerTitle = UserPrefModelConstant.POWER_TITLE
  let propsData  = props.spreadOperation

  useEffect(() => {
    if (linechartData && linechartData.graphData === null && ind === 0) {
      props.noDataHandler(getCutoffFractionTime(), selectValue)
    } else {
    }
  }, [linechartData, props, selectValue, startDate, ind])

  let spreadLineChartdata: SpreadLineChartBaseDataModel[]  = []
  let dataEstList = []
  let list = []
  var SpreadList

  if (linechartData && linechartData.graphData) {
    let parsed = JSON.parse(linechartData.graphData)
    let linechartDataObj = {
      Period: String,
      Spread: Number,
      Estimates: Number,
      TimeStamp: Number,
      powerPlantUnitId: String,
      powerTitle: String,
    }
  for (const key in parsed.Period) {
      let graphData = Object.create(linechartDataObj)
      if (parsed.Period[key]) {
        graphData.Period = parsed.Period[key]
        graphData.Spread = parsed.Spread[key]
        graphData.powerPlantUnitId = parsed[powerPlantUnitId]
        graphData.poweTitle = parsed[powerTitle]
        let epoch = new Date(parsed.Period[key])
        graphData.TimeStamp = epoch.getTime()
        if (selectValue === ChartConstant.MONTHLY_DATA) {
          if (Moment(graphData.Period).format(DateformatConstant.DDD) === DateformatConstant.SUN) {
            list.push(
              Moment(graphData.Period).format(DateformatConstant.YYYY_MM_DDT00)
              )
            }
          }
          spreadLineChartdata.push(graphData)
      }
    }

    for (const d in parsed.Estimates) {
      let dataEs = Object.create(linechartDataObj)
      dataEs.Estimates = parsed.Estimates[d]
      dataEstList.push(dataEs.Estimates)
    }

    SpreadList = parsed.Spread.filter(function (el: null) {
      return el != null
    })

    //ticks - in Y-axis .
    var min = Math.min(...SpreadList)
    var max = Math.max(...SpreadList)
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

  useEffect(() => {
    let titleDropdownData: titleDropdownModel[] = []
    const getIndexing = (e: object) => {
      let parsed1 = e
      setIndex(0)
      for (let [key, value] of Object.entries(parsed1)) {
        let maxDate2: number
        let minDate1: number
        if (value && value.Period) {
          minDate1 = new Date(value.Period[0]).getTime()
          var filteredPeriod = value.Period.filter(function (el: string) {
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
        if (selectedUnitId === value[powerPlantUnitId]) {
          titleDropdownData.push({
            label: value[powerTitle],
            value: value[powerTitle],
          })
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
      setTitleDropdown([...titleDropdownData])
    }
    const getDataOfPreNext = (preNextButton: boolean) => {
      switch (selectValue) {
        case ChartConstant.ANNUAL_DATA:
          if (!preNextButton) {
            getIndexing(propsData?.Annual)
          }
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
          setLinechartData(
            FetchData(
              propsData?.Monthly,
              indexref.current,
              startDate,
              ChartConstant.MONTHLY_DATA
            )
          )
          break

        default:
          if (!preNextButton) {
            getIndexing(propsData?.Annual)
          }
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
    propsData?.Monthly,
    selectedUnitId,
    i18n,
    powerPlantUnitId,
    powerTitle
  ])
  
  const handleGeneratorSelection = (e: any) => {
    setSelectedUnitId(getFormattedUnitId(e.value))
    setSelectedTitleDropdown(spreadLineChartdata[0]?.poweTitle)
  }
  const onSelectHandler = (e: { label: string; value: string }) => {
    setSelectValue(e.value)
  
  }
  const handleTitleEvent = (e: React.ChangeEvent<{ value: string }>) => {
    setSelectedTitleDropdown(e.value)
  }
  const getDataOfPreNext = () => {
    switch (selectValue) {
      case ChartConstant.ANNUAL_DATA:
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
        setLinechartData(
          FetchData(
            propsData?.Monthly,
            indexref.current,
            startDate,
            ChartConstant.MONTHLY_DATA
          )
        )
        break
      default:
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

  useEffect(() => {
    setSelectedTitleDropdown(titleDropdown && titleDropdown[0]?.value)
  }, [titleDropdown])

  //Prev
  let onClickPrev = () => {
    setIndex(parseInt(ind) - 1)
    getDataOfPreNext()
  }
  //Next
  let onClickNext = () => {
    setIndex(parseInt(ind) + 1)
    getDataOfPreNext()
  }

  let titleDropdownValue =titleDropdown&& titleDropdown.filter( (ele :any, ind) => ind === titleDropdown.findIndex( elem => elem.label === ele.label && elem.value === ele.value))

  return (
    <div>
      <h5 className="mb-24 mt-24 font-18 uk-text-medium">
        {i18n.t('UNIT_OPERATION.SPECIFICATION_SPREAD')}
      </h5>
      <div className="uk-flex uk-flex-middle uk-flex-wrap mb-20 align-end">
        <div className="uk-flex uk-flex-center">
          {ApiParamUtils.unitName() === AppConstant.OVERVIEW ? (
            <GeneratorDropDown
              onSelectHandler={handleGeneratorSelection}
              selectValue={selectedUnitId}
              data={generatorDropdownUnit()}
              label={i18n.t(
                'UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.GENERATOR'
              )}
              customClass="width-100"
            />
          ) : null}
         
          <GeneratorDropDown
            onSelectHandler={handleTitleEvent}
            selectValue={selectedTitleDropdown}
            data= {titleDropdownValue}
            label={i18n.t('UNIT_OPERATION.DROPDOWN_TITLE')}
            customClass="width-100"
          /> 
          <LinechartDropDown
            onSelectHandler={onSelectHandler}
            selectValue={selectValue}
            cumulativeDisable={false}
            customClass="align-end mb-0"
            isSpreadOptions={true}
          />

        </div>
        <DataChangeOptions
          linechartData={linechartData}
          onClickPrev={onClickPrev}
          startDate={startDate}
          selectValue={selectValue}
          setStartDate={setStartDate}
          onClickNext={onClickNext}
          ind={ind}
          customClass={`${
            linechartData?.currentDisable === true
              ? 'date-picker-specification'
              : 'date-picker-return'
          }`}
        />
      </div>
      <SpreadLineChart
        data={spreadLineChartdata}
        selectValue={selectValue}
        list={list}
        selectedUnitId={selectedUnitId}
        selectedTitleDropdown={selectedTitleDropdown}
      />
    </div>
  )
}

export default SpecificationSpread
