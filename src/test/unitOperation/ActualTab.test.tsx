import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import ActualTab from "../../components/unitOperation/spreadNumberOfCases/numberOfCasesTab/ActualTab";
import {spreadBarChartMockData} from '../../models/unitOperation/_mockData'
describe("Component: ActualTab", () => {
  it("ActualTab renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <ActualTab spreadBarData={spreadBarChartMockData()} numberOfCasesTab={"actualTab"}/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
