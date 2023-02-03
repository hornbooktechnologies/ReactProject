import React,{ useState } from "react";
import { useTranslation } from "react-i18next";
import AnnualGraphLayout from "../AnnualGraphLayout";
import { getCutoffFractionTime } from '../../../utils/utils';
import { AnnualTargetConstant,AppConstant,ChartColors,ChartGradientType, ChartType } from "../../../utils/AppConstants";
import { AnnualGraphLayoutModel } from "../../../models/annualTarget/AnnualGraphLayoutModel";
import GetDonutChartSeriesAndValueForAnnualTarget from "../../../utils/AnnualTargetutils";
import { DonutChartCustomData } from "../../../models/DonutChartDataModel";
import { AnnualTargetDataModel } from "../../../models/annualTarget/AnnualTargetDataModel";

const OpexTab = (props: AnnualTargetDataModel) => {
  const { i18n } = useTranslation();
  const nodataDate = getCutoffFractionTime();
  const opexChartType = ChartType.COST;
  const [time, setNoDataDate] = useState(nodataDate);
  const [freqValue, setFreqValue] = useState(AnnualTargetConstant.ANNUAL_DATA);
  let OperationCost = props.jsonData?.OperationCost;
  let MaintenanceCost = props.jsonData?.MaintenanceCost;

  const noDataHandler = (val: number, selectValue: string) => {
    setNoDataDate(val);
    setFreqValue(selectValue);
  };

  let OperationCostCustomData: DonutChartCustomData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: i18n.t("ANNUAL_TARGET.OPERATION_COST"),
    chartGradientType: ChartGradientType.GREEN,
    gradientColor1: ChartColors._9FCD72,
    gradientColor2: ChartColors._66A428,
  };
  let OperationCostData = GetDonutChartSeriesAndValueForAnnualTarget(
    i18n,
    OperationCostCustomData,
    OperationCost
  );

  let MaintenanceCostCustomData: DonutChartCustomData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: i18n.t("LABELS.MAINTENANCE_COST"),
    chartGradientType: ChartGradientType.GREEN,
    gradientColor1: ChartColors._9FCD72,
    gradientColor2: ChartColors._66A428,
  };
  let MaintenanceCostData = GetDonutChartSeriesAndValueForAnnualTarget(
    i18n,
    MaintenanceCostCustomData,
    MaintenanceCost
  );

  const graphData: AnnualGraphLayoutModel = {
    GraphLayout: [
      {
        lineData: OperationCost,
        donutchartData: OperationCostData,
        name: AnnualTargetConstant.OPERATIONAL_COST,
        cumulativeBoolean: false,
       
      },
      {
        lineData: MaintenanceCost,
        donutchartData: MaintenanceCostData,
        name: AnnualTargetConstant.MAINTENANCE_COST,
        cumulativeBoolean: false,
            },
    ],
    noDataHandler: noDataHandler,
    time: time,
    freqValue: freqValue,
  };

  return (
    <>
      <li
        className={`${
          props.AnnualTargetSelectedTab === AppConstant.OPEX ? "uk-active" : ""
        }`}
      >
        <AnnualGraphLayout {...graphData} chartType={opexChartType} />
      </li>
    </>
  );
};
export default OpexTab;
