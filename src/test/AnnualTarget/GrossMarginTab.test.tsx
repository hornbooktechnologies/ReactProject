import React from "react";
import renderer from "react-test-renderer";
import GrossMarginTab from "../../components/annualTarget/annualTargetTab/GrossMarginTab";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: GrossMarginTab", () => {
  it("GrossMarginTab renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <GrossMarginTab />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
