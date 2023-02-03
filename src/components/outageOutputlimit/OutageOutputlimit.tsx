import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PlannedList, PlannedListApiSpec } from '../../models/outageOutputLimit'
import { SalesOutageCardModel } from '../../models/outageOutputLimit/SalesOutageModel'
import { TimeLineChartsList } from '../../models/outageOutputLimit/TimelineChartModel'
import { DpmService } from '../../services/DpmServices'
import { ApiParamUtils } from '../../utils/apiUtils/ApiParamUtils'
import { getLineChartSalesData } from './../../utils/outageOutputLimit/OutageOutputLimitUtils'
import { ApiErrorConstant, ApiResponseConstant, AppConstant, URLConstants, ValueOfConstant } from '../../utils/AppConstants'
import { localStorageUtils } from '../../utils/LocalStorageUtils'
import {
  getFiscalYear, getFiscalYearTimestamp, getFormattedUnitId, getGeneratorDropdownData, getOtherUnits, getSelectedUnitID
} from '../../utils/utils'
import LoadingError from '../common/LoadingError'
import PageHeader from '../common/PageHeader'
import Spinner from '../common/Spinner'
import { useXaxis } from './../../hooks/outageOutputLimit/ChartXaxis'
import { getPlannedList, getUnitPlannedList, mapImpactOfOutageApiResponse, mapOutageApiResponse, mapSellingPriceAtOutageApiResponse, mapTimeOutageAtOutageApiResponse } from './../../utils/outageOutputLimit/OutageOutputLimitUtils'
import { KpiApiRes } from '../../models/outageOutputLimit/StoppageDataModel'
import ImpactOfOutage from './impactOfOutage/ImpactOfOutage'
import GeneratorDropDown from '../common/GeneratorDropDown'
import OutageHeader from './OutageHeader'
import OutageChartLegends from './outageLimitCharts/OutageChartLegends'
import OutageLineChart from './outageLimitCharts/OutageLineChart'
import OutageUnitWiseLineChart from './outageLimitCharts/OutageUnitWiseLineChart'
import TimeLineChartOtherUnits from './outageLimitCharts/TimeLineChartOtherUnits'
import TimeLineChartPlannedUnit from './outageLimitCharts/TimeLineChartPlannedUnit'
import SalesStats from './salesOutage/SalesStats'
import TimeOfOutage from './timeOfOutage/TimeOfOutage'
import "../../assets/scss/outageOutputLimit/_outage.scss"
import '../../assets/scss/outageOutputLimit/_planoutage.scss'

