import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import SpreadNumberOfCases from "../../components/unitOperation/spreadNumberOfCases/SpreadNumberOfCases";
import {spreadBarChartMockData} from '../../models/unitOperation/_mockData'
describe("Component: ActualTab", () => {
  it("ActualTab renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <SpreadNumberOfCases spreadBarData={spreadBarChartMockData()} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
