import React from "react";
import renderer from "react-test-renderer";
import Annualtarget from "../../components/annualTarget/Annualtarget";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests";
describe("Component: Annualtarget", () => {
  it("Annualtarget renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <Annualtarget />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
