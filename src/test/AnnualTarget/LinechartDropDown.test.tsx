import React from "react";
import LinechartDropDown from "../../components/common/Dropdown";
import renderer from "react-test-renderer";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests";
describe("Component: LinechartDropDown", () => {
  it("LinechartDropDown renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <LinechartDropDown />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
