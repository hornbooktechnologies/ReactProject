import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import { NegOperationAvgSpreadModel } from "../../../models/unitOperation/NegOperationAvgSpreadModel.ts";
import AverageSpread from "../../../components/unitOperation/averageSpread/AverageSpread";

describe("Component: AverageSpread", () => {
  it("AverageSpread renders correctly", () => {
   
    const mockData = [
      {
          title: "Annual",
          Suffix: "円/kWh",
          plan: {
              header: "Plan",
              value: "0.00",
              previousValue: "0.00"
          },
          actual_forcast: {
              header: "Actual/Forecast",
              value: "-4.03",
              previousValue: "-4.03"
          }
      },
      {
          title: "4/1 ~ Present",
          Suffix: "円/kWh",
          plan: {
              header: "Plan",
              value: "0.00",
              previousValue: "0.00"
          },
          actual_forcast: {
              header: "Actual/Forecast",
              value: "-4.03",
              previousValue: "-4.03"
          }
      },
      {
          title: "Present ~ 3/31",
          Suffix: "円/kWh",
          plan: {
              header: "Plan",
              value: "0.00",
              previousValue: "0.00"
          },
          actual_forcast: {
              header: "Actual/Forecast",
              value: "0.00",
              previousValue: "0.00"
          }
      }
  ]
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <AverageSpread {...mockData} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
