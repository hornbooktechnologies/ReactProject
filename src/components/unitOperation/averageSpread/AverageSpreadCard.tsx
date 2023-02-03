import React from "react";
import { AverageSpreadCardModel } from "../../../models/unitOperation/NegOperationAvgSpreadModel.ts";
import AverageSpreadRecord from "./AverageSpreadRecord";

const AverageSpreadCard = (obj: AverageSpreadCardModel) => {

  return (
    <>
      <div>
        <div className="uk-card">
          <h6 className="font-18 uk-text-medium">{obj.title}</h6>
          <div
            className="uk-child-width-1-1@s uk-child-width-1-2@m uk-grid"
            uk-grid="true"
          >
            <AverageSpreadRecord
              {...obj.plan}
              suffix={obj.Suffix}
            />
            <AverageSpreadRecord
              {...obj.actual_forcast}
              suffix={obj.Suffix}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AverageSpreadCard;
