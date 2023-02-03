import React from "react";
import renderer from "react-test-renderer";
import TimeLineChartPlannedUnit from "../../../components/outageOutputlimit/outageLimitCharts/TimeLineChartPlannedUnit";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: TimeLineChartPlannedUnit", () => {
  it("TimeLineChartPlannedUnit renders correctly", () => {
    const chartTestData = {
        timelinecharts: [],
        selectYear: 2021,
        xaxisMin: 2021,
        xaxisMax: 2022,
        setXaxisMin: () => {},
        setXaxisMax: () => {},
    }
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <TimeLineChartPlannedUnit {...chartTestData} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
