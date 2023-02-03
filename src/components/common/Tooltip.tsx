import React from 'react'
import { useTranslation } from 'react-i18next'
import { TooltipModel } from '../../models/TooltipModel'
import { cssClassName } from '../../utils/CssConstants'

const Tooltip = ({prefix, previousDayValue, unit, customClass}:TooltipModel) => {
  const { i18n } = useTranslation();
  return (
    <>
      <div className={`${customClass ? customClass : "uk-transdorm-origin-center-bottom uk-tooltip-bottom-center uk-transform-origin-center-bottom"} uk-tooltip uk-animation-fade-up uk-animation-center uk-togglabe-enter uk-text-left font-10 uk-text-center font-normal`}>
        <span className={`${cssClassName.COLOR_GREY_BLUE_80} uk-display-block`}>
          {i18n.t('UNIT_OPERATION.PREVIOUS_DAY')}
        </span>
        <span className="font-10 uk-text-bold uk-display-block mt-5">{prefix}{previousDayValue}&nbsp;{unit}</span>
      </div>
    </>
  )
}

export default Tooltip
