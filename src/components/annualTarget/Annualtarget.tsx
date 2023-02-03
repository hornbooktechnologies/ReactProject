import React,{ useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DpmService } from "../../services/DpmServices";
import { AppConstant } from "../../utils/AppConstants";
import LoadingError from "../common/LoadingError";
import Spinner from "../common/Spinner";
import PageHeader from "../common/PageHeader";
import GrossMarginTab from "./annualTargetTab/GrossMarginTab";
import OverviewTab from "./annualTargetTab/OverviewTab";
import OpexTab from "./annualTargetTab/OpexTab";
import CustomTabs from "../common/CustomTabs";
import { CustomTabModel } from "../../models/CustomTabModel";
import { AnnualTargetDataModel } from "../../models/annualTarget/AnnualTargetDataModel";
import { ApiParamUtils } from '../../utils/apiUtils/ApiParamUtils'
import "../../assets/scss/annualTarget/_annualstatus.scss";

const AnnualTarget = () => {
  const { i18n } = useTranslation();
  const [annualTargetData, setAnnualTargetData] = useState({});
  const [AnnualTargetSelectedTab, AnnualTargetClickedTab] = useState(
    AppConstant.OVERVIEW
  );
  const [epochSeconds] = useState(Math.trunc(new Date().getTime() / 1000));
  const [errorThrown, seterrorThrown] = useState(null);
 
  useEffect(() => {
    DpmService.fetchAnnualTarget(ApiParamUtils.plantName(), ApiParamUtils.unitName(), epochSeconds)
      .then((res) => {
        setAnnualTargetData(res.data);
      })
      .catch((error) => {
        seterrorThrown(error);
        setAnnualTargetData("");
      });
  }, [epochSeconds, errorThrown]);

  const onTargetClick = (data: string) => {
    AnnualTargetClickedTab(data);
  };
  const tabData: CustomTabModel = {
    selectedTab: AnnualTargetSelectedTab,
    onTabSelect: onTargetClick,
    tabs: [
      {
        tabId: "Overview",
        i8nCode: "ANNUAL_TARGET.OVERVIEW",
      },
      {
        tabId: "GrossMargin",
        i8nCode: "ANNUAL_TARGET.GROSS_MARGIN_BUTTON",
      },
      {
        tabId: "Opex",
        i8nCode: "LABELS.OPEX",
      },
    ],
  };

  const tabPropsData: AnnualTargetDataModel = {
    AnnualTargetSelectedTab: AnnualTargetSelectedTab,
    jsonData: annualTargetData,
  };

  if (Object.entries(annualTargetData).length > 0) {
    return (
      <>
        <PageHeader
          title={i18n.t("ANNUAL_TARGET.TITLE")}
          description={i18n.t("ANNUAL_TARGET.DESCRIPTION")}
        />
        <CustomTabs {...tabData} />
        <ul className="uk-switcher mt-24">
          {(() => {
            switch (AnnualTargetSelectedTab) {
              case AppConstant.OVERVIEW:
                return <OverviewTab {...tabPropsData} />;
              case AppConstant.GROSSMARGIN:
                return <GrossMarginTab {...tabPropsData} />;
              case AppConstant.OPEX:
                return <OpexTab {...tabPropsData} />;
              default:
                return <OverviewTab {...tabPropsData} />;
            }
          })()}
        </ul>
      </>
    );
  } else if (errorThrown != null) {
    return <LoadingError />;
  } else {
    return <Spinner />;
  }
};
export default AnnualTarget;
