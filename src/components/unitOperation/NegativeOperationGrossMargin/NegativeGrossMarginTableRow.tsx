import React from 'react'
import { NegativeGrossMarginModel } from '../../../models/unitOperation/NegOperationGrossmarginModel'
import i18n from '../../../translations/i18n'
import { cssClassName } from '../../../utils/CssConstants'
import { addCustomClass, getDiffOfValues, IstextHighlight, setTooltipPosition } from '../../../utils/utils'
import Tooltip from '../../common/Tooltip'

const NegativeGrossMarginTableRow = ({negativeGrossMargin}:NegativeGrossMarginModel) => {
  let diffImpactAnnualVal = getDiffOfValues(negativeGrossMargin?.impactOnEBITDAAnnual,negativeGrossMargin?.previousImpactOnEBITDAAnnual)
  let diffImpactPresentVal = getDiffOfValues(negativeGrossMargin?.impactOnEBITDAPresent,negativeGrossMargin?.previousImpactOnEBITDAPresent)
  let diffImpactEndVal = getDiffOfValues(negativeGrossMargin?.impactOnEBITDAEnd,negativeGrossMargin?.previousImpactOnEBITDAEnd)
  let diffPlanAnnualVal = getDiffOfValues(negativeGrossMargin?.planAnnual,negativeGrossMargin?.previousPlanAnnual)
  let diffPlanPresentVal = getDiffOfValues(negativeGrossMargin?.planPresent,negativeGrossMargin?.previousPlanPresent)
  let diffPlanEndVal = getDiffOfValues(negativeGrossMargin?.planEnd,negativeGrossMargin?.previousPlanEnd)
  let diffActualOrForcastAnnualVal = getDiffOfValues(negativeGrossMargin?.actualOrForcastAnnual,negativeGrossMargin?.previousActualOrForcastAnnual)
  let diffActualOrForcastPresentVal = getDiffOfValues(negativeGrossMargin?.actualOrForcastPresent,negativeGrossMargin?.previousActualOrForcastPresent)
  let diffActualOrForcastEndVal =  getDiffOfValues(negativeGrossMargin?.actualOrForcastEnd,negativeGrossMargin?.previousActualOrForcastEnd)

  return (
    <>
      <tr>
        <th className={`${cssClassName.BG_GREY_BLUE_40_A10}`} colSpan={2}>
         {i18n.t("UNIT_OPERATION.IMPACT_SPREAD_EBITDA")} 
        </th>
        <td className={` ${addCustomClass(diffImpactAnnualVal,negativeGrossMargin?.customClassEnd) } uk-text-middle`} >
          <span className={`${cssClassName.COLOR_GREY_BLUE_60} font-12`}>
          {negativeGrossMargin?.prefix}({negativeGrossMargin?.planAnnual} - {negativeGrossMargin?.actualOrForcastAnnual}){negativeGrossMargin?.suffix}
          </span>
          <span  className={` ${IstextHighlight(diffImpactAnnualVal)} font-14 uk-display-block`}>{negativeGrossMargin?.prefix}{negativeGrossMargin?.impactOnEBITDAAnnual}&nbsp;{negativeGrossMargin?.suffix}
        </span>
         {diffImpactAnnualVal === true ? (
           <Tooltip
           prefix={negativeGrossMargin?.prefix}
           previousDayValue={negativeGrossMargin?.previousImpactOnEBITDAAnnual}
           unit={negativeGrossMargin?.suffix}
           customClass={setTooltipPosition(negativeGrossMargin?.customClassEnd)}
         />
       ) : null}
        </td>
        <td className={` ${addCustomClass(diffImpactPresentVal,negativeGrossMargin?.customClassEnd) } uk-text-middle`} >
          <span className={`${cssClassName.COLOR_GREY_BLUE_60} font-12`}>
          {negativeGrossMargin?.prefix}({negativeGrossMargin?.planPresent} - {negativeGrossMargin?.actualOrForcastPresent}){negativeGrossMargin?.suffix}
          </span>
           <span  className={` ${IstextHighlight(diffImpactPresentVal)} font-14 uk-display-block`}>
          {negativeGrossMargin?.prefix}{negativeGrossMargin?.impactOnEBITDAPresent}&nbsp;{negativeGrossMargin?.suffix}
          </span>
          {diffImpactPresentVal === true ? (
           <Tooltip
           prefix={negativeGrossMargin.prefix}
           previousDayValue={negativeGrossMargin.previousImpactOnEBITDAPresent}
           unit={negativeGrossMargin.suffix}
           customClass={setTooltipPosition(negativeGrossMargin.customClassEnd)}
         />
       ) : null}
        </td>
        <td className={` ${addCustomClass(diffImpactEndVal,negativeGrossMargin?.customClassEnd) } uk-text-middle`} >
          <span className={`${cssClassName.COLOR_GREY_BLUE_60} font-12`}>
          {negativeGrossMargin?.prefix}({negativeGrossMargin?.planEnd} - {negativeGrossMargin?.actualOrForcastEnd}){negativeGrossMargin?.suffix}
          </span>
           <span  className={` ${IstextHighlight(diffImpactEndVal)} font-14 uk-display-block`}>
          {negativeGrossMargin?.prefix}{negativeGrossMargin?.impactOnEBITDAEnd}&nbsp;{negativeGrossMargin?.suffix}
          </span>
          {diffImpactEndVal === true ? (
           <Tooltip
           prefix={negativeGrossMargin.prefix}
           previousDayValue={negativeGrossMargin.previousImpactOnEBITDAEnd}
           unit={negativeGrossMargin.suffix}
           customClass={setTooltipPosition(negativeGrossMargin.customClassEnd)}
         />
       ) : null}
        </td>
      </tr>
      <tr>
        <th
          className={`${cssClassName.BG_GREY_BLUE_40_A10} w-220`}
          rowSpan={2}
        >
         {i18n.t("UNIT_OPERATION.GROSSMARGIN_SPREAD")} 
        </th>
        <th className={`${cssClassName.BG_GREY_BLUE_40_A10} w-220`}>
        {i18n.t("LABELS.PLAN")} 
        </th>
        <td className={`${addCustomClass(diffPlanAnnualVal,negativeGrossMargin?.customClassTop) } uk-text-middle`}>
        <span className={`${IstextHighlight(diffPlanAnnualVal)} uk-display-block`}>
          {negativeGrossMargin?.prefix}{negativeGrossMargin?.planAnnual}&nbsp;{negativeGrossMargin?.suffix}
        </span>
        {diffPlanAnnualVal === true ? (
           <Tooltip
           prefix={negativeGrossMargin.prefix}
           previousDayValue={negativeGrossMargin.previousPlanAnnual}
           unit={negativeGrossMargin.suffix}
           customClass={setTooltipPosition(negativeGrossMargin.customClassTop)}
         />
       ) : null}
        </td>
        <td className={`${addCustomClass(diffPlanPresentVal,negativeGrossMargin?.customClassTop) } uk-text-middle`}>
        <span className={`${IstextHighlight(diffPlanPresentVal)} uk-display-block`}>
          {negativeGrossMargin?.prefix}{negativeGrossMargin?.planPresent}&nbsp;{negativeGrossMargin?.suffix}
        </span>
        {diffPlanPresentVal === true ? (
           <Tooltip
           prefix={negativeGrossMargin.prefix}
           previousDayValue={negativeGrossMargin.previousPlanPresent}
           unit={negativeGrossMargin.suffix}
           customClass={setTooltipPosition(negativeGrossMargin.customClassTop)}
         />
       ) : null}
        </td>
        <td className={`${addCustomClass(diffPlanEndVal,negativeGrossMargin?.customClassTop) } uk-text-middle`}>
        <span className={`${IstextHighlight(diffPlanEndVal)} uk-display-block`}>
          {negativeGrossMargin?.prefix}{negativeGrossMargin?.planEnd}&nbsp;{negativeGrossMargin?.suffix}
        </span>
        {diffPlanEndVal === true ? (
           <Tooltip
           prefix={negativeGrossMargin.prefix}
           previousDayValue={negativeGrossMargin.previousPlanEnd}
           unit={negativeGrossMargin.suffix}
           customClass={setTooltipPosition(negativeGrossMargin.customClassTop)}
         />
       ) : null}
        </td>
      </tr>
      <tr>
        <th className={`${cssClassName.BG_GREY_BLUE_40_A10}`}>
          {i18n.t("LABELS.ACTUAL_FORECAST")} 
        </th>
        <td className={`${addCustomClass(diffActualOrForcastAnnualVal,negativeGrossMargin?.customClassTop) } uk-text-middle`}>
        <span className={`${IstextHighlight(diffActualOrForcastAnnualVal)} uk-display-block`}>
          {negativeGrossMargin?.prefix}{negativeGrossMargin?.actualOrForcastAnnual}&nbsp;{negativeGrossMargin?.suffix}
          </span>
          {diffActualOrForcastAnnualVal === true ? (
           <Tooltip
           prefix={negativeGrossMargin.prefix}
           previousDayValue={negativeGrossMargin.previousActualOrForcastAnnual}
           unit={negativeGrossMargin.suffix}
           customClass={setTooltipPosition(negativeGrossMargin.customClassTop)}
         />
       ) : null}
        </td>
        <td className={`${addCustomClass(diffActualOrForcastPresentVal,negativeGrossMargin?.customClassTop) } uk-text-middle`}>
        <span className={`${IstextHighlight(diffActualOrForcastPresentVal)} uk-display-block`}>{negativeGrossMargin?.prefix}{negativeGrossMargin?.actualOrForcastPresent}&nbsp;{negativeGrossMargin?.suffix}</span>
          {diffActualOrForcastPresentVal === true ? (
           <Tooltip
           prefix={negativeGrossMargin.prefix}
           previousDayValue={negativeGrossMargin.previousActualOrForcastPresent}
           unit={negativeGrossMargin.suffix}
           customClass={setTooltipPosition(negativeGrossMargin.customClassTop)}
         />
       ) : null}
        </td>
        <td className={`${addCustomClass(diffActualOrForcastEndVal,negativeGrossMargin?.customClassTop) } uk-text-middle`}>
        <span className={`${IstextHighlight(diffActualOrForcastEndVal)} uk-display-block`}>
          {negativeGrossMargin?.prefix}{negativeGrossMargin?.actualOrForcastEnd}&nbsp;{negativeGrossMargin?.suffix}
          </span>
          {diffActualOrForcastEndVal === true ? (
           <Tooltip
           prefix={negativeGrossMargin.prefix}
           previousDayValue={negativeGrossMargin.previousActualOrForcastEnd}
           unit={negativeGrossMargin.suffix}
           customClass={setTooltipPosition(negativeGrossMargin.customClassTop)}
         />
       ) : null}
          </td>
      </tr>
    </>
  )
}

export default NegativeGrossMarginTableRow
