import React from "react";
import { useTranslation } from "react-i18next";
import { ImpactOfOutageDataModel } from "../../../models/outageOutputLimit/ImpactOfOutageDataModel";
import { cssClassName } from "../../../utils/CssConstants";
import Tooltip from "../../common/Tooltip";
import { OutageOutputConstant } from "../../../utils/AppConstants";
import { IsappearTooltip, prefixSign, getDiffOfValues } from "../../../utils/utils";

const ImpactOfOutageData = ({
  value,
  positiveVal,
  negativeVal,
  title,
  valuePrevious,
  positivePreviousVal,
  negetivePreviousVal,
  prefix,
  suffix,
}: ImpactOfOutageDataModel) => {
  const { i18n } = useTranslation();
  let negVariation = OutageOutputConstant.NEGATIVE_VAL
  let posVariation = OutageOutputConstant.POSITIVE_VAL
  let diffValue = getDiffOfValues(value,valuePrevious)
  let diffPositiveVal = getDiffOfValues(positiveVal,positivePreviousVal)
  let diffNegativeVal = getDiffOfValues(negativeVal,negetivePreviousVal)
  
  return (
    <>
      <div className="uk-card">
        <label className="font-18">{title}</label>
        <div className="mb-24">
          <span
            className={`${IsappearTooltip(diffValue)} font-28 uk-text-bold mt-0 mb-20 ${
              parseInt(value) <= 0
                ? `${cssClassName.COLOR_GREY_BLUE_70}`
                : `${cssClassName.COLOR_GREEN_60}
                  `
            }`}
          >
            {prefixSign(value, posVariation)}
            {value}
            <span
              className={`${
                diffValue === true ? "color-grey-blue-10" : ""
              } font-10 ${cssClassName.COLOR_WHITE} uk-text-top `}
            >
              {suffix}
            </span>
            {diffValue === true ? (
              <Tooltip
                prefix={prefixSign(valuePrevious, posVariation)}
                previousDayValue={valuePrevious}
                unit={suffix}
              />
            ) : null}
          </span>
        </div>
        <div
          className="uk-child-width-1-1@s uk-child-width-1-2@m uk-grid ml--25"
          uk-grid="true"
        >
          <div className="media-mb-20">
            <p
              className={`uk-margin-remove font-14 ${cssClassName.COLOR_GREEN_60}`}
            >
              {i18n.t("OUTAGE_AND_OUTPUT_LIMIT.INCREMENT_IMPACT")}
            </p>
            <span className={`mt-5 mb-0 uk-text-bold font-20 ${cssClassName.COLOR_WHITE}
                  ${IsappearTooltip(diffPositiveVal)}`}
                  >
              {prefix}
              {prefixSign(positiveVal,posVariation)}
              {positiveVal}
              <span className="font-10 uk-text-normal uk-text-top">
                {suffix}
              </span>
              {diffPositiveVal === true ? (
                <Tooltip
                  prefix={prefix + prefixSign(positivePreviousVal,posVariation)}
                  previousDayValue={positivePreviousVal}
                  unit={suffix}
                />
                ) : null}
              </span>
          </div>

          <div>
            <p className={`uk-margin-remove font-14 ${cssClassName.COLOR_RED_60}`}>
              {i18n.t("OUTAGE_AND_OUTPUT_LIMIT.DECREMENT_IMPACT")}
            </p>
            <span className={`mt-5 mb-0 uk-text-bold font-20 
                  ${cssClassName.COLOR_WHITE}
                  ${IsappearTooltip(diffNegativeVal)}`}
            >
              {prefix}
              {prefixSign(negativeVal,negVariation)}
              {negativeVal}
              <span className="font-10 uk-text-normal uk-text-top">
                {suffix}
              </span>

            {diffNegativeVal === true ? (
              <Tooltip
                prefix={prefix + prefixSign(negetivePreviousVal,negVariation)}
                previousDayValue={negetivePreviousVal}
                unit={suffix}
              />
            ) : null}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImpactOfOutageData;
