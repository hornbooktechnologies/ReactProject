 
  import { ChartConstant, DateformatConstant } from "../../utils/AppConstants";
  import { CustomTooltipModel } from "../../models/LinechartModel";
  import Moment from 'moment'
import { cssClassName } from "../../utils/CssConstants";

  //Custom Dots for Tooltip
  const CustomDot = ({ fill} : string|any) => {
    return (
      <>
      <svg className="svg">
          <circle cx={9} cy={9} r={6} fill={fill} />
        </svg>
      </>
    );
  };

  const CustomTooltip = ({ selectValue,linechartData ,active, payload }: CustomTooltipModel) => {
    if (active && payload !== undefined && payload && payload.length) {
      payload = payload.filter((payloadData) => {
        return !payloadData.name.includes("hide");
      });
    }

    if (active && payload && payload.length) {
      return (
       
        <div className="rechart-custom-tooltip annualtarget-tooltip">
          {selectValue === ChartConstant.DAILY_DATA ? (
            <div className={`${cssClassName.TOOLTIP_PERIOD_SECTION}`}>{`${Moment(
              payload[0].payload.Period
            ).format(DateformatConstant.YYY_MMM_DD_HH_mm)}`}</div>
          ) : selectValue === ChartConstant.ANNUAL_DATA ? (
            <div className={`${cssClassName.TOOLTIP_PERIOD_SECTION}`}>{`${Moment(
              payload[0].payload.Period
            ).format(DateformatConstant.YYY_MMM)}`}</div>
          ) : (
            <div className={`${cssClassName.TOOLTIP_PERIOD_SECTION}`}>{`${Moment(
              payload[0].payload.Period
            ).format(DateformatConstant.YYY_MMM_DD)}`}</div>
          )}
          <>
            <ul className="tooltip-main-section">
              {linechartData.Prefix !== null ? (
                <>
                  <li className={`${cssClassName.TOOLTIP_NAME_SECTION}`}>
                    <CustomDot
                      fill={
                        payload[0].name === ChartConstant.FORECAST
                          ? ChartConstant.FORECAST_COLOR
                          : payload[0].name === ChartConstant.PLANNED
                          ? ChartConstant.PLANNED_COLOR
                          : ChartConstant.ACTUAL_COLOR
                      }
                    />
                    {`${payload[0].name}`}:
                    {` ${linechartData.Prefix} ${payload[0].value} ${linechartData.Suffix} `}
                  </li>
                </>
              ) : (
                <>
                  <li className={`${cssClassName.TOOLTIP_NAME_SECTION}`}>
                    <CustomDot
                      fill={
                        payload[0].name === ChartConstant.FORECAST
                          ? ChartConstant.FORECAST_COLOR
                          : payload[0].name === ChartConstant.PLANNED
                          ? ChartConstant.PLANNED_COLOR
                          : ChartConstant.ACTUAL_COLOR
                      }
                    />
                    {`${payload[0].name}`}:
                    { `${payload[0].value} ${linechartData.Suffix} `}
                  </li>
                </>
              )}

              {payload.length > 1 ? (
                <>
                  {linechartData.Prefix !== null ? (
                    <>
                      <li className={`${cssClassName.TOOLTIP_NAME_SECTION}`}>
                        <CustomDot
                          fill={
                            payload[1].name === ChartConstant.FORECAST
                              ? ChartConstant.FORECAST_COLOR
                              : payload[1].name === ChartConstant.PLANNED
                              ? ChartConstant.PLANNED_COLOR
                              : ChartConstant.ACTUAL_COLOR
                          }
                        />
                        {`${payload[1].name}`}:
                        { ` ${linechartData.Prefix} ${payload[1].value} ${linechartData.Suffix}`}
                      </li>
                    </>
                  ) : (
                    <>
                      <li className={`${cssClassName.TOOLTIP_NAME_SECTION}`}>
                        <CustomDot
                          fill={
                            payload[1].name === ChartConstant.FORECAST
                              ? ChartConstant.FORECAST_COLOR
                              : payload[1].name === ChartConstant.PLANNED
                              ? ChartConstant.PLANNED_COLOR
                              : ChartConstant.ACTUAL_COLOR
                          }
                        />
                        {`${payload[1].name}`}:
                        {` ${payload[1].value} ${linechartData.Suffix}`}
                      </li>
                    </>
                  )}
                </>
              ) : null}

              {payload.length > 2 ? (
                <>
                  {linechartData.Prefix !== null ? (
                    <>
                      <li className={`${cssClassName.TOOLTIP_NAME_SECTION}`}>
                        <CustomDot
                          fill={
                            payload[2].name === ChartConstant.FORECAST
                              ? ChartConstant.FORECAST_COLOR
                              : payload[2].name === ChartConstant.PLANNED
                              ? ChartConstant.PLANNED_COLOR
                              : ChartConstant.ACTUAL_COLOR
                          }
                        />
                        {`${payload[2].name}`}:
                        {` ${linechartData.Prefix}${payload[2].value} ${linechartData.Suffix}`}
                      </li>
                    </>
                  ) : (
                    <>
                      <li className={`${cssClassName.TOOLTIP_NAME_SECTION}`}>
                        <CustomDot
                          fill={
                            payload[2].name === ChartConstant.FORECAST
                              ? ChartConstant.FORECAST_COLOR
                              : payload[2].name === ChartConstant.PLANNED
                              ? ChartConstant.PLANNED_COLOR
                              : ChartConstant.ACTUAL_COLOR
                          }
                        />
                        {`${payload[2].name}`}:
                        {` ${payload[2].value} ${linechartData.Suffix}`}
                      </li>
                    </>
                  )}
                </>
              ) : null}
            </ul>
          </>
        </div>
      );
    }

    return null;
  };
  export default CustomTooltip;