import React from "react";
import renderer from "react-test-renderer";
import LineGraph from "../../components/annualTarget/LineChart";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests";
describe("Component: LineGraph", () => {
  const props = {
    name: "OPEX",
    time: 1646905332,
    value: "AnnualData",
    data: {
      PlannedCurrentYear: 58.54,
      ForecastCurrentYear: 28.78,
      Annual: {
        1: { Actual: [], Estimates: [], Forecast: [], Period: [], Planned: [] },
      },
      Cumulative: {
        1: { Actual: [], Estimates: [], Forecast: [], Period: [], Planned: [] },
      },
      Daily: {
        1: { Actual: [], Estimates: [], Forecast: [], Period: [], Planned: [] },
      },
      Monthly: {
        1: { Actual: [], Estimates: [], Forecast: [], Period: [], Planned: [] },
      },
      Weekly: {
        1: { Actual: [], Estimates: [], Forecast: [], Period: [], Planned: [] },
      },
    },
  };
  it("LineGraph renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <LineGraph />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
