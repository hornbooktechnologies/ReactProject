import React from "react";
import GrossMarginTabDonutChart from "../../../components/currentStatus/currentStatusCharts/GrossMarginTabDonutChart";
import renderer from "react-test-renderer";
import i18n from '../../i18nForTests'
import { I18nextProvider } from 'react-i18next'

describe("Component: GrossMarginTabDonutChart", () => {
  const props = {
    actualData: {
      Actual: 304,
      Forecast: 970,
      Plan: 738,
      Prefix: "¥",
      Suffix: "Oku",
      Suffix2: "Oku",
    },
    data: {
      chartGradientType: "green",
      color: "#66A428",
      forecast: 970,
      gradientColor1: "#9FCD72",
      gradientColor2: "#66A428",
      header: "Gross Margin",
      plan: 738,
      series1: {
        prefix: "¥",
        seriesValue: 738,
        suffix1: "Oku",
        suffix2: "Oku",
        title: "Plan",
      },
      series2: {
        prefix: "¥",
        seriesValue: 970,
        suffix1: "Oku",
        suffix2: "Oku",
        title: "Forecast",
      },
      type: "large",
      value: 131.43631436314362,
    },
    height: 150,
    width: 150,
  };
  it("GrossMarginTabDonutChart renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <GrossMarginTabDonutChart {...props} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
