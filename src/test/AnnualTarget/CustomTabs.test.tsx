import React from "react";
import renderer from "react-test-renderer";
import CustomTabs from "../../components/common/CustomTabs";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: CustomTabs", () => {
  it("CustomTabs renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <CustomTabs />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
