import React from "react";
import TheUserInfoDropdwon from "../../../src/components/organisms/TheUserInfoDropdwon";
import renderer from "react-test-renderer";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";
describe("Component: TheUserInfoDropdwon", () => {
  it("TheUserInfoDropdwon renders correctly", () => {
    const userName = "userName"
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <TheUserInfoDropdwon {...userName} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toBeDefined();
  });
});
