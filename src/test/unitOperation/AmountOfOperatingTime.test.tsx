import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import AmountOfOperatingTime from './../../components/unitOperation/amountOfOperatingTime/AmountOfOperatingTime';
import { unitOperationMockData } from "../../models/unitOperation/_mockData";

describe("Component: AmountOfOperatingTime", () => {
  it("AmountOfOperatingTime renders correctly", () => {
    const unitOperationData = unitOperationMockData;
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <AmountOfOperatingTime {...unitOperationData.amountOfOperatingTime}/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
