import React from "react";
import renderer from "react-test-renderer";
import TheSidebar from "../../components/organisms/TheSidebar";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

describe("Component: TheSidebar", () => {
  it("TheSidebar renders correctly", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <TheSidebar />
          </I18nextProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
