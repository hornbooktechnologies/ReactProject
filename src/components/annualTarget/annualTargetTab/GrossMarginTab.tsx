import React,{ useState } from "react";
import { useTranslation } from "react-i18next";
import AnnualGraphLayout from "../AnnualGraphLayout";
import { getCutoffFractionTime } from '../../../utils/utils';
import { AnnualTargetConstant ,ChartGradientType,ChartColors, AppConstant ,ChartType} from "../../../utils/AppConstants";
import { AnnualGraphLayoutModel } from "../../../models/annualTarget/AnnualGraphLayoutModel";
import GetDonutChartSeriesAndValueForAnnualTarget from "../../../utils/AnnualTargetutils";
import { DonutChartCustomData } from "../../../models/DonutChartDataModel";
import { AnnualTargetDataModel } from "../../../models/annualTarget/AnnualTargetDataModel";

const GrossMarginTab = (props: AnnualTargetDataModel) => {
  const { i18n } = useTranslation();
  const nodataDate = getCutoffFractionTime();
  const [time, setNoDataDate] = useState(nodataDate);
  const [freqValue, setFreqValue] = useState(AnnualTargetConstant.ANNUAL_DATA);
  let ElectricEnergySold = props.jsonData?.GenerationOutput;
  let Spread = props.jsonData?.Spread;
  let Availability = props.jsonData?.Availability;
  let ThermalEfficiency = props.jsonData?.ThermalEfficiency;
  let HeatRate = props.jsonData?.HeatRate;

  const noDataHandler = (val: number, selectValue: string) => {
    setNoDataDate(val);
    setFreqValue(selectValue);
  };

  let ElectricEnergySoldCustomData: DonutChartCustomData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: i18n.t("LABELS.ELECT_ENG_SOLD"),
    chartGradientType: ChartGradientType.BLUE,
    gradientColor1: ChartColors._54AFDE,
    gradientColor2: ChartColors._007CBB
  };
  let ElectricEnergySoldData = GetDonutChartSeriesAndValueForAnnualTarget(
    i18n,
    ElectricEnergySoldCustomData,
    ElectricEnergySold
  );

  let SpreadCustomData: DonutChartCustomData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: i18n.t("ANNUAL_TARGET.SPREAD"),
    chartGradientType: ChartGradientType.GREEN,
    gradientColor1: ChartColors._9FCD72,
    gradientColor2: ChartColors._66A428,
  };
  let SpreadData = GetDonutChartSeriesAndValueForAnnualTarget(
    i18n,
    SpreadCustomData,
    Spread
  );
  let AvailabilityCustomData: DonutChartCustomData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: i18n.t("ANNUAL_TARGET.AVAILABLITY"),
    chartGradientType: ChartGradientType.STRONG_RED,
    gradientColor1: ChartColors._E88000,
    gradientColor2: ChartColors._D82531,
  };
  let AvailabilityData = GetDonutChartSeriesAndValueForAnnualTarget(
    i18n,
    AvailabilityCustomData,
    Availability
  );
  let ThermalEfficiencyCustomData: DonutChartCustomData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: i18n.t("LABELS.THERMAL_EFFICIENCY"),
    chartGradientType: ChartGradientType.GREEN,
    gradientColor1: ChartColors._9FCD72,
    gradientColor2: ChartColors._66A428,
  };
  let ThermalEfficiencyData = GetDonutChartSeriesAndValueForAnnualTarget(
    i18n,
    ThermalEfficiencyCustomData,
    ThermalEfficiency
  );
  let HeatRateCustomData: DonutChartCustomData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: i18n.t("ANNUAL_TARGET.HEAT_RATE"),
    chartGradientType: ChartGradientType.GREEN,
    gradientColor1: ChartColors._9FCD72,
    gradientColor2: ChartColors._66A428,
  };
  let HeatRateData = GetDonutChartSeriesAndValueForAnnualTarget(
    i18n,
    HeatRateCustomData,
    HeatRate
  );

  const graphData: AnnualGraphLayoutModel = {
    GraphLayout: [
      {
        lineData: ElectricEnergySold,
        donutchartData: ElectricEnergySoldData,
        name: AnnualTargetConstant.ELECTRIC_ENERGY_SOLD,
        cumulativeBoolean: false,
      },
      {
        lineData: Spread,
        donutchartData: SpreadData,
        name: AnnualTargetConstant.SPREAD,
        cumulativeBoolean: true,
      },
      {
        lineData: Availability,
        donutchartData: AvailabilityData,
        name: AnnualTargetConstant.AVAILABILITY,
        cumulativeBoolean: true,
      },
      {
        lineData: ThermalEfficiency,
        donutchartData: ThermalEfficiencyData,
        name: AnnualTargetConstant.THERMAL_EFFICIENCY,
        cumulativeBoolean: true,
      },
      {
        lineData: HeatRate,
        donutchartData: HeatRateData,
        name: AnnualTargetConstant.HEAT_RATE,
        cumulativeBoolean: true,
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
          props.AnnualTargetSelectedTab === AppConstant.GROSSMARGIN ? "uk-active" : ""
        }`}
      >
        <AnnualGraphLayout {...graphData} />
      </li>
    </>
  );
};
export default GrossMarginTab;
