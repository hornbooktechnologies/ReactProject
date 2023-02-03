import React from "react";
import renderer from "react-test-renderer";
import OpexTab from "../../components/currentStatus/currentStatusTabs/OpexTab";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: OpexTab", () => {
  it("OpexTab renders correctly", () => {
    const opexBarData = [
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
      },
    ];
    const OPEXOperation = {
      Actual: 39,
      Forecast: 42,
      Plan: 23,
      Prefix: "¥",
      Suffix: "Oku",
      Suffix2: "Oku",
    };
    const OPEXMaintenance = {
      Actual: 123,
      Forecast: 138,
      Plan: 189,
      Prefix: "¥",
      Suffix: "Oku",
      Suffix2: "Oku",
    };
    
    const OPEXTotal = {
        Actual: 162,
        Forecast: 181,
        Plan: 212,
        Prefix: "¥",
        Suffix: "Oku",
        Suffix2: "Oku",
    };

    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <OpexTab opexBarData={opexBarData} OPEXOperation={OPEXOperation} OPEXMaintenance={OPEXMaintenance} OPEXTotal={OPEXTotal}/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
