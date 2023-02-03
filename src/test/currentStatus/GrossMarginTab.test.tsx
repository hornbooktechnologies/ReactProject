import React from "react";
import renderer from "react-test-renderer";
import GrossMarginTab from "../../components/currentStatus/currentStatusTabs/GrossMarginTab";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: GrossMarginTab", () => {
  it("GrossMarginTab renders correctly", () => {
    const annualBarData = [
      { Name: "2011", Prefix: "¥", Suffix: "Oku", Suffix2: "Oku", Value: 0 },
      { Name: "2012", Prefix: "¥", Suffix: "Oku", Suffix2: "Oku", Value: 0 },
      { Name: "2013", Prefix: "¥", Suffix: "Oku", Suffix2: "Oku", Value: 0 },
      { Name: "2014", Prefix: "¥", Suffix: "Oku", Suffix2: "Oku", Value: 0 },
      { Name: "2015", Prefix: "¥", Suffix: "Oku", Suffix2: "Oku", Value: 0 },
      { Name: "2016", Prefix: "¥", Suffix: "Oku", Suffix2: "Oku", Value: 0 },
      { Name: "2017", Prefix: "¥", Suffix: "Oku", Suffix2: "Oku", Value: 0 },
      { Name: "2018", Prefix: "¥", Suffix: "Oku", Suffix2: "Oku", Value: 0 },
      { Name: "2019", Prefix: "¥", Suffix: "Oku", Suffix2: "Oku", Value: 0 },
      { Name: "2020", Prefix: "¥", Suffix: "Oku", Suffix2: "Oku", Value: 1995 },
    ];
    const GrossMargin = {
      Actual: 2241,
      Forecast: 2466,
      Plan: 903,
      Prefix: "¥",
      Suffix: "Oku",
      Suffix2: "Oku",
    };
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <GrossMarginTab annualBarData={annualBarData} GrossMargin={GrossMargin}/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
