import React from 'react'
import { PlannedOutageDataModel } from '../../../../models/outageOutputLimit/PlannedOutageDataModel'
import { useTranslation } from 'react-i18next'
import { getDiffOfValues, IsappearTooltip, prefixSign } from '../../../../utils/utils'
import Tooltip from '../../../common/Tooltip'

const PlannedOutageData = ({
  planTitle,
  planVal,
  planpreviousVal,
  suffix,
  subject,
  className,
  iconClassName,
  variation
}: PlannedOutageDataModel) => {
  const { i18n } = useTranslation()
  let diffPlan = getDiffOfValues(planVal,planpreviousVal)

  return (
    <>
      <div className={`uk-flex uk-flex-middle ${className}`}>
        <span className="uk-up-icon uk-text-center uk-inline mr-5">
          <i className={`jera icn-24 ${iconClassName} uk-position-center`}></i>
        </span>
        <div>
          <p className="uk-margin-remove font-14">{planTitle}</p>
          <span className="mb-0 uk-text-bold font-14 mt-5">
            <span
              className={`${IsappearTooltip(diffPlan)}`}>
              {prefixSign(planVal,variation)}
              {planVal}
              <span className="font-8 uk-text-normal ml-3">{suffix}</span>
              {diffPlan === true ? (
                <Tooltip
                  prefix={prefixSign(planpreviousVal,variation)}
                  previousDayValue={planpreviousVal}
                  unit={suffix}
                />
              ) : null}
            </span>
            <span className="font-8 uk-text-normal ml-3">
              <span className="uk-text-bold font-12">
              ({subject}
                <span className="font-8">
                  {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.OUTAGE_PRICE_SUB_UNIT')}
                </span>
                )
              </span>
            </span>
          </span>
        </div>
      </div>
    </>
  )
}

export default PlannedOutageData
