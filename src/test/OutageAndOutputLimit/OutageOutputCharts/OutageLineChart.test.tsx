import React from "react";
import renderer from "react-test-renderer";
import OutageLineChart from "../../../components/outageOutputlimit/outageLimitCharts/OutageLineChart";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: OutageLineChart", () => {
  it("OutageLineChart renders correctly", () => {
    const chartTestData = {
        prices: [],
        selectYear: 2021,
        xaxisMin: 2021,
        xaxisMax: 2022,
    }
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <OutageLineChart {...chartTestData} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
