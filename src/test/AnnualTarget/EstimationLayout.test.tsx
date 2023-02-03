import React from "react";
import renderer from "react-test-renderer";
import EstimationLayout from "../../components/annualTarget/EstimationLayout";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests";
describe("Component: EstimationLayout", () => {
  it("EstimationLayout renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <EstimationLayout />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