const OutageOutputlimit = () => {
  const { i18n } = useTranslation();
  const [outageOutputlimitData, setOutageOutputlimitData] = useState([] as PlannedList)
  const [sellingPriceAtOutageData, setSellingPriceAtOutage] = useState([] as SalesOutageCardModel[])
  const [imapctOfOutage, setImapctOfOutage] = useState([])
  const [salesData, setSalesData] = useState([])
  const [kpiResponse, setKpiResponse] = useState(true)
  const [stopageResponse, setStopageResponse] = useState(true)
  const [salesStatus, setSalesStatus] = useState()
  const [timeOfOutageAtOutageData, setTimeOfOutageAtOutage] = useState([])
  const [errorThrown, seterrorThrown] = useState(null)
  const selectedUserPreference = localStorageUtils.getSelectedPlantUserPreferance()
  const units = getGeneratorDropdownData(selectedUserPreference?.generators)
  const [unitCode, setUnitCode] = useState(`${ApiParamUtils.plantId()}_${units && units[0].value}0`)
  const [selectedUnitId, setSelectedUnitId] = useState(
    localStorageUtils.getSelectedUnitId() || getFormattedUnitId(units && units[0].value)
  )

  const { xaxisMin, xaxisMax, setXaxisMin, setXaxisMax } = useXaxis()
  const selectedUnit = localStorageUtils.getSelectedUnit()
  const isUnitWiseView = (selectedUnit !== AppConstant.OVERVIEW);
  const fiscalYear = getFiscalYear()

  const timelineSeries: TimeLineChartsList = getPlannedList(
    i18n,
    selectedUnitId,
    fiscalYear,
    outageOutputlimitData
  )
  const chartData = {
    className: 'main-timeline-chart',
    timelinecharts: timelineSeries,
    selectYear: fiscalYear,
    xaxisMin: xaxisMin,
    xaxisMax: xaxisMax,
    setXaxisMin,
    setXaxisMax,
    isUnitWiseView
  }

  const unitTimelinechartSeries: TimeLineChartsList = getUnitPlannedList(
    i18n,
    selectedUnitId,
    fiscalYear,
    outageOutputlimitData
  )
  const otherUnitList = getOtherUnits(selectedUnit);
  const subChartData = {
    className: 'sub-timeline-chart',
    timelinecharts: unitTimelinechartSeries,
    selectYear: fiscalYear,
    xaxisMin: xaxisMin,
    xaxisMax: xaxisMax,
    noOfUnits: otherUnitList?.length || ValueOfConstant.VALUE_0,
    setXaxisMin,
    setXaxisMax
  }

  const outageLineChartData = {
    className: 'outage-line-chart',
    prices: getLineChartSalesData(salesData),
    selectYear: fiscalYear,
    xaxisMin: xaxisMin,
    xaxisMax: xaxisMax,
    noOfUnits: otherUnitList?.length || ValueOfConstant.VALUE_0,
    setXaxisMax,
    setXaxisMin
  }

  const handleGeneratorSelection = (e: any) => {
    setSelectedUnitId(getFormattedUnitId(e.value))
    let unitcode = `${ApiParamUtils.plantId()}_${e.value}0`
    setUnitCode(unitcode)
  }
  
  useEffect(() => {
    setXaxisMin(getFiscalYearTimestamp(fiscalYear))
    setXaxisMax(getFiscalYearTimestamp(fiscalYear + 1))
    setSelectedUnitId(getSelectedUnitID());
    DpmService.fetchStoppageData(
      ApiParamUtils.plantId(),
      ApiParamUtils.unitCode(),
    )
      .then((res) => {
        res = res.data;
        if (res.Success) {
          setStopageResponse(res.Success)
          if(res.Data.length > 0) {
            let outageOutputResponse = res.Data as PlannedListApiSpec;
            let mappedResponse = mapOutageApiResponse(outageOutputResponse);
            setOutageOutputlimitData(mappedResponse)
          }
          else  setOutageOutputlimitData([])
        } else {
          throw new Error(ApiErrorConstant.NO_DATA);
        }
      })
      .catch((error) => {
        setStopageResponse(false)
        seterrorThrown(error)
      })
    }, [fiscalYear,setXaxisMax,setXaxisMin])

  useEffect(() => {
    DpmService.fetchKPI_004Data(ApiParamUtils.plantId(),ApiParamUtils.unitCode())
      .then((res) => {
        res = res.data;
        if (res.Success) {
          setKpiResponse(res.Success)
          let kpiResponse = res.Data as KpiApiRes;
          let mappedImpactResponse = mapImpactOfOutageApiResponse(i18n, kpiResponse);
          let mappedTimeOfOutageResponse = mapTimeOutageAtOutageApiResponse(i18n, kpiResponse);
          let mappedSellingResponse = mapSellingPriceAtOutageApiResponse(i18n, kpiResponse);
          setImapctOfOutage(mappedImpactResponse);
          setTimeOfOutageAtOutage(mappedTimeOfOutageResponse)
          setSellingPriceAtOutage(mappedSellingResponse);
          }
        })
        .catch((error) => {
         setKpiResponse(false)
         seterrorThrown(error)
        })
  }, [i18n])

  useEffect(() => {
    DpmService.fetchSalesData(ApiParamUtils.plantId(), unitCode)
      .then((res) => {
        if(res.status === ApiResponseConstant.STATUS_200){
          setSalesStatus(res.status)
          setSalesData(res.data.SALES)
        }
      })
      .catch((error) => {
        setSalesStatus(error)
        seterrorThrown(error)
      })
  }, [selectedUnitId, unitCode])
  if ( salesStatus === ApiResponseConstant.STATUS_200 &&  kpiResponse === true &&  stopageResponse === true) {
    return (
      <>
      <PageHeader title={i18n.t('OUTAGE_AND_OUTPUT_LIMIT.TITLE')} />
        <h6 className="uk-text-capitalize mt-24">
          {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.SECTION_ONE_HEADING')}
        </h6>
        <div className="uk-grid uk-width-medium" uk-grid="true">
          {!isUnitWiseView && (
            <GeneratorDropDown
              onSelectHandler={handleGeneratorSelection}
              selectValue={selectedUnitId}
              data={units}
              label={i18n.t(
                'UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.GENERATOR'
              )}
            />
          )}
        </div>
        {!isUnitWiseView && (
          <div className="uk-card mt-24 uk-text-center" uk-card="true">
            <TimeLineChartPlannedUnit {...chartData} />
            <TimeLineChartOtherUnits {...subChartData} />
            <OutageLineChart {...outageLineChartData} />
            <OutageChartLegends />
          </div>
        )}
        {isUnitWiseView && (
          <>
            <div className="uk-card mt-24 uk-text-center" uk-card="true">
              <TimeLineChartPlannedUnit {...chartData} />
              <OutageUnitWiseLineChart {...outageLineChartData} />
              <OutageChartLegends />
            </div>
          </>
        )}
      {kpiResponse === true ? 
        <>
        <OutageHeader
          title={i18n.t('OUTAGE_OUTPUTLIMIT_TITLE.IMPACT_EBITDA')}
        />
        <div
          className="uk-grid uk-child-width-1-3@s uk-child-width-1-3@m ml--25"
          uk-grid="true"
        >
          {imapctOfOutage.map((impactObj, index) => {
            return (
              <div className="uk-first-column" key={index}>
                <ImpactOfOutage {...impactObj} />
              </div>
            )
          })}
        </div>
        {timeOfOutageAtOutageData.length > 0 &&
         <TimeOfOutage timeOfOutageAtOutageData={timeOfOutageAtOutageData} />
        }
        <h5 className="mb-24 mt-24 font-18">
          {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.SECTION_FOUR_HEADING')}
        </h5>
        <div
          className="uk-grid uk-child-width-1-3@s uk-child-width-1-3@m"
          uk-grid="true"
        >
          {sellingPriceAtOutageData.map((salesObj, index) => {
            return (
              <div className="uk-first-column" key={index}>
                <SalesStats {...salesObj} />
              </div>
            )
          })}
        </div>
        </>
       : null }
        <div className="uk-grid uk-flex-middle uk-form-control uk-margin-remove">
          <div className="uk-form-control uk-width-1-1 pl-0">
            <div className="uk-flex uk-flex-right mt-40">
              <div className="mr-auto">
                <button className="uk-button uk-button-primary">
                  <a
                    className="oot_button"
                    href={`${
                      URLConstants.OOT_APP_URL === undefined || ''
                        ? ''
                        : URLConstants.OOT_APP_URL
                    }`}
                    target={`${
                      URLConstants.OOT_APP_URL === undefined || ''
                        ? ''
                        : '_blank'
                    }`}
                    rel="noopener noreferrer"
                  >
                    {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.MOVE_TO_OOT_SCREEN')}
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
   
  } 
  else if (errorThrown !== null) {
    return <LoadingError />
  } else {
    return <Spinner />
  }
}

export default OutageOutputlimit
