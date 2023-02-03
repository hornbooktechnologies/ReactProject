import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Moment from "moment";
import { cssClassName } from "../../../utils/CssConstants";
import {
  DateformatConstant,
  ChartConstant,
} from "../../../utils/AppConstants";
import { SpreadLineChartDataModel } from "../../../models/unitOperation/UnitOperationModel";
import { useTranslation } from 'react-i18next'
import { CustomTooltipModel } from "../../../models/LinechartModel";

const SpreadLineChart = ({
  data,
  selectValue,
  list,
  selectedUnitId,
  selectedTitleDropdown,
}: SpreadLineChartDataModel) => {
  const { i18n } = useTranslation()
  function formatXAxis(Period) {
    //  Moment.locale('ja');
    let a = Moment(Period);
    switch (selectValue) {
      case ChartConstant.ANNUAL_DATA:
        return a.format(DateformatConstant.MMM);

      case ChartConstant.MONTHLY_DATA:
        return a.format(DateformatConstant.DDD_DO);

      case ChartConstant.WEEKLY_DATA:
        return a.format(DateformatConstant.DDD_DO);

      case ChartConstant.DAILY_DATA:
        return a.format(DateformatConstant.HH_MM);

      case ChartConstant.CUMULATIVE_DATA:
        return a.format(DateformatConstant.MMM);

      default:
        return a.format(DateformatConstant.MMM);
    }
  }

  const CustomTooltip = ({ active, payload }:CustomTooltipModel) => {
    if (active && payload !== undefined && payload?.length) {
      payload = payload.filter((payloadData) => {
        return !payloadData.name.includes("hide");
      });
    }

    if (active && payload && payload?.length) {
      return (
        <div className="currentstatus-tooltip">
          <p className={`${cssClassName.TOOLTIP_HEADER}`}>{i18n.t('UNIT_OPERATION.SPREAD_OPERATION')}</p>
          <div className={`${cssClassName.TOOLTIP_CONTENT} pl-10`}>
            {selectValue === ChartConstant.DAILY_DATA ? (
              <div
                className={`${cssClassName.TOOLTIP_PERIOD_SECTION}`}
              >{`${Moment(payload[0].payload.Period).format(
                DateformatConstant.YYY_MMM_DD_HH_mm
              )}`}</div>
            ) : selectValue === ChartConstant.ANNUAL_DATA ? (
              <div
                className={`${cssClassName.TOOLTIP_PERIOD_SECTION}`}
              >{`${Moment(payload[0].payload.Period).format(
                DateformatConstant.YYY_MMM
              )}`}</div>
            ) : (
              <div
                className={`${cssClassName.TOOLTIP_PERIOD_SECTION}`}
              >{`${Moment(payload[0].payload.Period).format(
                DateformatConstant.YYY_MMM_DD
              )}`}</div>
            )}
            :{` ${payload[0].payload.Spread}`}
          </div>
        </div>
      );
    }

    return null;
  };
  return (
    <>
      <div uk-card="true" className="uk-card mb-24 mt-24">
        {data.length > 0 && selectedUnitId === data[0]?.powerPlantUnitId && selectedTitleDropdown === data[0]?.poweTitle  ? (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: -20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3"
                  strokeWidth="0.5"
                />
                {selectValue === ChartConstant.MONTHLY_DATA ||
                selectValue === ChartConstant.DAILY_DATA ? (
                  <XAxis
                    type="category"
                    dataKey="Period"
                    tickFormatter={formatXAxis}
                    tickSize={10}
                    ticks={list}
                    tickLine={{
                      stroke: ChartConstant.TICKLINE_STROKE,
                      width: "1px",
                      strokeWidth: 1,
                    }}
                    style={{ fontSize: "12px" }}
                    tick={{ fill: ChartConstant.WHITE_STROKE }}
                    padding={{ left: 30, right: 30 }}
                  />
                ) : (
                  <XAxis
                    type="category"
                    dataKey="Period"
                    tickFormatter={formatXAxis}
                    tickSize={10}
                    tickLine={{
                      stroke: ChartConstant.TICKLINE_STROKE,
                      width: "1px",
                      strokeWidth: 1,
                    }}
                    tick={{ fill: ChartConstant.WHITE_STROKE }}
                    style={{ fontSize: "12px" }}
                    padding={{ left: 30, right: 30 }}
                  />
                )}
                <YAxis
                  type="number"
                  axisLine={false}
                  tick={{ fill: ChartConstant.WHITE_STROKE }}
                  width={100}
                  label={{
                    value: ChartConstant.SPREAD_YAXISLABEL,
                    fill: ChartConstant.WHITE_STROKE,
                    angle: -90,
                  }}
                  style={{ fontSize: "12px" }}
                ></YAxis>
                <Line
                  dataKey="Spread"
                  xAxisId="0"
                  stroke={ChartConstant.FORECAST_LINE_STROKE}
                  strokeWidth="3"
                  dot={{
                    r: 5,
                    stroke: ChartConstant.WHITE_STROKE,
                    fill: ChartConstant.FORECAST_COLOR,
                    strokeWidth: 1,
                  }}
                  activeDot={{ r: 5 }}
                />
                <Tooltip content={<CustomTooltip  />} />
              </LineChart>
            </ResponsiveContainer>

            <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-3@l uk-grid ml-0 uk-flex-center">
              <div className="mt-20 pl-0">
                <div className="uk-flex uk-flex-middle uk-flex-center">
                  <span className="indicate indicate-circle indicate-bordered bg-blue-80"></span>
                  <div className="ml-10">
                    <p className="uk-margin-remove font-12">{i18n.t('UNIT_OPERATION.SPREAD_OPERATION')}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="noDataText uk-flex uk-flex-center">
            <h2 className="mb-0">
              {i18n.t('ANNUAL_TARGET.NO_DATA_AVAILABLE')}
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default SpreadLineChart;
