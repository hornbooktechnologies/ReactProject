import React from "react";
import renderer from "react-test-renderer";
import OpexTab from "../../components/annualTarget/annualTargetTab/OpexTab";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: OpexTab", () => {
  it("OpexTab renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <OpexTab jsonData="" AnnualTargetSelectedTab=""/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
