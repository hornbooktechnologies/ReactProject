import React from "react";
import renderer from "react-test-renderer";
import TimeOfOutage from "../../components/outageOutputlimit/timeOfOutage/TimeOfOutage";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: TimeOfOutage", () => {
  it("TimeOfOutage renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <TimeOfOutage/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
