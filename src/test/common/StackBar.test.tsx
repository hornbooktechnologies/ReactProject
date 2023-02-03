import React from "react";
import StackBar from "../../components/common/StackBar";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
describe("Component: Stackbar", () => {
  var props = [
    {
      Maintenance: 123,
      Operational: 162,
      Plan: 23,
      Prefix: "¥",
      Suffix: "Oku",
      Suffix2: "Oku",
      name: "Actual (to-date)",
      onhoverName: "Actual",
    },
    {
        Maintenance: 138,
        Operational: 180,
        Plan: 189,
        Prefix: "¥",
        Suffix: "Oku",
        Suffix2: "Oku",
        name: "Forecast (to year end)",
        onhoverName: "Forecast",
    }
  ];
  
  it("StackBar renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <StackBar {...props} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
