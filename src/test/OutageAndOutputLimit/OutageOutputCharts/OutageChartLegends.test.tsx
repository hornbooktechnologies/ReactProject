import React from "react";
import OutageChartLegends from "../../../components/outageOutputlimit/outageLimitCharts/OutageChartLegends";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: OutageChartLegends", () => {
  it("OutageChartLegends renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <OutageChartLegends />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
