import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ChartConstant ,DateformatConstant } from "../../utils/AppConstants";
import CustomTooltip from "./CustomTooltip";
import CustomLabel from "./CustomLabel";
import { ResponsiveContainerModel } from "../../models/LinechartModel";
import Moment from "moment";

const ResponsiveLineContainer = ({
  data,
  selectValue,
  longestLabelLength,
  ylabel,
  linechartData,
  ForecastList,
  PlannedList,
  ActualList,
  Today,
  list
}:ResponsiveContainerModel) => {
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
  let date = new Date()
  var presentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString().split(".")[0]

  return (
    <>
      <ResponsiveContainer width="100%" height="75%">
        <LineChart
          height={273}
          data={data?.map((d) => ({
            ...d,
            
            Planned: d.Planned,
            Forecast: d.Forecast,
            Actual: d.Actual,
           
          }))}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} stroke={ChartConstant.TICKLINE_STROKE} strokeDasharray="3" strokeWidth="0.5"/>
          {selectValue === ChartConstant.MONTHLY_DATA ||
          selectValue === ChartConstant.DAILY_DATA ? (
            <XAxis
              type="category"
              dataKey="Period"
              interval={0}
              tickFormatter={formatXAxis}
              tickSize={10}
              ticks={list}
              tickLine={{
                stroke: ChartConstant.TICKLINE_STROKE,
                width: "1px",
                strokeWidth: 1,
              }}
              style={{ fontSize: "12px"}}
              tick={{ fill: ChartConstant.WHITE_STROKE }}
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
            />
          )}
          {selectValue === ChartConstant.MONTHLY_DATA ||
          selectValue === ChartConstant.DAILY_DATA ? (
            <XAxis
              type="category"
              dataKey="Period"
              interval={0}
              xAxisId="0"
              tickFormatter={(x) => ""}
              tickLine={{
                stroke: ChartConstant.TICKLINE_STROKE,
                width: "1px",
                strokeWidth: 1,
              }}
              tickSize={10}
              tick={{ fill: ChartConstant.WHITE_STROKE }}
              style={{ fontSize: "12px" }}
            />
            ) : null}

          <XAxis
            type="number"
            dataKey="TimeStamp"
            hide={true}
            domain={["dataMin", "dataMax"]}
            xAxisId="ref"
            tickFormatter={formatXAxis}
          />

          <YAxis
            type="number"
            axisLine={false}
            tick={{ fill: ChartConstant.WHITE_STROKE }}
            width={longestLabelLength * 10}
            label={{
              value: ylabel,
              fill: ChartConstant.WHITE_STROKE,
              angle: -90,
              position: "insideLeft",
            }}
            style={{ fontSize: "12px" }}
          ></YAxis>
          <Tooltip content={<CustomTooltip selectValue={selectValue} linechartData={linechartData} active={false} payload={[]}/>} />

          {ForecastList?.length > 0 ? (
            <Line
              dataKey="Forecast"
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
          ) : null}
          {PlannedList?.length > 0 ? (
            <Line
              dataKey="Planned"
              xAxisId="0"
              stroke={ChartConstant.PLANNED_LINE_STROKE}
              strokeWidth="3"
              dot={{
                r: 5,
                stroke: ChartConstant.WHITE_STROKE,
                fill: ChartConstant.PLANNED_COLOR,
                strokeWidth: 1,
              }}
              activeDot={{ r: 5 }}
            />
          ) : null}
          {ActualList?.length > 0 ? (
            <Line
              dataKey="Actual"
              xAxisId="0"
              stroke={ChartConstant.ACTUAL_LINE_STROKE}
              strokeWidth="3"
              dot={{
                r: 5,
                stroke: ChartConstant.WHITE_STROKE,
                fill: ChartConstant.ACTUAL_COLOR,
                strokeWidth: 1,
              }}
              activeDot={{ r: 5 }}
            />
          ) : null}

          <ReferenceLine
            xAxisId="ref"
            x={new Date(presentDate).getTime()}
            stroke={ChartConstant.LABEL_COLOR}
            strokeWidth={1.5}
            label={<CustomLabel viewBox={{x: 0, y: 0}}/>}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
export default ResponsiveLineContainer;
