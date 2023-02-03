import React, { Fragment } from 'react'
import AnnualImpact from './AnnualImpact'
import { useTranslation } from 'react-i18next'
import { TimeOfOutageModel } from '../../../../models/outageOutputLimit/TimeOfOutageModel'
import CustomPie from '../../../common/customPie/CustomPie'

const AnnualData = ({
  donutchartAnnualData,
  annualImpact,
}: TimeOfOutageModel) => {
  const { i18n } = useTranslation();
  const pieChartRenderSize = 240;
  return (
    <>
      <div className="uk-width-1-3@m media-mb-20">
        <div className="uk-card uk-height-1-1">
          <h5 className="mb-24 font-18">{i18n.t('LABELS.ANNUAL')}</h5>
          <div
            className="mb-40 ml--25 uk-grid uk-child-width-1-2@s uk-child-width-1-2@m"
            uk-grid="true"
          >
            {annualImpact?.map(
              (impactObj: { impactVal: number , impactPreviousVal :number, suffix:string,variation:string }, index: number) => {
                return (
                  <Fragment key={index}>
                    <AnnualImpact
                      impactVal={impactObj.impactVal} 
                      impactPreviousVal={impactObj.impactPreviousVal} 
                      suffix={impactObj.suffix} 
                      variation={impactObj.variation}/>
                  </Fragment>
                )
              }
            )}
          </div>
          {donutchartAnnualData !== null &&
            donutchartAnnualData !== undefined && (
            <CustomPie 
              data={donutchartAnnualData} 
              width={pieChartRenderSize}
              height={pieChartRenderSize}
              />
            )}
        </div>
      </div>
    </>
  )
}

export default AnnualData
