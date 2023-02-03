import React from "react";
import { I18nextProvider } from "react-i18next";
import renderer from "react-test-renderer";
import AverageSpreadRecord from "../../../components/unitOperation/averageSpread/AverageSpreadRecord";
import { AverageSpreadRecordModel, AverageSpreadValueModel } from "../../../models/unitOperation/AverageSpreadDataModel";
import { unitOperationMockData } from "../../../models/unitOperation/_mockData";
import i18n from "../../i18nForTests";

describe("Component: AverageSpreadRecord", () => {
  it("AverageSpreadRecord renders correctly", () => {
    const averageSpreadData = unitOperationMockData.averageSpread;
    const mockData: AverageSpreadRecordModel & AverageSpreadValueModel = {
        title: i18n.t('LABELS.PLAN'),
        value: averageSpreadData.today.annual.plan,
        previousValue: averageSpreadData.previousDay.annual.plan,
        prefix: averageSpreadData.today.annual.prefix,
        suffix: averageSpreadData.today.annual.suffix,
    };
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <AverageSpreadRecord {...mockData}/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
