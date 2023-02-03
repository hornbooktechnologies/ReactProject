import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import Tooltip from "../../components/common/Tooltip";

describe("Component: UnitOperation Tooltip", () => {
  it("UnitOperation Tooltip renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <Tooltip previousDayValue={12} unit='YEN/kWh'/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
