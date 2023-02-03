import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import UnitOperation from './../../components/unitOperation/UnitOperation';

describe("Component: UnitOperation", () => {
  it("UnitOperation renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <UnitOperation />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
