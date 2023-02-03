import React from "react";
import { useTranslation } from "react-i18next";
import { NegOperationAvgSpreadModel } from "../../../models/unitOperation/NegOperationAvgSpreadModel.ts";
import AverageSpreadCard from "./AverageSpreadCard";

const AverageSpread = ({ negOperationAvrgSpread }: NegOperationAvgSpreadModel) => {
  const { i18n } = useTranslation();
  return (
    <>
      <div>
        <h5 className="mb-24 mt-24 font-18 uk-text-medium">
          {i18n.t("UNIT_OPERATION.AVERAGE_SPREAD")}
        </h5>
        <div
          className="uk-grid uk-child-width-1-3@s uk-child-width-1-3@m"
          uk-grid="true"
        >
          {negOperationAvrgSpread?.map((obj, index) => {
            return (
              <React.Fragment key={index}>
                <AverageSpreadCard {...obj} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AverageSpread;
