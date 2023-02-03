import React from 'react'
import { AnnualImpactModel } from '../../../../models/outageOutputLimit/AnnualImpactModel'
import { useTranslation } from 'react-i18next'
import { cssClassName } from '../../../../utils/CssConstants'
import Tooltip from '../../../common/Tooltip'
import { getDiffOfValues, IsappearTooltip, prefixSign } from '../../../../utils/utils'
import { AppConstant, OutageOutputConstant } from '../../../../utils/AppConstants'

const AnnualImpact = ({
  impactVal,
  impactPreviousVal,
  suffix,
  variation
}: AnnualImpactModel) => {
  const { i18n } = useTranslation()
  let valOfSign = AppConstant.PREFIX
  let diffImpactVal = getDiffOfValues(impactVal,impactPreviousVal)
  
  return (
    <>
      <div className="media-mb-20">
        <div className="uk-flex uk-flex-middle">
          <span className="uk-up-icon uk-text-center uk-inline mr-10">
            <i
              className={`jera uk-position-center font-32 ${variation === OutageOutputConstant.POSITIVE_VAL
                  ? `${cssClassName.JERA_LIKE_ICON_CLASS}`
                  : `${cssClassName.JERA_DISLIKE_ICON_CLASS}`
              }`}
            ></i>
          </span>
          <h6
            className={`uk-margin-remove font-14 ${
              variation === OutageOutputConstant.POSITIVE_VAL
                ? `${cssClassName.COLOR_GREEN_60}`
                : `${cssClassName.COLOR_RED_60}`
            }`}
          >
            {prefixSign(valOfSign,variation)}
            {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.IMPACT')}
            <div>
              <span className={`mt-5 mb-0 uk-text-bold font-14 
                      ${cssClassName.COLOR_WHITE}
                      ${IsappearTooltip(diffImpactVal)} `}
              >
                {prefixSign(impactVal,variation)}
                {impactVal}
                <span className="font-8 uk-text-normal uk-text-capitalize">
                  {suffix}
                </span>
                {diffImpactVal === true ? (
                  <Tooltip
                    prefix={prefixSign(impactPreviousVal,variation)}
                    previousDayValue={impactPreviousVal}
                    unit={suffix}
                  />
                ) : null}
              </span>
            </div>
          </h6>
        </div>
      </div>
    </>
  )
}

export default AnnualImpact
