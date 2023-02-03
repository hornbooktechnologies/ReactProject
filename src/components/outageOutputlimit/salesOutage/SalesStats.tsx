import { useTranslation } from 'react-i18next'
import { SalesOutageCardModel } from '../../../models/outageOutputLimit/SalesOutageModel'
import { AppConstant } from '../../../utils/AppConstants'
import { getDiffOfValues, IsappearTooltip } from '../../../utils/utils'
import Tooltip from '../../common/Tooltip'
import './../../../assets/scss/outageOutputLimit/_outage.scss'

const SalesStats = (props: SalesOutageCardModel) => {
  const { i18n } = useTranslation()
  let diffPlannedPlan = getDiffOfValues(props.plannedPlan,props.plannedPreviousPlan)
  let diffPlannedActual = getDiffOfValues(props.plannedActual,props.plannedPreviousActual)
  let diffUnplannedActual = getDiffOfValues(props.unplannedActual,props.unplannedPreviousActual)

  return (
    <div className="uk-card">
      <h6 className="font-18">{props.header}</h6>
      <label className="font-14">
        {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.PLANNED_PLAN')}
      </label>
      <div className="font-20 uk-text-bold uk-margin-remove mb-20">
        <span
          className={`${IsappearTooltip(diffPlannedPlan)}`}
        >
          {props.plannedPlan}
          {diffPlannedPlan === true ? (
            <Tooltip
              prefix={''}
              previousDayValue={props.plannedPreviousPlan}
              unit={AppConstant.OUTAGE_MEASURE_UNIT}
            />
          ) : null}
          <span className="font-10 uk-text-normal">
            {AppConstant.OUTAGE_MEASURE_UNIT}
          </span>
        </span>
        <span className="font-10 uk-text-normal">
          {(props.plannedPlanSubValue || props.plannedPlanSubValue === 0) && (
            <span className="font-16">
              (<span>{props.plannedPlanSubValue}</span>
              <span className="font-10">
                {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.OUTAGE_PRICE_SUB_UNIT')}
              </span>)
            </span>
          )}
       </span>
      </div>
      <div
        className="uk-child-width-1-1@s uk-child-width-1-2@m uk-grid"
        uk-grid="true"
      >
        <div>
          <p className="uk-margin-remove font-14">
            {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.PLANNED_ACTUAL')}
          </p>
          <div className="uk-margin-remove uk-text-bold font-20">
            <span className={`${IsappearTooltip(diffPlannedActual)}`}>
              {props.plannedActual}
              <span className="font-10 uk-text-normal">
                {AppConstant.OUTAGE_MEASURE_UNIT}
              </span>
              {diffPlannedActual === true ? (
                <Tooltip
                  prefix={''}
                  previousDayValue={props.plannedPreviousActual}
                  unit={AppConstant.OUTAGE_MEASURE_UNIT}
                />
              ) : null}
            </span>
            <span className="uk-text-normal">
              {(props.plannedActualSubValue ||
                props.plannedActualSubValue === 0) && (
                <span className="font-16">
                  (<span>{props.plannedActualSubValue}</span>
                  <span className="font-10">
                    {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.OUTAGE_PRICE_SUB_UNIT')}
                  </span>
                  )
                </span>
              )}
            </span>
          </div>
        </div>
        <div>
          <p className="uk-margin-remove font-14">
            {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.UNPLANNED_ACTUAL')}
          </p>
          <div className="uk-margin-remove uk-text-bold font-20">
            <span className={`${IsappearTooltip(diffUnplannedActual)}`} >
              {props.unplannedActual}
              <span className="font-10 uk-text-normal">
                {AppConstant.OUTAGE_MEASURE_UNIT}
              </span>
              {diffUnplannedActual === true ? (
                <Tooltip
                  prefix={''}
                  previousDayValue={ props.unplannedPreviousActual}
                  unit={AppConstant.OUTAGE_MEASURE_UNIT}
                />
              ) : null}
            </span>
            <span className="font-10 uk-text-normal">
              {(props.unplannedActualSubValue ||
                props.unplannedActualSubValue === 0) && (
                <span className="font-16">
                 (<span>{props.unplannedActualSubValue}</span>
                 <span className="font-10">
                   {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.OUTAGE_PRICE_SUB_UNIT')}
                 </span>
                 )
               </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesStats
