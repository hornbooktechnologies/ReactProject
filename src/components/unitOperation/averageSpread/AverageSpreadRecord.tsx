import React from "react";
import { AverageSpreadRecordModel } from "../../../models/unitOperation/NegOperationAvgSpreadModel.ts";
import { getDiffOfValues, IsappearTooltip } from "../../../utils/utils";
import Tooltip from "../../common/Tooltip";

const AverageSpreadRecord = ({ ...record }: AverageSpreadRecordModel) => {
  let diffrecordVal = getDiffOfValues(record.value,record.previousValue)

  return (
    <>
      <div className="media-mt-30">
        <p className="uk-margin-remove font-14 uk-text-medium">
          {record.header}
        </p>
        <div className="uk-margin-remove uk-text-bold font-20">
          <span className={`${IsappearTooltip(diffrecordVal)}`}>
            {record.value}
            <span className="font-12 uk-text-normal uk-text-top">
              {record.suffix}
            </span>
            {diffrecordVal === true ? (
              <Tooltip
                previousDayValue={record.previousValue}
                unit={record.suffix}
              />
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default AverageSpreadRecord;
