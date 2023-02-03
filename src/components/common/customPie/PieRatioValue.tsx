import { useTranslation } from 'react-i18next'
import { getDiffOfValues, IsappearTooltip } from '../../../utils/utils';
import Tooltip from '../Tooltip';

type Props = {
    forecastHrs: number
    forecastpreviousHrs: number
    planHrs: number
    planpreviousHrs: number
    actual: boolean
    suffix:string
}

const PieRatioValue = (props: Props) => {
    const { forecastHrs, actual, planHrs,forecastpreviousHrs,planpreviousHrs,suffix} = props;
    const { i18n } = useTranslation()
    let difForecast = getDiffOfValues(forecastHrs,forecastpreviousHrs)
    let diffPlan =  getDiffOfValues(planHrs,planpreviousHrs)
     
    return (
      <>
        <div className="uk-text-center">
          <div className="uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-margin-auto-left uk-margin-auto-right">
            <div className="uk-border-dashed uk-width-medium">
              <h3 className="uk-margin-remove font-20 mb-5">
                <span className={`${IsappearTooltip(difForecast)}`}>
                  {forecastHrs}
                  <span className="font-8 uk-text-normal ml-3">{suffix}</span>
                {difForecast === true ? (
                  <Tooltip
                    previousDayValue={forecastpreviousHrs}
                    unit={suffix}
                  />
                ) : null}
                </span>
              </h3>
              <p className="font-12 mt-0 mb-10">
                {actual ? i18n.t('LABELS.ACTUAL') : i18n.t('LABELS.FORECAST')}
              </p>
            </div>
            <div className="uk-width-medium">
              <p className="font-12 mt-10 mb-0">{i18n.t('LABELS.PLAN')}</p>
              <h3
                className="uk-margin-remove font-20">
                <span className={`${IsappearTooltip(diffPlan)}`}>
                {planHrs}
                  <span className="font-8 uk-text-normal ml-3">{suffix}</span>
                {diffPlan === true ? (
                  <Tooltip previousDayValue={planpreviousHrs} unit={suffix} />
                ) : null}
                 </span>
              </h3>
            </div>
          </div>
        </div>
      </>
    )
}

export default PieRatioValue