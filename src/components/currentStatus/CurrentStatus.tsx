import React,{ useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GrossMarginAnnualDataModel } from '../../models/currentStatus/GrossMarginAnnualDataModel';
import { CustomTabModel } from '../../models/CustomTabModel';
import { DonutChartCustomData } from '../../models/DonutChartDataModel';
import { DpmService } from "../../services/DpmServices";
import { ApiParamUtils } from '../../utils/apiUtils/ApiParamUtils';
import { AppConstant, ChartColors, ChartGradientType, ChartType } from '../../utils/AppConstants';
import { GetDonutChartSeriesAndValueForCurrentStatus } from '../../utils/utils';
import CustomTabs from "../common/CustomTabs";
import LoadingError from '../common/LoadingError';
import PageHeader from "../common/PageHeader";
import Spinner from '../common/Spinner';
import GrossMarginTab from './currentStatusTabs/GrossMarginTab';
import OpexTab from './currentStatusTabs/OpexTab';
import OthersTab from './currentStatusTabs/OthersTab';
import DonutChartLarge from '../common/customPie/DonutChartLarge';
import CustomBarChart from '../common/CustomBarChart';
import "../../assets/scss/annualTarget/_annualstatus.scss";
import '../../assets/scss/currentStatus/_currentStatus.scss';

