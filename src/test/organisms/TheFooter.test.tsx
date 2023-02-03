import React from "react";
import renderer from "react-test-renderer";
import TheFooter from "../../components/organisms/TheFooter";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: TheFooter", () => {
  it("TheFooter renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <TheFooter />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toBeDefined();
  });
});
