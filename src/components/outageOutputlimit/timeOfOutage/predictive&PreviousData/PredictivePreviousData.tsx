import React from 'react'
import { useTranslation } from 'react-i18next'
import OutageHeader from '../../OutageHeader'
import PlannedOutageData from './PlannedOutageData'
import {TimeOfOutageModel} from '../../../../models/outageOutputLimit/TimeOfOutageModel'
import { PlannedOutageDataModel } from '../../../../models/outageOutputLimit/PlannedOutageDataModel'
import CustomPie from '../../../common/customPie/CustomPie'

const PredictivePreviousData = ({donutchartData4_1,donutchartData3_31,plannedPositive,plannedNegative,plannedNegativeStartTopresent,plannedPositiveStartTopresent}:TimeOfOutageModel) => {
  const { i18n } = useTranslation();
  const pieChartRenderSize = 160;
  return (
    <>
      <div className="uk-width-expand@m">
        <div className="uk-card mb-20">
          <OutageHeader title={i18n.t('LABELS.YEAR_START_TO_PRESENT')} />
          <div
            className="uk-grid uk-grid-small uk-child-width-1-3@s uk-child-width-1-3@m mm-10"
            uk-grid="true"
          >
            <div className="media-mb-20 pl-10">
              {plannedNegativeStartTopresent?.map((plannedObj: PlannedOutageDataModel, index: React.Key | null | undefined) => {
                return (
                  <div key={index}>
                    <PlannedOutageData
                      planTitle={i18n.t(plannedObj.planTitle)}
                      planVal={plannedObj.planVal}
                      planpreviousVal={plannedObj.planpreviousVal}
                      suffix={plannedObj.suffix}
                      subject={plannedObj.subject}
                      className={plannedObj.className}
                      iconClassName={plannedObj.iconClassName}
                      variation={plannedObj.variation}
                    />
                  </div>
                )
              })}
            </div>
            <div className="pl-10">
              {plannedPositiveStartTopresent?.map((plannedObj:PlannedOutageDataModel, index: React.Key | null | undefined) => {
                return (
                  <div key={index}>
                    <PlannedOutageData
                      planTitle={i18n.t(plannedObj.planTitle)}
                      planVal={plannedObj.planVal}
                      planpreviousVal={plannedObj.planpreviousVal}
                      suffix={plannedObj.suffix}
                      subject={plannedObj.subject}
                      className={plannedObj.className}
                      iconClassName={plannedObj.iconClassName}
                      variation={plannedObj.variation}
                    />
                  </div>
                )
              })}
            </div>
            <div className="uk-text-center mt--35">
              <div className="uk-flex uk-flex-center uk-flex-middle uk-flex-column chart-100 uk-margin-auto-left uk-margin-auto-right">
                {donutchartData4_1 !== undefined &&
                  donutchartData4_1 !== null && (
                  <CustomPie 
                     data={donutchartData4_1} 
                     width={pieChartRenderSize}
                     height={pieChartRenderSize}
                     />
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="uk-card">
          <OutageHeader title={i18n.t('LABELS.PRESENT_TO_YEAR_END')} />
          <div
            className="uk-grid uk-grid-small uk-child-width-1-3@s uk-child-width-1-3@m mm-10"
            uk-grid="true"
          >
            <div className="media-mb-20 pl-10">
              {plannedNegative?.map((plannedObj:PlannedOutageDataModel, index: React.Key | null | undefined) => {
                 return (
                  <div key={index}>
                    <PlannedOutageData
                      planTitle={i18n.t(plannedObj.planTitle)}
                      planVal={plannedObj.planVal}
                      planpreviousVal={plannedObj.planpreviousVal}
                      suffix={plannedObj.suffix}
                      subject={plannedObj.subject}
                      className={plannedObj.className}
                      iconClassName={plannedObj.iconClassName}
                      variation={plannedObj.variation}
                    />
                  </div>
                )
              })}
            </div>
            <div className="pl-10">
              {plannedPositive?.map((plannedObj:PlannedOutageDataModel, index: React.Key | null | undefined) => {
                return (
                  <div key={index}>
                    <PlannedOutageData
                      planTitle={i18n.t(plannedObj.planTitle)}
                      planVal={plannedObj.planVal}
                      planpreviousVal={plannedObj.planpreviousVal}
                      suffix={plannedObj.suffix}
                      subject={plannedObj.subject}
                      className={plannedObj.className}
                      iconClassName={plannedObj.iconClassName}
                      variation={plannedObj.variation}
                    />
                  </div>
                )
              })}
            </div>

            <div className="uk-text-center mt--35">
              <div className="uk-flex uk-flex-center uk-flex-middle uk-flex-column chart-100 uk-margin-auto-left uk-margin-auto-right">
                {donutchartData3_31 !== undefined &&
                  donutchartData3_31 !== null && (
                  <CustomPie 
                     data={donutchartData3_31} 
                     width={pieChartRenderSize}
                     height={pieChartRenderSize}
                     />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PredictivePreviousData;
