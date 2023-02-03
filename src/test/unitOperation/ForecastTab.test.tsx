import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import ForecastTab from "../../components/unitOperation/spreadNumberOfCases/numberOfCasesTab/ForecastTab";
import {spreadBarChartMockData} from '../../models/unitOperation/_mockData'
describe("Component: ForecastTab", () => {
  it("ForecastTab renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <ForecastTab spreadBarData={spreadBarChartMockData()} numberOfCasesTab={"forecastTab"}/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
