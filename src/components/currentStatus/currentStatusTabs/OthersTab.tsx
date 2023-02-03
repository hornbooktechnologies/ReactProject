import  React  from 'react'
import { ChartColors, ChartGradientType, ChartType } from '../../../utils/AppConstants'
import { DonutChartCustomData } from '../../../models/DonutChartDataModel';
import i18n from '../../../translations/i18n';
import { GetDonutChartSeriesAndValueForCurrentStatus } from '../../../utils/utils';
import DonutChartLarge from '../../common/customPie/DonutChartLarge';


const OthersTab = ({ GenerationOutput, Availability, Spread, ThermalEfficiency } : any): JSX.Element => {
  const pieChartRenderSize = 170;
  let generationOutputCustomData: DonutChartCustomData = {
    header: i18n.t("LABELS.ELECT_ENG_SOLD"),
    type: ChartType.LARGE,
    color: ChartColors._9FCD72,
    chartGradientType: ChartGradientType.GREEN,
    gradientColor1: ChartColors._9FCD72,
    gradientColor2: ChartColors._66A428,
  }

  let generationOutputData = GetDonutChartSeriesAndValueForCurrentStatus(i18n, generationOutputCustomData, GenerationOutput);

  let availabilityCustomData: DonutChartCustomData = {
    header: i18n.t("CURRENT_STATUS.AVAILABILITY"),
    type: ChartType.LARGE,
    color: ChartColors._54AFDE,
    chartGradientType: ChartGradientType.BLUE,
    gradientColor1: ChartColors._54AFDE,
    gradientColor2: ChartColors._007CBB
  }

  let availabilityData = GetDonutChartSeriesAndValueForCurrentStatus(i18n, availabilityCustomData, Availability);

  let spreadCustomData: DonutChartCustomData = {
    header: i18n.t("CURRENT_STATUS.SPREAD"),
    type: ChartType.LARGE,
    color: ChartColors._E56D75,
    chartGradientType: ChartGradientType.SOFT_RED,
    gradientColor1: ChartColors._E56D75,
    gradientColor2: ChartColors._C5222D,
  }

  let spreadData = GetDonutChartSeriesAndValueForCurrentStatus(i18n, spreadCustomData, Spread);

  let thermalEfficiencyCustomData: DonutChartCustomData = {
    header: i18n.t("LABELS.THERMAL_EFFICIENCY"),
    type: ChartType.LARGE,
    color: ChartColors._F0AA54,
    chartGradientType: ChartGradientType.SOFT_ORANGE,
    gradientColor1: ChartColors._F0AA54,
    gradientColor2: ChartColors._D37400,
  }

  let thermalEfficiencyData = GetDonutChartSeriesAndValueForCurrentStatus(i18n, thermalEfficiencyCustomData, ThermalEfficiency);    
  return (
    <>
      <li className="uk-active">
        <div className="uk-grid-match uk-grid">
          <div className="uk-margin-bottom@s uk-width-1-4@m">
            <div className="uk-card uk-card-body">
              <h6 className="font-16">{generationOutputData.header}</h6>
              <DonutChartLarge
                data={generationOutputData}
                width={pieChartRenderSize}
                height={pieChartRenderSize}
              />
              <div className="mt-24 uk-text-center">
                <label className="">Actual</label>
                <p className="mt-5 uk-margin-remove-bottom font-24">
                  <strong>{ GenerationOutput.Actual } <span className="uk-text-top font-10">{ GenerationOutput.Suffix }</span>
                  </strong>
                </p>
              </div>
            </div>                
          </div>
          <div className="uk-margin-bottom@s uk-width-1-4@m">
            <div className="uk-card uk-card-body">
              <h6 className="font-16">{availabilityData.header}</h6>
              <DonutChartLarge
                data={availabilityData}
                width={pieChartRenderSize}
                height={pieChartRenderSize}
              />
              <div className="mt-24 uk-text-center">
                <label className="">Actual</label>
                <p className="mt-5 uk-margin-remove-bottom font-24">
                  <strong>{ Availability.Actual } <span className="uk-text-top font-10">{ Availability.Suffix }</span>
                  </strong>
                </p>
              </div>
            </div>             
          </div>
          <div className="uk-margin-bottom@s uk-width-1-4@m">
            <div className="uk-card uk-card-body">
              <h6 className="font-16">{spreadData.header}</h6>
              <DonutChartLarge 
                data={spreadData} 
                width={pieChartRenderSize}
                height={pieChartRenderSize}
              />
              <div className="mt-24 uk-text-center">
                <label className="">Actual</label>
                <p className="mt-5 uk-margin-remove-bottom font-24">
                  <strong>{ Spread.Actual } <span className="uk-text-top font-10">{ Spread.Suffix }</span>
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="uk-margin-bottom@s uk-width-1-4@m">
            <div className="uk-card uk-card-body">
              <h6 className="font-16">{thermalEfficiencyData.header}</h6>
              <DonutChartLarge 
                data={thermalEfficiencyData} 
                width={pieChartRenderSize}
                height={pieChartRenderSize}
              />
              <div className="mt-24 uk-text-center">
                <label className="">Actual</label>
                <p className="mt-5 uk-margin-remove-bottom font-24">
                  <strong>{ ThermalEfficiency.Actual } <span className="uk-text-top font-10">{ ThermalEfficiency.Suffix }</span>
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default OthersTab