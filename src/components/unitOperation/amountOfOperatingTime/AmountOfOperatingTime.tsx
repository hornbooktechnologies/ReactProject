import React from "react";
import { useTranslation } from 'react-i18next';
import { NegOperationTimeDonutChartModel } from "../../../models/unitOperation/NegOperationTimeModel";
import { AppConstant, ChartType } from "../../../utils/AppConstants";
import { GetDonutChartSeriesValWithDiff, GetStrongRedDonutchart } from "../../../utils/DonutChartUtils";
import DonutChartLarge from '../../common/customPie/DonutChartLarge';

const AmountOfOperatingTime = ({negOperationTime}:NegOperationTimeDonutChartModel ) => {
  const { i18n } = useTranslation();
  let annualData = negOperationTime && negOperationTime[0]
  let startTopresentData =  negOperationTime && negOperationTime[1]
  let presentToendData =  negOperationTime && negOperationTime[2]
  const pieChartRenderSize = 190;
  const opexChartType = ChartType.COST;
  const unitOperationChartCustomData = GetStrongRedDonutchart()
  const annualCustomData = GetDonutChartSeriesValWithDiff(i18n,unitOperationChartCustomData,annualData)
  const startToPresentCustomData = GetDonutChartSeriesValWithDiff(i18n,unitOperationChartCustomData,startTopresentData)
  const presentToEndCustomData = GetDonutChartSeriesValWithDiff(i18n,unitOperationChartCustomData,presentToendData)
 
  return (
    <>
      <div>
        <h5 className="mb-24 mt-24 font-18 uk-text-medium">
          {i18n.t('UNIT_OPERATION.AMOUNT_OPERATING_SPREAD')}
        </h5>
        <div
          className="uk-grid uk-child-width-1-3@s uk-child-width-1-3@m"
          uk-grid="true"
        >
          <div className="uk-first-column">
            <div className="uk-card">
            <h6 className="font-16">{annualData?.header}</h6>
               <DonutChartLarge
                data={annualCustomData}
                width={pieChartRenderSize}
                height={pieChartRenderSize}
                chartType={opexChartType}
                chartSection={AppConstant.OPERATING_TIME}
                removeTextTop={true}
              />
            </div>
          </div>
          <div className="media-mt-30 uk-first-column">
            <div className="uk-card">
            <h6 className="font-16">{startToPresentCustomData?.header}</h6>
              <DonutChartLarge
                data={startToPresentCustomData}
                width={pieChartRenderSize}
                height={pieChartRenderSize}
                chartType={opexChartType}
                chartSection={AppConstant.OPERATING_TIME}
                removeTextTop={true}
              />
            </div>
          </div> 
          <div className=" media-mt-30 uk-first-column">
            <div className="uk-card">
            <h6 className="font-16">{presentToEndCustomData?.header}</h6>
              <DonutChartLarge
                data={presentToEndCustomData}
                width={pieChartRenderSize}
                height={pieChartRenderSize}
                chartType={opexChartType}
                chartSection={AppConstant.OPERATING_TIME}
                removeTextTop={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default AmountOfOperatingTime;
