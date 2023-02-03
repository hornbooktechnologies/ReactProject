import React from "react";
import renderer from "react-test-renderer";
import Login from "../components/views/pages/login/Login";
import i18n from "../i18nForTests";
import { I18nextProvider } from "react-i18next";


describe("Component: Login", () => {
  it("Login renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <Login/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
