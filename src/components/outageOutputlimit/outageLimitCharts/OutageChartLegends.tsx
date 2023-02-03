import { useTranslation } from "react-i18next";

const OutageChartLegends = () => {
  const { i18n } = useTranslation()
  return (
    <div className="timeseries-legends">
      <div className="uk-flex uk-flex-middle uk-flex-center" uk-flex="">
        <div className="uk-flex uk-flex-middle pl-20 mb-10 ml-10 mr-10">
          <span className="indicate actualLegend"></span>
          <div className="ml-10">
            <p className="uk-margin-remove font-12">
              {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.CHART_LEGENDS.ACTUAL')}
            </p>
          </div>
        </div>
        <div className="uk-flex uk-flex-middle pl-20 mb-10 ml-10 mr-10">
          <span className="indicate forecastLegend"></span>
          <div className="ml-10">
            <p className="uk-margin-remove font-12">
              {i18n.t('OUTAGE_AND_OUTPUT_LIMIT.CHART_LEGENDS.FORECAST')}
            </p>
          </div>
        </div>
        <div className="uk-flex uk-flex-middle pl-20 mb-10 ml-10 mr-10">
          <span className="indicate salesLegend"></span>
          <div className="ml-10">
            <p className="uk-margin-remove font-12">
              {i18n.t(
                'OUTAGE_AND_OUTPUT_LIMIT.CHART_LEGENDS.SALES_UNIT_PRICE'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutageChartLegends;