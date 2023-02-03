import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import { DurationOfSpreadTypeModel } from "../../../models/unitOperation/UnitOperationModel";
import Top20DurationOfSpread from "../../../components/unitOperation/top20DurationOfSpread/Top20DurationOfSpread";
describe("Component: Top20DurationOfSpread", () => {
  it("Top20DurationOfSpread renders correctly", () => {
    const mockData: DurationOfSpreadTypeModel = {
      actual: [
        {
          duration: 23,
          generator: "Generator 5",
          grossMargin: -1.01,
          output: 478,
          spread: -1.1,
          spreadOperationEnd: "2022-03-11T12:07:33.792Z",
          spreadOperationStart: "2022-03-11T12:07:33.792Z",
        },
      ],
      forecast:[
          {
            duration: 23,
            generator: "Generator 2",
            grossMargin: -1.01,
            output: 448,
            spread: -1.1,
            spreadOperationEnd: "2022-03-11T12:07:33.793Z",
            spreadOperationStart: "2022-03-11T12:07:33.793Z",
          }
      ]
    };
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <Top20DurationOfSpread {...mockData} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
