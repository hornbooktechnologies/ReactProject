import React from "react";
import renderer from "react-test-renderer";
import TimeLineChartOtherUnits from "../../../components/outageOutputlimit/outageLimitCharts/TimeLineChartOtherUnits";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: TimeLineChartOtherUnits", () => {
  it("TimeLineChartOtherUnits renders correctly", () => {
    const chartTestData = {
        timelinecharts: [],
        selectYear: 2021,
        xaxisMin: 2021,
        xaxisMax: 2022,
        setXaxisMin: () => {},
        setXaxisMax: () => {},
        noOfUnits: 4
    }
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <TimeLineChartOtherUnits {...chartTestData} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
