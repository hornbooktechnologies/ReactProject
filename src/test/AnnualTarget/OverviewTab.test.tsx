import React from "react";
import renderer from "react-test-renderer";
import OverviewTab from "../../components/annualTarget/annualTargetTab/OverviewTab";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: OverviewTab", () => {
  it("OverviewTab renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <OverviewTab jsonData="" AnnualTargetSelectedTab=""/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
