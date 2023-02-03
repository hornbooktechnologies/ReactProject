import React, { useState } from "react";
import CustomTabs from "../../common/CustomTabs";
import { CustomTabModel } from "../../../models/CustomTabModel";
import ActualTab from "./numberOfCasesTab/ActualTab";
import ForecastTab from "./numberOfCasesTab/ForecastTab";
import { SpreadBarChartDataModel } from "../../../models/unitOperation/UnitOperationModel";
import { AppConstant } from "../../../utils/AppConstants";
import { useTranslation } from 'react-i18next';

const SpreadNumberOfCases = ({spreadBarData}: SpreadBarChartDataModel) => {
  const {  i18n } = useTranslation()

  const [numberOfCasesTab, setNumberOfCasesTab] = useState<string>(AppConstant.ACTUAL);
  const onTargetClick = (data: string) => {
    setNumberOfCasesTab(data);
  };
  const tabData: CustomTabModel = {
    selectedTab: numberOfCasesTab,
    onTabSelect: onTargetClick,
    type: "annualTarget",
    tabs: [
      {
        tabId: AppConstant.ACTUAL,
        i8nCode: 'LABELS.ACTUAL',
      },
      {
        tabId: AppConstant.FORECAST,
        i8nCode: 'LABELS.FORECAST',
      },
    ],
  };
  return (
    <>
      <h5 className="mb-24 uk-margin-remove-top font-18 uk-text-medium">
      {i18n.t('UNIT_OPERATION.SPREAD_CASES_TITLE')}
      </h5>

      <CustomTabs {...tabData} />

      <ul className="uk-switcher mt-24">
        {(() => {
          switch (numberOfCasesTab) {
            case AppConstant.ACTUAL:
              return <ActualTab numberOfCasesTab={numberOfCasesTab} spreadBarData={spreadBarData}/>;
            case AppConstant.FORECAST:
              return <ForecastTab numberOfCasesTab={numberOfCasesTab} spreadBarData={spreadBarData}/>;
            default:
              return <ActualTab numberOfCasesTab={numberOfCasesTab} spreadBarData={spreadBarData}/>;
          }
        })()}
      </ul>
    </>
  );
};

export default SpreadNumberOfCases;
