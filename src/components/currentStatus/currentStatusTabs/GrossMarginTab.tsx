import React from 'react'
import { ChartColors, ChartGradientType, ChartType, AppConstant } from '../../../utils/AppConstants'
import { DonutChartCustomData } from '../../../models/DonutChartDataModel';
import i18n from '../../../translations/i18n';
import { GetDonutChartSeriesAndValueForCurrentStatus } from '../../../utils/utils';
import GrossMarginTabDonutChart from '../currentStatusCharts/GrossMarginTabDonutChart';
import BarRechart from '../../common/AnnualBar';

const GrossMarginTab = ({ annualBarData, GrossMargin } : any): JSX.Element => {
  const pieChartRenderSize = 150;
  let grossMarginCustomData: DonutChartCustomData = {
      header: i18n.t("CURRENT_STATUS.GROSS_MARGIN"),
      type: ChartType.LARGE,
      color: ChartColors._66A428,
      chartGradientType: ChartGradientType.GREEN,
      gradientColor1: ChartColors._9FCD72,
      gradientColor2: ChartColors._66A428,
  }

  let grossMarginData = GetDonutChartSeriesAndValueForCurrentStatus(i18n, grossMarginCustomData, GrossMargin);
  const colorGradient ={
    gradientColor1: ChartColors._9FCD72,
    gradientColor2: ChartColors._66A428,
  }

  return (
      <>
        <li className="uk-active">
          <div className="uk-grid-match pb-20 uk-grid" uk-grid="true">
                <div className="uk-margin-bottom@s uk-width-1-2@m uk-first-column">
                  <div className="uk-card uk-height-1-1 uk-text-center">
                    <BarRechart data={annualBarData} height={192} tickCount={4} colorGradient={colorGradient} type={AppConstant.GROSSMARGIN} barSize={20}></BarRechart>
                  </div>
                </div>
                <div className="uk-margin-bottom@s uk-width-1-2@m">
                  <div className="uk-card uk-card-body uk-flex uk-flex-column">
                    <h6 className="font-16">{grossMarginData.header}</h6>
                    <GrossMarginTabDonutChart 
                      data={grossMarginData} 
                      actualData={GrossMargin}
                      width={pieChartRenderSize}
                      height={pieChartRenderSize}
                    />
                  </div>
                </div>
              </div>
        </li>
      </>
  );
}

export default GrossMarginTab