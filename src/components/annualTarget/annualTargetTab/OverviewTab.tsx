import React,{ useState } from "react";
import { useTranslation } from "react-i18next";
import AnnualGraphLayout from "../AnnualGraphLayout";
import { getCutoffFractionTime } from '../../../utils/utils';
import { AnnualTargetConstant ,ChartGradientType,ChartColors, AppConstant, ChartType} from "../../../utils/AppConstants";
import { AnnualGraphLayoutModel } from "../../../models/annualTarget/AnnualGraphLayoutModel";
import GetDonutChartSeriesAndValueForAnnualTarget from "../../../utils/AnnualTargetutils";
import { DonutChartCustomData } from "../../../models/DonutChartDataModel";
import { AnnualTargetDataModel } from "../../../models/annualTarget/AnnualTargetDataModel";

const OverviewTab = (props: AnnualTargetDataModel) => {
  const { i18n } = useTranslation();
  const nodataDate = getCutoffFractionTime();
  const [time, setNoDataDate] = useState(nodataDate);
  const [freqValue, setFreqValue] = useState(AnnualTargetConstant.ANNUAL_DATA);
  let EBITDA = props.jsonData?.EBITDA;
  let GrossMargin = props.jsonData?.GrossMargin;
  let OPEX = props.jsonData?.OPEX;

  const noDataHandler = (val: number, selectValue: string) => {
    setNoDataDate(val);
    setFreqValue(selectValue);
  };

  let EBITDACustomData: DonutChartCustomData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: i18n.t("LABELS.EBITDA"),
    chartGradientType: ChartGradientType.BLUE,
    gradientColor1: ChartColors._54AFDE,
    gradientColor2: ChartColors._007CBB
  };
  let EBITDAData = GetDonutChartSeriesAndValueForAnnualTarget(
    i18n,
    EBITDACustomData,
    EBITDA
  );

  let GrossMarginCustomData: DonutChartCustomData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: i18n.t("ANNUAL_TARGET.GROSS_MARGIN"),
    chartGradientType: ChartGradientType.GREEN,
    gradientColor1: ChartColors._9FCD72,
    gradientColor2: ChartColors._66A428,
  };
  let GrossMarginData = GetDonutChartSeriesAndValueForAnnualTarget(
    i18n,
    GrossMarginCustomData,
    GrossMargin
  );

  let OPEXCustomData: DonutChartCustomData = {
    type: ChartType.LARGE,
    displayPage: AnnualTargetConstant.ANNUAL_TARGET,
    color: ChartColors._FFB200,
    header: i18n.t("LABELS.OPEX"),
    chartGradientType: ChartGradientType.STRONG_RED,
    gradientColor1: ChartColors._E88000,
    gradientColor2: ChartColors._D82531,
  };
  let OPEXData = GetDonutChartSeriesAndValueForAnnualTarget(
    i18n,
    OPEXCustomData,
    OPEX
  );

  const graphData: AnnualGraphLayoutModel = {
    GraphLayout: [
      {
        lineData: EBITDA,
        donutchartData: EBITDAData,
        name: AnnualTargetConstant.EBITDA,
        cumulativeBoolean: false,
      },
      {
        lineData: GrossMargin,
        donutchartData: GrossMarginData,
        name: AppConstant.GROSSMARGIN,
        cumulativeBoolean: false,
      },
      {
        lineData: OPEX,
        donutchartData: OPEXData,
        name: AnnualTargetConstant.OPEX,
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
          props.AnnualTargetSelectedTab === AppConstant.OVERVIEW ? "uk-active" : ""
        }`}
      >
        <AnnualGraphLayout {...graphData} />
      </li>
    </>
  );
};
export default OverviewTab;
