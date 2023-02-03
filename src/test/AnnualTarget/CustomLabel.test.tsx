import React from "react";
import CustomLabel from "../../components/annualTarget/CustomLabel";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
describe("Component: CustomLabel", () => {
  it("CustomLabel renders correctly", () => {
    const tree = renderer.create(
      <I18nextProvider i18n={i18n}>
    <CustomLabel />
    </I18nextProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
