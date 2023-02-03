import React from "react";
import renderer from "react-test-renderer";
import AnnualData from "../../components/outageOutputlimit/timeOfOutage/annualData/AnnualData";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: AnnualData", () => {
  it("AnnualData renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <AnnualData/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
