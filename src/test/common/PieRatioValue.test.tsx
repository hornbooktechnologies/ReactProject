import React from "react";
import PieRatioValue from "../../components/common/customPie/PieRatioValue";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
describe("Component: PieRationValue", () => {
  var Props = {
    forecastHrs: 10,
    forecastpreviousHrs: 12,
    planHrs: 15,
    planpreviousHrs: 14,
    actual: true,
    suffix: "oku",
  };

  it("PieRationValue renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <PieRatioValue {...Props} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