const CurrentStatus = (): JSX.Element => {
  const [currentStatusData, setCurrentStatusData] = useState<any>({})
  const [currentStatusTabSelected, setCurrentStatusTabSelected] = useState(
    AppConstant.OPEX
  );

  const [error, setError] = useState(null)
  const { i18n } = useTranslation();
  const pieChartRenderSize = 170;

  useEffect(() => {
    DpmService.fetchCurrentStatus(ApiParamUtils.plantName(), ApiParamUtils.unitName())
      .then((res) => {
        setCurrentStatusData(res.data);
      })
      .catch((error) => {
        setError(error);
        setCurrentStatusData(null);
      });
  }, []);

  const handleTabSelection = (selectedTab: string) => {
    setCurrentStatusTabSelected(selectedTab);
  };

  if (currentStatusData && Object.entries(currentStatusData).length > 0) {
    let jsonData = currentStatusData.KPI
    const { OPEXOperation, OPEXMaintenance, OPEXTotal, Availability, Spread, ThermalEfficiency, GenerationOutput, GrossMargin } = jsonData;
    let EBITDAData = jsonData.EBITDA
    let OPEXOperationCostData = jsonData.OPEXOperation
    let OPEXMaintenanceCostData = jsonData.OPEXMaintenance
    let OPEXTotalCostData = jsonData.OPEXTotal
    let AnnualTotalGrossMargin = jsonData.AnnualTotalGrossMargin

    const tabData: CustomTabModel = {
      selectedTab: currentStatusTabSelected,
      onTabSelect : handleTabSelection,
      customCssClass: 'mt-24',
      tabs: [{
        tabId: 'Opex',
        i8nCode: 'LABELS.OPEX'
      }, {
        tabId: 'GrossMargin',
        i8nCode: 'CURRENT_STATUS.GROSS_MARGIN'
      }, {
        tabId: 'Other',
        i8nCode: 'CURRENT_STATUS.OTHER'
      }]
    }
    
    let bardata = [
      {
        name: i18n.t("CURRENT_STATUS.ACTUAL_TO_DT"),
        'Gross Margin': GrossMargin.Actual,
        OPEX: OPEXTotalCostData.Actual,
        OPEXhide: EBITDAData.Actual,
        EBITDA: EBITDAData.Actual,
        EBITDAhide: 0,
        Prefix: EBITDAData.Prefix,
        Suffix: EBITDAData.Suffix,
        Suffix2: EBITDAData.Suffix2,
        onhoverName: 'Actual',
      },
      {
        name: i18n.t("CURRENT_STATUS.FORECAST_YT_END"),
        'Gross Margin': GrossMargin.Forecast,
        OPEX: OPEXTotalCostData.Forecast,
        OPEXhide: EBITDAData.Forecast,
        EBITDA: EBITDAData.Forecast,
        EBITDAhide: 0,
        Prefix: EBITDAData.Prefix,
        Suffix: EBITDAData.Suffix,
        Suffix2: EBITDAData.Suffix2,
        onhoverName: i18n.t("LABELS.FORECAST"),
      },
    ]

    let grossMarginCustomData: DonutChartCustomData = {
      header: i18n.t("CURRENT_STATUS.GROSS_MARGIN"),
      type: ChartType.LARGE,
      color: ChartColors._66A428,
      chartGradientType: ChartGradientType.GREEN,      
      gradientColor1: ChartColors._9FCD72,
      gradientColor2: ChartColors._66A428,
    }

    let grossMarginData = GetDonutChartSeriesAndValueForCurrentStatus(i18n, grossMarginCustomData, GrossMargin);

    let ebitdaCustomData: DonutChartCustomData = {
      header: i18n.t("LABELS.EBITDA"),
      type: ChartType.LARGE,
      color: ChartColors._007CBB,
      chartGradientType: ChartGradientType.BLUE,
      gradientColor1: ChartColors._54AFDE,
      gradientColor2: ChartColors._007CBB
    }

    let ebitdaData = GetDonutChartSeriesAndValueForCurrentStatus(i18n, ebitdaCustomData, EBITDAData);

    let opexBarData = [
      {
        name: i18n.t("CURRENT_STATUS.ACTUAL_TO_DT"),
        Prefix: OPEXOperationCostData.Prefix,
        Suffix: OPEXOperationCostData.Suffix,
        Suffix2: OPEXOperationCostData.Suffix2,
        Operational: OPEXOperationCostData.Actual,
        Plan: OPEXOperationCostData.Plan,
        Maintenance: OPEXMaintenanceCostData.Actual,
        onhoverName: i18n.t("LABELS.ACTUAL"),
      },
      {
        name: i18n.t("CURRENT_STATUS.FORECAST_YT_END"),
        Prefix: OPEXOperationCostData.Prefix,
        Suffix: OPEXOperationCostData.Suffix,
        Suffix2: OPEXOperationCostData.Suffix2,
        Operational: OPEXOperationCostData.Forecast,
        Plan: OPEXMaintenanceCostData.Plan,
        Maintenance: OPEXMaintenanceCostData.Forecast,
        onhoverName: i18n.t("LABELS.FORECAST"),
      },
    ]
    
    let annualBarData: GrossMarginAnnualDataModel[] = []
    for (const key in AnnualTotalGrossMargin.data) {
      annualBarData.push({
        Name: key,
        Prefix: AnnualTotalGrossMargin.Prefix,
        Suffix: AnnualTotalGrossMargin.Suffix,
        Suffix2: AnnualTotalGrossMargin.Suffix2,
        Value: AnnualTotalGrossMargin.data[key]
      } as GrossMarginAnnualDataModel);
    }

    return (
      <>
      <div>
          <PageHeader
            title={i18n.t('CURRENT_STATUS.TITLE')}
            description={i18n.t('CURRENT_STATUS.DESCRIPTION')}
          />
            <div className="uk-grid-match uk-grid" uk-grid="true">
              <div className="uk-margin-bottom@s uk-width-1-2@m uk-first-column">
                <div className="uk-card uk-height-1-1 uk-text-center">
                  <CustomBarChart data={bardata}/>
                </div>
              </div>

            <div className="uk-margin-bottom@s uk-width-1-4@m">
              <div className='uk-card uk-card-body uk-flex uk-flex-column'>
                <h6 className="font-16">{grossMarginData.header}</h6>
                <DonutChartLarge data={grossMarginData}
                  width={pieChartRenderSize}
                  height={pieChartRenderSize} />
              </div>
            </div>
            <div className='uk-margin-bottom@s uk-width-1-4@m'>
              <div className="uk-card uk-card-body">
                <h6 className="font-16">{ebitdaData.header}</h6>
                <DonutChartLarge 
                  data={ebitdaData} 
                  width={pieChartRenderSize}
                  height={pieChartRenderSize}
                />
              </div>
            </div>
            </div>

            <CustomTabs {...tabData} />

            <ul className="uk-switcher mt-24">
              {(() => {
                switch (currentStatusTabSelected) {
                  case AppConstant.OPEX:
                    return <OpexTab opexBarData={opexBarData} OPEXOperation={OPEXOperation} OPEXMaintenance={OPEXMaintenance} OPEXTotal={OPEXTotal} />;
                  case AppConstant.GROSSMARGIN:
                    return <GrossMarginTab annualBarData={annualBarData} GrossMargin={GrossMargin} />;
                  case AppConstant.OTHER:
                    return <OthersTab GenerationOutput={GenerationOutput} Availability={Availability} Spread={Spread} ThermalEfficiency={ThermalEfficiency}  />;
                  default:
                    return <OpexTab opexBarData={opexBarData} OPEXOperation={OPEXOperation} OPEXMaintenance={OPEXMaintenance} OPEXTotal={OPEXTotal} />;
                }
              })()}
            </ul>
        </div>
      </>
    )
  } else if (error) {
    return <LoadingError />
  } else {
    return <Spinner />
  }
}

export default CurrentStatus
