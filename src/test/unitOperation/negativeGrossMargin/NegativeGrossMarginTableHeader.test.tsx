import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import NegativeGrossMarginTableHeader from "../../../components/unitOperation/NegativeOperationGrossMargin/NegativeGrossMarginTableHeader";

describe("Component: NegativeGrossMarginTableHeader", () => {
  it("NegativeGrossMarginTableHeader renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <NegativeGrossMarginTableHeader />
        </I18nextProvider>
      )
      .toJSON();
      expect(tree).toBeDefined();
  });
});
