import React from "react";
import renderer from "react-test-renderer";
import GrossMarginTab from "../../components/currentStatus/currentStatusTabs/GrossMarginTab";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: GrossMarginTab", () => {
  it("GrossMarginTab renders correctly", () => {
    const GenerationOutput = {
      Actual: 25488,
      Forecast: 27161,
      Plan: 29302,
      Prefix: null,
      Suffix: "GWh",
      Suffix2: null,
    };
    const Availability = {
      Actual: 79.3,
      Forecast: 80.1,
      Plan: 86.4,
      Prefix: null,
      Suffix: "%",
      Suffix2: null,
    };
    const Spread = {
      Actual: 8.7,
      Forecast: 9,
      Plan: 3,
      Prefix: null,
      Suffix: "YEN/KWh",
      Suffix2: null,
    };
    const ThermalEfficiency = {
      Actual: 37.54,
      Forecast: 37.82,
      Plan: 42.61,
      Prefix: null,
      Suffix: "%",
      Suffix2: null,
    };
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <GrossMarginTab
            GenerationOutput={GenerationOutput}
            Availability={Availability}
            Spread={Spread}
            ThermalEfficiency={ThermalEfficiency}
          />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
