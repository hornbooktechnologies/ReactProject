import React from 'react'
import { ChartConstant } from "../../utils/AppConstants";
import { EstmationModel } from "../../models/LinechartModel";
import { useTranslation } from "react-i18next";
import "../../assets/scss/annualTarget/_estimationLayout.scss"
const EstimationLayout = ({linechartData, dataEstList, estimate, selectValue}: EstmationModel) =>{
    const { i18n } = useTranslation();
    return(
        <>
        <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-3@l uk-grid">
          <div className="mb-20">
            <div className="uk-flex uk-flex-middle pl-20">
              <span className="indicate indicate-circle indicate-bordered  bg-orange-80"></span>
              <div className="ml-10">
                <p className="uk-margin-remove font-12">
                  {i18n.t("ANNUAL_TARGET.PLANNED")}
                </p>
                <strong className="uk-margin-remove font-16">
                  {linechartData?.Prefix !== null
                    ? linechartData?.Prefix
                    : null}
                  {` ${dataEstList && dataEstList[0].toLocaleString("en")} ${
                    linechartData?.Suffix
                  } `}
                </strong>
                <p className="uk-margin-remove font-12">
                  {` ${estimate}`}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-20">
            <div className="uk-flex uk-flex-middle pl-20">
              <span className="indicate indicate-circle indicate-bordered bg-red-80"></span>
              <div className="ml-10">
                <p className="uk-margin-remove font-12">
                  {i18n.t("ANNUAL_TARGET.ACTUAL_CURRENT")}
                </p>
                <strong className="uk-margin-remove font-16">
                  {linechartData?.Prefix !== null
                    ? linechartData?.Prefix
                    : null}
                  {` ${dataEstList && dataEstList[1].toLocaleString("en")} ${
                    linechartData?.Suffix
                  } `}
                </strong>
                <p className="uk-margin-remove font-12">
                  {i18n.t("ANNUAL_TARGET.TO_DATE")}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-20">
            <div className="uk-flex uk-flex-middle pl-20">
              <span className="indicate indicate-circle indicate-bordered bg-blue-80"></span>
              <div className="ml-10">
                <p className="uk-margin-remove font-12">
                
                  {selectValue === ChartConstant.ANNUAL_DATA ||
                  selectValue === ChartConstant.CUMULATIVE_DATA
                    ? i18n.t("ANNUAL_TARGET.FORECAST_REMAINING")
                    :  i18n.t("LABELS.FORECAST")}
                </p>
                <strong className="uk-margin-remove font-16">
                  {linechartData?.Prefix !== null
                    ? linechartData?.Prefix
                    : null}
                  {` ${dataEstList && dataEstList[2].toLocaleString("en")} ${
                    linechartData?.Suffix
                  }`}
                </strong>
                <p className="uk-margin-remove font-12">
                {selectValue === ChartConstant.ANNUAL_DATA ||
                  selectValue === ChartConstant.CUMULATIVE_DATA
                    ?  i18n.t("ANNUAL_TARGET.REMAINING")
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default EstimationLayout;