import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import { unitOperationMockData } from "../../../models/unitOperation/_mockData";
import { AverageSpreadCardModel } from "../../../models/unitOperation/NegOperationAvgSpreadModel.ts";
import AverageSpreadCard from '../../../components/unitOperation/averageSpread/AverageSpreadCard'
describe("Component: AverageSpread", () => {
  it("AverageSpread renders correctly", () => {
    const mockData: AverageSpreadCardModel = {
      Suffix: "YEN/kWh",
      title: "Plan",
      annual: {
        header: "Annual",
        previousValue: 1.38,
        value: -10.12,
      },
      presentToYearEnd: {
        header: "Present ~ 3/31",
        previousValue: -4.17,
        value: 0.43,
      },
      yearStartToPresent: {
        header: "4/1 ~ Present",
        previousValue: 0.56,
        value: 0.56,
      },
    };
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <AverageSpreadCard {...mockData} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
